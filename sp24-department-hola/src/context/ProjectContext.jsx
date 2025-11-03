import { createContext, useContext, useEffect, useReducer } from "react";
import axiosInstance from "../api/api"; // Assuming axiosInstance is used for products
import { ProjectReducer } from "../reducer/ProjectReducer";
import { initialState } from "../reducer/ProjectReducer";
export const ProjectContext = createContext(null);

export const ProjectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProjectReducer, initialState);

  useEffect(() => {
    const controller = new AbortController();

    const getProject = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const res = await axiosInstance.get("/projects", {
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
    getProject();

    return () => controller.abort();
  }, []);
  const setDepFilter = (dep) => {
    dispatch({ type: "SET_DEP_FILTER", payload: dep });
  };

  return (
    <ProjectContext.Provider value={{ state, dispatch, setDepFilter }}>
      {children}
    </ProjectContext.Provider>
  );
};
export const useProject = () => useContext(ProjectContext);
