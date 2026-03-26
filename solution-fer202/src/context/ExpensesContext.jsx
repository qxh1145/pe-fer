import { createContext, useContext, useEffect, useReducer } from "react";
import { ExpensesReducer, initialState } from "../reducer/ExpensesReducer";
import axiosInstance from "../api/api";

export const ExpensesContext = createContext(null);

export const ExpensesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ExpensesReducer, initialState);

  useEffect(() => {
    const controller = new AbortController();

    const getExpenses = async () => {
      try {
        const res = await axiosInstance.get("/expenses", {
          signal: controller.signal,
        });
        dispatch({ type: "FETCH_SUCCESS", payload: res.data });
      } catch (error) {
        if (error.name !== "CanceledError" && error.name !== "AbortError") {
          dispatch({ type: "FETCH_ERROR" });
          console.error("Fetch failed:", error);
        }
      }
    };

    getExpenses();

    return () => controller.abort();
  }, []);

  const getAll = async () => {
    try {
      dispatch({ type: "FETCH_START" });
      const res = await axiosInstance.get("/expenses");
      dispatch({ type: "GET_ALL", payload: res.data });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR" });
    }
  };

  const removeExpenses = (id) =>
    dispatch({ type: "REMOVE", payload: { id } });
  const addToList = (expenses) =>
    dispatch({ type: "ADD_TO_LIST", payload: expenses });
  const updateExpenses = (expenses) =>
    dispatch({ type: "UPDATE", payload: expenses });

  return (
    <ExpensesContext.Provider value={{ state, dispatch, getAll, removeExpenses, updateExpenses, addToList }}>
      {children}
    </ExpensesContext.Provider>
  );
};
export const useExpenses = () => useContext(ExpensesContext);
