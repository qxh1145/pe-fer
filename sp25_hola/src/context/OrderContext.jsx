import { createContext, useContext, useEffect, useReducer } from "react";
import { OrderReducer } from "../reducer/OrderReducer";
import { initialState } from "../reducer/OrderReducer"; // Corrected import
import axiosInstance from "../api/api";

export const OrdersContext = createContext(null)

export const OrdersProvider = ({ children }) => {
    const [state, dispatch] = useReducer(OrderReducer, initialState);

    useEffect(() => {
        const controller = new AbortController();

        const getOrders = async () => {
            dispatch({ type: 'FETCH_START' }); // Indicate loading
            try {
                const res = await axiosInstance.get("/orders", { signal: controller.signal })
                dispatch({ type: 'FETCH_SUCCESS', payload: res.data })
            } catch (error) {
                if (error.name !== "CanceledError" && error.name !== "AbortError") {
                    dispatch({ type: "FETCH_ERROR", payload: error.message }); // Pass error message
                    console.error("Fetch order failed:", error);
                }
            }
        }
        getOrders();
        return () => controller.abort();
    }, [])

    // Function to add a new order
    const addOrder = async (newOrderData) => {
        dispatch({ type: 'FETCH_START' }); // Indicate loading for the add operation
        try {
            const res = await axiosInstance.post("/orders", newOrderData);
            dispatch({ type: 'ADD_ORDER', payload: res.data }); // Add the new order to state
            return res.data; // Return the added order
        } catch (error) {
            dispatch({ type: 'FETCH_ERROR', payload: error.message || "Failed to place order." });
            console.error("Failed to place order:", error);
            throw error; // Re-throw to allow component to handle error
        }
    };

    const getAllOrders = async () => {
        try {
            dispatch({ type: 'FETCH_START' });
            const res = await axiosInstance.get("/orders");
            dispatch({ type: 'FETCH_SUCCESS', payload: res.data }); // Use FETCH_SUCCESS to replace all orders
        } catch (error) {
            dispatch({ type: 'FETCH_ERROR', payload: error.message });
            console.error("Failed to refresh orders:", error);
        }
    }

    // const searchMotobike = (text) => {
    //     dispatch({ type: "QUERY_PRODUCTS", payload: text });
    // };

    return <OrdersContext.Provider value={{ state, dispatch, getAllOrders, addOrder }}>{children}</OrdersContext.Provider>
}
export const useOrders = () => useContext(OrdersContext) // Corrected hook to use OrdersContext