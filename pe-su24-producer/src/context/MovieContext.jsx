import { createContext, useContext, useEffect, useReducer } from "react";
import axiosInstance from "../api/api"; // Assuming axiosInstance is used for products
import { MovieReducer } from "../reducer/MovieReducer";
import { initialState } from "../reducer/MovieReducer";
export const MovieContext = createContext(null);

export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MovieReducer, initialState);

  useEffect(() => {
    const controller = new AbortController();

    const getMovie = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const res = await axiosInstance.get("/movies", {
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
    getMovie();

    return () => controller.abort();
  }, []);

      const setGenreFilter = (genre) => {
        dispatch({ type: "SET_FILTER", payload: genre });
    };

    const updateMovieStars = (movieId, stars) => {
        dispatch({ type: "UPDATE_MOVIE_STARS", payload: { movieId, stars }})
    }

    const setProducerFilter = (producer) =>{
        dispatch({type: "SET_FILTER_PRODUCER", payload: producer})
    }

  return (
    <MovieContext.Provider value={{ state, dispatch, setGenreFilter , updateMovieStars, setProducerFilter}}>
      {children}
    </MovieContext.Provider>
  );
};
export const useMovie = () => useContext(MovieContext);
