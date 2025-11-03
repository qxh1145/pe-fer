import { createContext, useContext, useEffect, useReducer } from "react";
import { FoodReducer } from "../reducer/FoodReducer";
import { initialState } from "../reducer/FoodReducer";
import axiosInstance from "../api/api";

export const FoodsContext = createContext(null)

export const FoodsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(FoodReducer, initialState);

    useEffect(() => {
        const controller = new AbortController();

        const getFoods = async () => {
            try {
                const res = await axiosInstance.get("/store", { signal: controller.signal })
                dispatch({ type: 'FETCH_SUCCESS', payload: res.data.products })
            } catch (error) {
                if (error.name !== "CanceledError" && error.name !== "AbortError") {
                    dispatch({ type: "FETCH_ERROR" });
                    console.error("Fetch motobike failed:", error);
                }
            }
        }

        getFoods();

        return () => controller.abort();
    }, [])


    const getAllFoods = async () => {
        try {
            dispatch({ type: 'FETCH_START' });
            const res = await axiosInstance.get("/store");
            dispatch({ type: 'GET_ALL_FOOD', payload: res.data });
        } catch (error) {
            dispatch({ type: 'FETCH_ERROR' })
        }
    }


    return <FoodsContext.Provider value={{ state, dispatch, getAllFoods }}>{children}</FoodsContext.Provider>
}
export const useFoods = () => useContext(FoodsContext) 