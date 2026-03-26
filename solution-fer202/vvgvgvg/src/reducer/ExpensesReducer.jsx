export const initialState = {
  expenses: [],
  loading: true,
  error: "",
  query: "",
  filtered: [],
};

export const ExpensesReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        loading: false,
        expenses: action.payload,
        filtered: action.payload,
        error: "",
      };
    case "FETCH_ERROR":
      return {
        loading: false,
        expenses: action.payload,
        filtered: action.payload,
        error: "",
      };
    case "GET_ALL":
      return { ...state, expenses: [...state.motobikes, action.payload] };
      
   case "ADD_TO_LIST": {
      return {...state, patients: [action.payload, ...state.patients]}
    }
    case "UPDATE": 
      const u = action.payload;
      return {
        ...state, 
        expenses: state.expenses.map(p => (p.id === u.id ? {...p, ...u} : p)),
      }
    case "REMOVE": {
      return {
        ...state,
        filtered: state.expenses.filter(
          (expenses) => expenses.id !== action.payload.id
        ),
      };
    }
    default:
      return state;
  }
};
