import { createContext, useContext, useEffect, useReducer } from "react";
import { MoviesReducer } from "../reducer/MovieReducer";
import { initialState } from "../reducer/MovieReducer";
import axiosInstance from "../api/api";

export const MoviesContext = createContext(null)

export const MoviesProvider = ({ children }) => {
    const [state, dispatch] = useReducer(MoviesReducer, initialState);

    useEffect(() => {
        const controller = new AbortController();

        const getMovies = async () => {
            try {
                const res = await axiosInstance.get("/movies", { signal: controller.signal })
                dispatch({ type: 'FETCH_SUCCESS', payload: res.data })
            } catch (error) {
                if (error.name !== "CanceledError" && error.name !== "AbortError") {
                    dispatch({ type: "FETCH_ERROR" });
                    console.error("Fetch mvs failed:", error);
                }
            }
        }

        getMovies();

        return () => controller.abort();
    }, [])


    const getAllMovies = async () => {
        try {
            dispatch({ type: 'FETCH_START' });
            const res = await axiosInstance.get("/movies");
            dispatch({ type: 'GET_ALL_MOVIES', payload: res.data });
        } catch (error) {
            dispatch({ type: 'FETCH_ERROR' })
        }
    }

    const searchMovies = (text) => {
        dispatch({ type: "QUERY_MOVIES", payload: text });
    };

    const setCategoryFilter = (category) => {
        dispatch({ type: "SET_CATEGORY_FILTER", payload: category });
    };
    const setYearFilter = (year) => {
        dispatch({ type: "SET_YEAR_FILTER", payload: year });
    };

    

    return <MoviesContext.Provider value={{ state, dispatch, getAllMovies, searchMovies, setCategoryFilter,setYearFilter }}>{children}</MoviesContext.Provider>
}
export const useMovies = () => useContext(MoviesContext) 