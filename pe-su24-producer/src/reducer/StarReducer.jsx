export const initialState = {
  stars: [],
  loading: true,
  error: "",
  query: "",
  filtered: [],
  selectedGenre: ""
};

export const StarReducer = (state, action) => {
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
        stars: action.payload,
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
