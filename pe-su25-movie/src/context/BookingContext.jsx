import { createContext, useContext, useEffect, useReducer } from "react";
import { bookingInitialState, BookingReducer } from "../reducer/BookingReducer";

import { useMovies } from "./MovieContext";
import axiosInstance from "../api/api";
export const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(BookingReducer, bookingInitialState);
  const { dispatch: movieDispatch } = useMovies();

  useEffect(() => {
    const controller = new AbortController();
    const fetchUsers = async () => {
      dispatch({ type: "FETCH_USERS_START" });
      try {
        const response = await axiosInstance.get("/users", {
          signal: controller.signal,
        });
        dispatch({ type: "FETCH_USERS_SUCCESS", payload: response.data });
        console.log(response.data);
      } catch (error) {
        if (error.name !== "CanceledError") {
          dispatch({ type: "FETCH_USERS_ERROR", payload: error.message });
          console.error("Failed to fetch users:", error);
        }
      }
    };

    fetchUsers();
    return () => controller.abort();
  }, []);

  const createBooking = async (bookingData) => {
    const { selectedMovie, movieToUpdate } = bookingData;

    // Logic gọi API để cập nhật số lượng đã đặt
    await axiosInstance.patch(`/movies/${selectedMovie}`, {
      booked: movieToUpdate.booked + 1,
    });

    // Dispatch action tới MovieContext để cập nhật state
    movieDispatch({ type: "BOOK_MOVIE", payload: parseInt(selectedMovie) });
  };

  return (
    <BookingContext.Provider
      value={{ bookingState: state, bookingDispatch: dispatch, createBooking }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
