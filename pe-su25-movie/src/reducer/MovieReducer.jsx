export const initialState = {
  movies: [],
  loading: true,
  error: "",
  query: "",
  filtered: [],
  selectedYear: "",
  selectedGenre: ""
};

export const MoviesReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        loading: false,
        movies: action.payload,
        filtered: action.payload,
        error: "",
      };
    case "FETCH_ERROR":
      return {
        loading: false,
        movies: action.payload,
        filtered: action.payload,
        error: "",
      };
    case "GET_ALL_MOVIES":
      return { ...state, movies: [...state.movies, action.payload] };
    case "QUERY_MOVIES": {
      const query = action.payload;
      let filteredMovies = state.movies;
      if (state.selectedGenre) {
        filteredMovies = filteredMovies.filter(movie => movie.genre === state.selectedGenre);
      }
      if (state.selectedYear) {
        filteredMovies = filteredMovies.filter(movie => movie.releaseYear == state.selectedYear);
      }
      if (query) {
        filteredMovies = filteredMovies.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()));
      }
      return { ...state, query: query, filtered: filteredMovies };
    }
    case "SET_YEAR_FILTER": {
      const year = action.payload;
      let filteredMovies = state.movies;
      if (state.selectedGenre) {
        filteredMovies = filteredMovies.filter(movie => movie.genre == state.selectedGenre);
      }
      if (year) {
        filteredMovies = filteredMovies.filter(movie => movie.releaseYear == year);
      }
      if (state.query) {
        filteredMovies = filteredMovies.filter(movie => movie.title.toLowerCase().includes(state.query.toLowerCase()));
      }
      return { ...state, selectedYear: year, filtered: filteredMovies };
    }
    case "SET_CATEGORY_FILTER": {
      const genre = action.payload;
      let filteredMovies = state.movies;
      if (genre) {
        filteredMovies = filteredMovies.filter(movie => movie.genre == genre);
      }
      if (state.selectedYear) {
        filteredMovies = filteredMovies.filter(movie => movie.releaseYear == state.selectedYear);
      }
      if (state.query) {
        filteredMovies = filteredMovies.filter(movie => movie.title.toLowerCase().includes(state.query.toLowerCase()));
      }
      return { ...state, selectedGenre: genre, filtered: filteredMovies };
    }
     case "BOOK_MOVIE": {
      const movieId = action.payload;
      const updatedMovies = state.movies.map(movie =>
        movie.id === movieId ? { ...movie, booked: movie.booked + 1 } : movie
      );
      const updatedFilteredMovies = state.filtered.map(movie =>
        movie.id === movieId ? { ...movie, booked: movie.booked + 1 } : movie
      );
      return { ...state, movies: updatedMovies, filtered: updatedFilteredMovies };
    }
    default:
      return state;
  }
};
