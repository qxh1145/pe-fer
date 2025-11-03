import { createContext, useContext, useEffect, useReducer } from "react";
import PatientReducer from "../reducer/PatientReducer";
import axiosInstance from "../api/api";
import { initialState } from "../reducer/PatientReducer";
export const PatientContext = createContext(null);

export const PatientProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PatientReducer, initialState);

  useEffect(() => {
    const controller = new AbortController();

    const getPatient = async () => {
      try {
        const res = await axiosInstance.get("/patients", {
          signal: controller.signal,
        });
        dispatch({ type: "FETCH_SUCCESS", payload: res.data });
      } catch (error) {
        if (error.name !== "CanceledError" && error.name !== "AbortError") {
          dispatch({ type: "FETCH_ERROR" });
          console.error("Fetch patients failed:", error);
        }
      }
    };

    getPatient();

    return () => controller.abort();
  }, []);

  const getAllPatient = async () => {
    try {
      dispatch({ type: "FETCH_START" });
      const res = await axiosInstance.get("/patients");
      dispatch({ type: "GET_ALL_PATIENT", payload: res.data });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR" });
    }
  };

  const removePatient = (id) =>
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  const addToList = (patient) =>
    dispatch({ type: "ADD_TO_LIST", payload: patient });
  const updatePatient = (patient) => dispatch({type: "UPDATE_PATIENT", payload: patient})

  return (
    <PatientContext.Provider
      value={{ state, dispatch, getAllPatient, removePatient, addToList, updatePatient }}
    >
      {children}
    </PatientContext.Provider>
  );
};
export const usePatient = () => useContext(PatientContext);
