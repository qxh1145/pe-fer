export const initialState = {
  directors: [],
  loading: true,
  error: "",
  query: "",
  filtered: [],
  selectedGenre: ""
};

export const DirectorReducer = (state, action) => {
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
        directors: action.payload,
        filtered: action.payload, // Initially, filtered is all products
        error: "",
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload || "Failed to fetch .",
      };

    default:
      return state;
  }
};
