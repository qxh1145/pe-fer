export const initialState = {
    users: [],
    loading: true,
    error: '',
};

export const usersReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return {loading: false,  users: action.payload, error: ''};
        case 'FETCH_ERROR': 
            return {loading: false, users: action.payload, error: ''}; 
        default: 
            return state;       
    }
};