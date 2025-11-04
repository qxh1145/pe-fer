export const initialState = {
    students: [],
    loading: true,
    error: "",
    query: "",
    filtered: [],
    selectedGenre: ""
};

export const StudentsReducer = (state, action) => {
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
                students: action.payload,
                filtered: action.payload, // Initially, filtered is all products
                error: "",
            };


        case "FETCH_ERROR":
            return {
                ...state,
                loading: false,
                error: action.payload || "Failed to fetch .",
            };
        case "QUERY_NAME": {
            const query = action.payload;
            let filtered = state.students;
            
            if (query) {
                filtered = filtered.filter(f => f.name.toLowerCase().includes(query.toLowerCase()));
            }
            return { ...state, query: query, filtered: filtered };
        }

        default:
            return state;
    }
};
