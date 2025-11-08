import { createContext, useContext, useEffect, useReducer } from "react";
import { MotobikesReducer } from "../reducer/MotobikeReducer";
import { initialState } from "../reducer/MotobikeReducer";
import axiosInstance from "../api/api";

export const Context = createContext(null)

export const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    useEffect(() => {
        const controller = new AbortController();

        const get = async () => {
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

        get();

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

    const search = (text) => {
        dispatch({ type: "QUERY", payload: text });
    };

    const increaseStock = (id, quantity) => {
        dispatch({ type: "INCREASE_STOCK", payload: { id, quantity } });
    };

    return <Context.Provider value={{ state, dispatch, getAllMotbikes, search }}>{children}</Context.Provider>
}
export const useMotobikes = () => useContext(Context) 