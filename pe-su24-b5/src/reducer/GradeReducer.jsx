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

        default:
            return state;
    }
};
