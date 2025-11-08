export const initialState = {
  employees: [],
  loading: true,
  error: "",
  query: "",
};

export const EmployeeReducer = (state, action) => {
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
        employees: action.payload,
        error: "",
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload || "Failed to fetch products.",
      };
    default:
      return state;
  }
};
