import { createContext, useContext, useEffect, useReducer, useState } from "react";
import axiosInstance from "../api/api";
import { initialState, usersReducer } from "../reducer/userReducer";
export const UserContext = createContext(null);


export const UserProvider = ({ children }) => {

    const [state, dispatch] = useReducer(usersReducer, initialState)

    useEffect(() => {
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const res = await axiosInstance.get("/UserAccounts", { signal: controller.signal });
                dispatch({ type: "FETCH_SUCCESS", payload: res.data })
            } catch (error) {
                if (error.name !== "CanceledError" && error.name !== "AbortError") {
                    dispatch({ type: "FETCH_ERROR" });
                    console.error("Fetch user failed:", error);
                }
            }
        };

        getUsers();

        return () => controller.abort();
    }, [])

    return (
        <UserContext.Provider value={{state, dispatch}}>{children}</UserContext.Provider>
    )
}
export const useUsers = () => useContext(UserContext)