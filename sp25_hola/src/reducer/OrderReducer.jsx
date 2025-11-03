export const initialState = {
  orders: [],
  loading: true,
  error: "",
  query: "",
  filtered: [],
};

export const OrderReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START": // New action to indicate loading
      return {
        ...state,
        loading: true,
        error: "",
      };
    case "FETCH_SUCCESS":
      return {
        loading: false,
        orders: action.payload,
        filtered: action.payload,
        error: "",
      };
    case "FETCH_ERROR":
      return {
        ...state, // Keep existing orders, but set error and loading to false
        loading: false,
        error: action.payload || "Failed to fetch orders.", // Allow custom error message
      };
    case "ADD_ORDER": // New action to add a single order
      return {
        ...state,
        orders: [...state.orders, action.payload],
        filtered: [...state.filtered, action.payload], // Also add to filtered list
        loading: false, // Assuming add is successful
        error: "",
      };
    default:
      return state;
  }
};
