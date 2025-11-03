import { createContext, useContext, useEffect, useReducer } from "react";
import axiosInstance from "../api/api"; // Assuming axiosInstance is used for products
import { EmployeeReducer, initialState } from "../reducer/EmployeeReducer";
export const EmployeeContext = createContext(null);

export const EmployeeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(EmployeeReducer, initialState);

    useEffect(() => {
        const controller = new AbortController();

        const getEmployees = async () => {
            dispatch({ type: 'FETCH_START' });
            try {
                const res = await axiosInstance.get("/employees", { signal: controller.signal }); // Assuming /products endpoint
                dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
            } catch (error) {
                if (error.name !== "CanceledError" && error.name !== "AbortError") {
                    dispatch({ type: "FETCH_ERROR", payload: error.message });
                    console.error("Fetch emp failed:", error);
                }
            }
        };
        getEmployees();

        return () => controller.abort();
    }, []);



    return (
        <EmployeeContext.Provider value={{ state, dispatch }}>
            {children}
        </EmployeeContext.Provider>
    );
};
export const useEmployees = () => useContext(EmployeeContext);