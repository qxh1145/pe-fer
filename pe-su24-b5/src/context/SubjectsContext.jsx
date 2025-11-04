import { createContext, useContext, useEffect, useReducer } from "react";
import axiosInstance from "../api/api"; // Assuming axiosInstance is used for products
import { SubjectsReducer } from "../reducer/SubjectsReducer";
import { initialState } from "../reducer/SubjectsReducer";
export const SubjectContext = createContext(null);

export const SubjectsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SubjectsReducer, initialState);

  useEffect(() => {
    const controller = new AbortController();

    const getSubjects = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const res = await axiosInstance.get("/subjects", {
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
    getSubjects();

    return () => controller.abort();
  }, []);


  return (
    <SubjectContext.Provider value={{ state, dispatch }}>
      {children}
    </SubjectContext.Provider>
  );
};
export const useSubject = () => useContext(SubjectContext);
