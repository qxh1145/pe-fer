export const initialState = {
    details: [],
    loading: true,
    error: "",
    query: "",
    filtered: [],
 };

export const DetailReducer = (state, action) => {
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
                details: action.payload,
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
