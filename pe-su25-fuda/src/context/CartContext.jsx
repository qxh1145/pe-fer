import { createContext, useContext, useEffect, useReducer } from "react";
import { cartInitial, CartReducer } from "../reducer/CartReducer";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(CartReducer, cartInitial, (init) => {
        try {
            const raw = localStorage.getItem("user_cart");
            const saved = raw ? JSON.parse(raw) : null;
            return saved && Array.isArray(saved.items) ? saved : init;
        } catch {
            return init;
        }  
    });

    useEffect(() => {
        localStorage.setItem("user_cart", JSON.stringify(state));
    }, [state]);

    const total = (state.items ?? []).reduce(
        (sum, it) => sum + it.priceNum * it.quantity, 0
    );

    

    const addToCart = (product) => dispatch({ type: "ADD_TO_CART", payload: product });
    const updateQuantity = (id, quantity) => dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    const removeItem = (id) => dispatch({ type: "REMOVE_ITEM", payload: { id } });
    const clearCart = () => dispatch({ type: "CLEAR_CART" });

    return (
        <CartContext.Provider value={{ state, total, addToCart, updateQuantity, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);