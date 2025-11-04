import { createContext, useContext, useEffect, useReducer } from "react";
import axiosInstance from "../api/api"; // Assuming axiosInstance is used for products
import { StudentsReducer } from "../reducer/StudentReducer";
import { initialState } from "../reducer/StudentReducer";
export const StudentContext = createContext(null);

export const StudentsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(StudentsReducer, initialState);

    useEffect(() => {
        const controller = new AbortController();

        const getStudent = async () => {
            dispatch({ type: "FETCH_START" });
            try {
                const res = await axiosInstance.get("/students", {
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
        getStudent();

        return () => controller.abort();
    }, []);

     const searchStudent = (text) => {
        dispatch({ type: "QUERY_NAME", payload: text });
    };



    return (
        <StudentContext.Provider value={{ state, dispatch, searchStudent }}>
            {children}
        </StudentContext.Provider>
    );
};
export const useStudent = () => useContext(StudentContext);
