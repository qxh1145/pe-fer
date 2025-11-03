import { createContext, useContext, useEffect, useReducer } from "react";
import axiosInstance from "../api/api"; // Assuming axiosInstance is used for products
import { StarReducer } from "../reducer/StarReducer";
import { initialState } from "../reducer/StarReducer";
export const StarContext = createContext(null);

export const StarProvider = ({ children }) => {
  const [state, dispatch] = useReducer(StarReducer, initialState);

  useEffect(() => {
    const controller = new AbortController();

    const getStar = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const res = await axiosInstance.get("/stars", {
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
    getStar();

    return () => controller.abort();
  }, []);


  return (
    <StarContext.Provider value={{ state, dispatch }}>
      {children}
    </StarContext.Provider>
  );
};
export const useStar = () => useContext(StarContext);
