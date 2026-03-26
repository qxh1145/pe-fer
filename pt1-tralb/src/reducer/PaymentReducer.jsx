export const initialState = {
  payments: [],
  loading: true,
  error: "",
  query: "",
  filtered: [],
};

export const PaymentReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        loading: false,
        payments: action.payload,
        filtered: action.payload,
        error: "",
      };
    case "FETCH_ERROR":
      return {
        loading: false,
        payments: action.payload,
        filtered: action.payload,
        error: "",
      };

    case "QUERY":
      const q = action.payload.toLowerCase();
      const filtered = state.payments.filter(
        (m) =>
          m.semester.toLowerCase().includes(q) ||
          m.courseName.toLowerCase().includes(q)
      );
      return { ...state, query: action.payload, filtered };

    case "SORT_ASC_COURSENAME":
      return {
        ...state,
        filtered: [...state.filtered].sort((a, b) => {
          const eleA = a.courseName;
          const eleB = b.courseName;

          return eleA.localeCompare(eleB);
        }),
      };
    case "SORT_DESC_COURSENAME":
      return {
        ...state,
        filtered: [...state.filtered].sort((a, b) => {
          const eleA = a.courseName; // Giữ nguyên để dễ đọc
          const eleB = b.courseName; // Giữ nguyên để dễ đọc

          return eleB.localeCompare(eleA);
        }),
      };

    case "SORT_ASC_DATE":
      return {
        ...state,
        filtered: [...state.filtered].sort((a, b) => {
          const eleA = new Date(a.date);
          const eleB = new Date(b.date);

          return eleA - eleB;
        }),
      };
    case "SORT_DESC_DATE":
      return {
        ...state,
        filtered: [...state.filtered].sort((a, b) => {
          const eleA = new Date(a.date);
          const eleB = new Date(b.date);

          return eleB - eleA;
        }),
      };

    case "SORT_ASC_AMOUNT":
      return {
        ...state,
        filtered: [...state.filtered].sort((a, b) => {
          const eleA = a.amount;
          const eleB = b.amount;

          return eleA - eleB;
        }),
      };
    case "SORT_DESC_AMOUNT":
      return {
        ...state,
        filtered: [...state.filtered].sort((a, b) => {
          const eleA = a.amount;
          const eleB = b.amount;

          return eleB - eleA;
        }),
      };

    default:
      return state;
  }
};
