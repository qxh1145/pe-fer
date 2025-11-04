import { createContext, useContext, useEffect, useReducer } from "react";
import axiosInstance from "../api/api"; // Assuming axiosInstance is used for products
import { DetailReducer } from "../reducer/DetailReducer";
import { initialState } from "../reducer/DetailReducer";
export const DetailContext = createContext(null);

export const DetailsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(DetailReducer, initialState);

    useEffect(() => {
        const controller = new AbortController();

        const getDetail = async () => {
            dispatch({ type: "FETCH_START" });
            try {
                const res = await axiosInstance.get("/student_details", {
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
        getDetail();

        return () => controller.abort();
    }, []);




    return (
        <DetailContext.Provider value={{ state, dispatch }}>
            {children}
        </DetailContext.Provider>
    );
};
export const useDetail = () => useContext(DetailContext);
