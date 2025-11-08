export const initialState = {
  cars: [],
  loading: true,
  error: "",
  query: "",
  filtered: [],
};

export const CarReducer = (state, action) => {
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
        cars: action.payload,
        filtered: action.payload, // Initially, filtered is all products
        error: "",
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload || "Failed to fetch products.",
      };
    case "QUERY_CAR":
      const q = action.payload.toLowerCase();
      const filtered = state.cars.filter((m) =>
        m.year == q
      );
      return { ...state, query: action.payload, filtered };

    default:
      return state;
  }
};
