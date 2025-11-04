import { createContext, useContext, useEffect, useReducer } from "react";
import axiosInstance from "../api/api"; // Assuming axiosInstance is used for products
import { GradeReducer } from "../reducer/GradeReducer";
import { initialState } from "../reducer/GradeReducer";
export const GradeContext = createContext(null);

export const GradeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(GradeReducer, initialState);

    useEffect(() => {
        const controller = new AbortController();

        const getGrade = async () => {
            dispatch({ type: "FETCH_START" });
            try {
                const res = await axiosInstance.get("/evaluations", {
                    signal: controller.signal,
                });
                dispatch({ type: "FETCH_SUCCESS", payload: res.data });
            } catch (error) {
                if (error.name !== "CanceledError" && error.name !== "AbortError") {
                    dispatch({ type: "FETCH_ERROR", payload: error.message });
                    console.error("Fetch projects failed:", error);
                }
            }
        };
        getGrade();

        return () => controller.abort();
    }, []);




    return (
        <GradeContext.Provider value={{ state, dispatch }}>
            {children}
        </GradeContext.Provider>
    );
};
export const useGrade = () => useContext(GradeContext);
