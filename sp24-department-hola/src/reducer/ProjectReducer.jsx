export const initialState = {
  projects: [],
  loading: true,
  error: "",
  query: "",
  filtered: [],
  selectedDep: ""
};

export const ProjectReducer = (state, action) => {
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
        projects: action.payload,
        filtered: action.payload, // Initially, filtered is all products
        error: "",
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload || "Failed to fetch products.",
      };
    case "SET_DEP_FILTER":
      const dep = action.payload;
      const newFilteredProjects = dep
        ? state.projects.filter((project) => project.department == dep)
        : state.projects;
      return {
        ...state,
        selectedDep: dep,
        filtered: newFilteredProjects,
      };
    default:
      return state;
  }
};
