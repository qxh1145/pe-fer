import { createContext, useContext, useEffect, useReducer } from "react";
import { UserReducer, initialState } from "../reducer/UserReducer";
import axiosInstance from "../api/api";

export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, initialState);

    useEffect(() => {
        const controller = new AbortController();

        const getUser = async () => {
            try {
                const res = await axiosInstance.get("/users", { signal: controller.signal })
                dispatch({ type: 'FETCH_SUCCESS', payload: res.data })
            } catch (error) {
                if (error.name !== "CanceledError" && error.name !== "AbortError") {
                    dispatch({ type: "FETCH_ERROR" });
                    console.error("Fetch motobike failed:", error);
                }
            }
        }

        getUser();

        return () => controller.abort();
    }, [])



    return <UserContext.Provider value={{ state, dispatch}}>{children}</UserContext.Provider>
}
export const useUser = () => useContext(UserContext) 