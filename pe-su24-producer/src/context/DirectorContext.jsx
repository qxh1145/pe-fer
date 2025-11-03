import { createContext, useContext, useEffect, useReducer } from "react";
import axiosInstance from "../api/api"; // Assuming axiosInstance is used for products
import { DirectorReducer } from "../reducer/DirectorReducer";
import { initialState } from "../reducer/DirectorReducer";
export const DirectorContext = createContext(null);

export const DirectorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DirectorReducer, initialState);

  useEffect(() => {
    const controller = new AbortController();

    const getDirectors = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const res = await axiosInstance.get("/directors", {
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
    getDirectors();

    return () => controller.abort();
  }, []);


  return (
    <DirectorContext.Provider value={{ state, dispatch }}>
      {children}
    </DirectorContext.Provider>
  );
};
export const useDirector = () => useContext(DirectorContext);
