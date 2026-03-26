import { createContext, useContext, useEffect, useReducer } from "react";
import { PaymentReducer, initialState } from "../reducer/PaymentReducer";
import axiosInstance from "../api/api";

export const PaymentContext = createContext(null)

export const PaymentProvider = ({ children }) => {
    const [state, dispatch] = useReducer(PaymentReducer, initialState);

    useEffect(() => {
        const controller = new AbortController();

        const getPayment = async () => {
            try {
                const res = await axiosInstance.get("/payments", { signal: controller.signal })
                dispatch({ type: 'FETCH_SUCCESS', payload: res.data })
            } catch (error) {
                if (error.name !== "CanceledError" && error.name !== "AbortError") {
                    dispatch({ type: "FETCH_ERROR" });
                    console.error("Fetch motobike failed:", error);
                }
            }
        }

        getPayment();

        return () => controller.abort();
    }, [])

    
    const search = (text) => {
        dispatch({ type: "QUERY", payload: text });
    };


    return <PaymentContext.Provider value={{ state, dispatch, search}}>{children}</PaymentContext.Provider>
}
export const usePayment = () => useContext(PaymentContext) 