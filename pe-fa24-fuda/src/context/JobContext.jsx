import { createContext, useContext, useEffect, useReducer } from "react";
import { JobsReducer } from "../reducer/JobsReducer";
import { initialState } from "../reducer/JobsReducer";
import axiosInstance from "../api/api";

export const JobContext = createContext(null)

export const JobProvider = ({ children }) => {
    const [state, dispatch] = useReducer(JobsReducer, initialState);

    useEffect(() => {
        const controller = new AbortController();

        const getJobs = async () => {
            try {
                const res = await axiosInstance.get("/jobs", { signal: controller.signal })
                dispatch({ type: 'FETCH_SUCCESS', payload: res.data })
            } catch (error) {
                if (error.name !== "CanceledError" && error.name !== "AbortError") {
                    dispatch({ type: "FETCH_ERROR" });
                    console.error("Fetch motobike failed:", error);
                }
            }
        }

        getJobs();

        return () => controller.abort();
    }, [])




    const searchJobs = (text) => {
        dispatch({ type: "QUERY_JOBS", payload: text });
    };

    return <JobContext.Provider value={{ state, dispatch, searchJobs }}>{children}</JobContext.Provider>
}
export const useJobs = () => useContext(JobContext) 