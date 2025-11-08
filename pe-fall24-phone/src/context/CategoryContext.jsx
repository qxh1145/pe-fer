import { createContext, useContext, useEffect, useReducer } from "react";
import axiosInstance from "../api/api"; // Assuming axiosInstance is used for products
import { CategoryReducer } from "../reducer/CategoryReducer";
import { initialState } from "../reducer/CategoryReducer";
export const CategoryContext = createContext(null);

export const CategoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CategoryReducer, initialState);

  useEffect(() => {
    const controller = new AbortController();

    const getCate = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const res = await axiosInstance.get("/category", {
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
    getCate();

    return () => controller.abort();
  }, []);


  return (
    <CategoryContext.Provider value={{ state, dispatch }}>
      {children}
    </CategoryContext.Provider>
  );
};
export const useCategory = () => useContext(CategoryContext);
