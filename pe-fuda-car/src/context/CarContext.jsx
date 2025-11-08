import { createContext, useContext, useEffect, useReducer } from "react";
import axiosInstance from "../api/api"; // Assuming axiosInstance is used for products
import { CarReducer, initialState } from "../reducer/CarReducer";
export const CarContext = createContext(null);

export const CarProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CarReducer, initialState);

  useEffect(() => {
    const controller = new AbortController();

    const getCar = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const res = await axiosInstance.get("/Cars", {
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
    getCar();

    return () => controller.abort();
  }, []);

    const searchCar = (text) => {
        dispatch({ type: "QUERY_CAR", payload: text });
    };


  return (
    <CarContext.Provider value={{ state, dispatch, searchCar}}>
      {children}
    </CarContext.Provider>
  );
};
export const useCar = () => useContext(CarContext);
