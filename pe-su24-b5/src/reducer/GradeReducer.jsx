export const initialState = {
  grades: [],
  loading: true,
  error: "",
  filtered: [],
};

export const GradeReducer = (state, action) => {
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
        grades: action.payload,
        filtered: action.payload, // Initially, filtered is all products
        error: "",
      };

    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload || "Failed to fetch .",
      };
    case "ADD_GRADE": {
      const newGrade = action.payload;
      return { 
        ...state, 
        // Thêm vào danh sách gốc
        grades: [...state.grades, newGrade], 
        // Đồng thời thêm vào danh sách đang hiển thị (filtered)
        filtered: [...state.filtered, newGrade] 
      };
    }
    case "CLEAR_FORM": {
      return initialState;
    }

    default:
      return state;
  }
};
