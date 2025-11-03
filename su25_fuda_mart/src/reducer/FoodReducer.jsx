
export const initialState = {
    foods: [],
    loading: true,
    error: '',
    query: '',
    filtered: []
};

export const FoodReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return { loading: false, foods: action.payload, filtered: action.payload, error: '' };
        case 'FETCH_ERROR':
            return { ...state, loading: false, error: 'Failed to fetch data' };
        case 'GET_ALL_FOOD':
            return { ...state, foods: [...state.foods, ...action.payload] }

        case 'DECREASE_STOCK': {
            const adjust = (list) => list.map((m) =>
                m.id === action.payload? { ...m, stock: Math.max(0, (m.stock ?? 0) - 1) } : m
            );
            return {
                ...state,
                foods: adjust(state.foods),
                filtered: adjust(state.filtered)
            };
        }

       
        default:
            return state;
    }
}
