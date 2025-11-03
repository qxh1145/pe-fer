export const initialState = {
  patients: [],
  loading: true,
  error: "",
  query: "",
};

export const PatientReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        loading: false,
        patients: action.payload,
        error: "",
      };
    case "FETCH_ERROR":
      return {
        loading: false,
        patients: action.payload,
        error: "",
      };
    case "GET_ALL_PATIENTS":
      return { ...state, patients: [...state.patients, action.payload] };

    case "ADD_TO_LIST": {
      return {...state, patients: [action.payload, ...state.patients]}
    }
    case "UPDATE_PATIENT": 
      const u = action.payload;
      return {
        ...state, 
        patients: state.patients.map(p => (p.id === u.id ? {...p, ...u} : p)),
      }
    case "REMOVE_ITEM": {
      return {
        ...state,
        patients: state.patients.filter(
          (patient) => patient.id !== action.payload.id
        ),
      };
    }

    default:
      return state;
  }
};
export default PatientReducer;
