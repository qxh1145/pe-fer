import { createContext, useContext, useEffect, useReducer } from "react";
import axiosInstance from "../api/api"; // Assuming axiosInstance is used for products
import { ProducerReducer } from "../reducer/ProducerReducer";
import { initialState } from "../reducer/ProducerReducer";
export const DepartmentContext = createContext(null);

export const DepartmentProvider = ({ children }) => {
    const [state, dispatch] = useReducer(DepartmentReducer, initialState);

    useEffect(() => {
        const controller = new AbortController();

        const getDepartment = async () => {
            dispatch({ type: 'FETCH_START' });
            try {
                const res = await axiosInstance.get("/departments", { signal: controller.signal }); // Assuming /products endpoint
                dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
            } catch (error) {
                if (error.name !== "CanceledError" && error.name !== "AbortError") {
                    dispatch({ type: "FETCH_ERROR", payload: error.message });
                    console.error("Fetch departments failed:", error);
                }
            }
        };
        getDepartment();

        return () => controller.abort();
    }, []);



    return (
        <DepartmentContext.Provider value={{ state, dispatch }}>
            {children}
        </DepartmentContext.Provider>
    );
};
export const useDepartment = () => useContext(DepartmentContext);