import { createContext, useContext, useEffect, useReducer } from "react";
import axiosInstance from "../api/api"; // Assuming axiosInstance is used for products
import { BrandReducer } from "../reducer/BrandReducer";
import { initialState } from "../reducer/BrandReducer";
export const BrandContext = createContext(null);

export const BrandProvider = ({ children }) => {
  const [state, dispatch] = useReducer(BrandReducer, initialState);

  useEffect(() => {
    const controller = new AbortController();

    const getBrand = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const res = await axiosInstance.get("/brand", {
          signal: controller.signal,
        }); // Assuming /products endpoint
        dispatch({ type: "FETCH_SUCCESS", payload: res.data });
      } catch (error) {
        if (error.name !== "CanceledError" && error.name !== "AbortError") {
          dispatch({ type: "FETCH_ERROR", payload: error.message });
          console.error("Fetch projects failed:", error);
        }
      }
    };
    getBrand();

    return () => controller.abort();
  }, []);


  return (
    <BrandContext.Provider value={{ state, dispatch }}>
      {children}
    </BrandContext.Provider>
  );
};
export const useBrand = () => useContext(BrandContext);
