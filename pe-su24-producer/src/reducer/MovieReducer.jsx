export const initialState = {
  movies: [],
  loading: true,
  error: "",
  query: "",
  filtered: [],
  selectedProducer: "",
  selectedGenre: "",
};

export const MovieReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        loading: true,
        error: "",
      };
    case "FETCH_SUCCESS":
      return {
        loading: false,
        movies: action.payload,
        filtered: action.payload, // Initially, filtered is all products
        error: "",
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload || "Failed to fetch .",
      };
    case "SET_FILTER":
      const genre = action.payload;
      const newFilteredGenre = genre
        ? state.movies.filter((movie) => movie.genres.includes(genre))
        : state.movies;
      return {
        ...state,
        selectedGenre: genre,
        filtered: newFilteredGenre,
      };
      case "SET_FILTER_PRODUCER":
      const producer = action.payload;
      const newFilterProducer = producer
        ? state.movies.filter((movie) => movie.producer == producer)
        : state.movies;
      return {
        ...state,
        selectedProducer: producer,
        filtered: newFilterProducer,
      };
    case "UPDATE_MOVIE_STARS": {
      const { movieId, stars } = action.payload;
      const updateMovie = (movies) =>
        movies.map((movie) =>
          movie.id === movieId ? { ...movie, stars: stars } : movie
        );

      return {
        ...state,
        movies: updateMovie(state.movies),
        filtered: updateMovie(state.filtered),
      };
    }
    default:
      return state;
  }
};
