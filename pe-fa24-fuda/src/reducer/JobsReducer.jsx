export const initialState = {
  jobs: [],
  loading: true,
  error: "",
  query: "",
  filtered: [],
  reviews:[],
  selectedCategory: "", // New state for selected category
};

export const JobsReducer = (state, action) => {
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
        jobs: action.payload,
        filtered: action.payload, // Initially, filtered is all products
        error: "",
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload || "Failed to fetch products.",
      };
    case 'QUERY_JOBS':
            const q = action.payload.toLowerCase();
            const filtered = state.jobs.filter((j) => j.location.toLowerCase().includes(q))
            return { ...state, query: action.payload, filtered }

    default:
      return state;
  }
};
