import { createContext, useContext, useEffect, useReducer } from "react";
import axiosInstance from "../api/api"; // Assuming axiosInstance is used for products
import { ProducersReducers } from "../reducer/ProducerReducer";
import { initialState } from "../reducer/ProducerReducer";
export const ProducersContext = createContext(null);

export const ProducerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProducersReducers, initialState);

  useEffect(() => {
    const controller = new AbortController();

    const getProducers = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const res = await axiosInstance.get("/producers", {
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
    getProducers();

    return () => controller.abort();
  }, []);

  const addStar = (star) => {
    dispatch({ type: "ADD_STAR", payload: star });
  };

  return (
    <ProducersContext.Provider value={{ state, dispatch, addStar }}>
      {children}
    </ProducersContext.Provider>
  );
};
export const useProducers = () => useContext(ProducersContext);
