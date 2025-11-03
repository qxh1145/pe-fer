import { createContext, useContext, useEffect, useReducer } from "react";
import { MotobikesReducer } from "../reducer/MotobikeReducer";
import { initialState } from "../reducer/MotobikeReducer";
import axios from "axios";
import axiosInstance from "../api/api";

export const MotobikesContext = createContext(null)

export const MotobikesProvider = ({ children }) => {
    const [state, dispatch] = useReducer(MotobikesReducer, initialState);

    useEffect(() => {
        const controller = new AbortController();

        const getMotobikes = async () => {
            try {
                const res = await axiosInstance.get("/Motorbikes", { signal: controller.signal })
                dispatch({ type: 'FETCH_SUCCESS', payload: res.data })
            } catch (error) {
                if (error.name !== "CanceledError" && error.name !== "AbortError") {
                    dispatch({ type: "FETCH_ERROR" });
                    console.error("Fetch motobike failed:", error);
                }
            }
        }

        getMotobikes();

        return () => controller.abort();
    }, [])


    const getAllMotbikes = async () => {
        try {
            dispatch({ type: 'FETCH_START' });
            const res = await axiosInstance.get("/Motorbikes");
            dispatch({ type: 'GET_ALL_MOTOBIKES', payload: res.data });
        } catch (error) {
            dispatch({ type: 'FETCH_ERROR' })
        }
    }

    const searchMotobike = (text) => {
        dispatch({ type: "QUERY_MOTOBIKE", payload: text });
    };

    return <MotobikesContext.Provider value={{ state, dispatch, getAllMotbikes, searchMotobike }}>{children}</MotobikesContext.Provider>
}
export const useMotobikes = () => useContext(MotobikesContext) 