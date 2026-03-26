import { createContext, useContext, useEffect, useReducer } from "react";
import { PhoneReducer, initialState } from "../reducer/PhoneReducer";
import axiosInstance from "../api/api";

export const PhoneContext = createContext(null);

export const PhoneProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PhoneReducer, initialState);

  useEffect(() => {
    const controller = new AbortController();

    const getPhone = async () => {
      try {
        const res = await axiosInstance.get("/mobiles", {
          signal: controller.signal,
        });
        dispatch({ type: "FETCH_SUCCESS", payload: res.data });
      } catch (error) {
        if (error.name !== "CanceledError" && error.name !== "AbortError") {
          dispatch({ type: "FETCH_ERROR" });
          console.error("Fetch motobike failed:", error);
        }
      }
    };

    getPhone();

    return () => controller.abort();
  }, []);

  const getAllMotbikes = async () => {
    try {
      dispatch({ type: "FETCH_START" });
      const res = await axiosInstance.get("/mobiles");
      dispatch({ type: "GET_ALL", payload: res.data });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR" });
    }
  };

  const search = (text) => {
    dispatch({ type: "QUERY", payload: text });
  };

  return (
    <PhoneContext.Provider value={{ state, dispatch, getAllMotbikes, search }}>
      {children}
    </PhoneContext.Provider>
  );
};
export const usePhone = () => useContext(PhoneContext);
