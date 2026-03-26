export const initialState = {
  users: [],
  loading: true,
  error: "",
  query: "",
  filtered: [],
};

export const UserReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        loading: false,
        users: action.payload,
        filtered: action.payload,
        error: "",
      };
    case "FETCH_ERROR":
      return {
        loading: false,
        users: action.payload,
        filtered: action.payload,
        error: "",
      };
    
    default:
      return state;
  }
};
