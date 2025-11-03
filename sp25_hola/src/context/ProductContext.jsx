import { createContext, useContext, useEffect, useReducer } from "react";
import { ProductReducer, initialState } from "../reducer/ProductReducer";
import axiosInstance from "../api/api"; // Assuming axiosInstance is used for products

export const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ProductReducer, initialState);

    useEffect(() => {
        const controller = new AbortController();

        const getProducts = async () => {
            dispatch({ type: 'FETCH_START' });
            try {
                const res = await axiosInstance.get("/products", { signal: controller.signal }); // Assuming /products endpoint
                dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
            } catch (error) {
                if (error.name !== "CanceledError" && error.name !== "AbortError") {
                    dispatch({ type: "FETCH_ERROR", payload: error.message });
                    console.error("Fetch products failed:", error);
                }
            }
        };
        getProducts();

        return () => controller.abort();
    }, []);

    const setCategoryFilter = (category) => {
        dispatch({ type: "SET_CATEGORY_FILTER", payload: category });
    };

    return (
        <ProductContext.Provider value={{ state, dispatch, setCategoryFilter }}>
            {children}
        </ProductContext.Provider>
    );
};
export const useProducts = () => useContext(ProductContext);