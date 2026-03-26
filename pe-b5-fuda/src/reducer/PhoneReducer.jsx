export const initialState = {
  mobiles: [],
  loading: true,
  error: "",
  query: "",
  filtered: [],
};

export const PhoneReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        loading: false,
        mobiles: action.payload,
        filtered: action.payload,
        error: "",
      };
    case "FETCH_ERROR":
      return {
        loading: false,
        mobiles: action.payload,
        filtered: action.payload,
        error: "",
      };
    case "GET_ALL":
      return { ...state, mobiles: [...state.mobiles, action.payload] };
      
    case "QUERY":
      const q = action.payload.toLowerCase();
      const filtered = state.mobiles.filter((m) =>
        m.name.toLowerCase().includes(q)
      );
      return { ...state, query: action.payload, filtered };

    default:
      return state;
  }
};
