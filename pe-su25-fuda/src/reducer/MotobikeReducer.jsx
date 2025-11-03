
export const initialState = {
    motobikes: [],
    loading: true,
    error: '',
    query: '',
    filtered: []
};

export const MotobikesReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return { loading: false, motobikes: action.payload, filtered: action.payload, error: '' };
        case 'FETCH_ERROR':
            return { loading: false, motobikes: action.payload, filtered: action.payload, error: '' };
        case 'GET_ALL_MOTOBIKES':
            return { ...state, motobikes: [...state.motobikes, action.payload] }
        case 'QUERY_MOTOBIKE':
            const q = action.payload.toLowerCase();
            const filtered = state.motobikes.filter((m) => m.model.toLowerCase().includes(q))
            return { ...state, query: action.payload, filtered }

        case 'DECREASE_STOCK': {
            const adjust = (list) => list.map((m) =>
                m.id === action.payload? { ...m, stock: Math.max(0, (m.stock ?? 0) - 1) } : m
            );
            return {
                ...state,
                motobikes: adjust(state.motobikes),
                filtered: adjust(state.filtered)
            };
        }

        case 'SORT_MOTOBIKE_ASC':
            return {
                ...state, filtered: [...state.filtered].sort((a, b) => {
                    const priceA = parseFloat(a.price.replace('$', '')) || 0;
                    const priceB = parseFloat(b.price.replace('$', '')) || 0;

                    return priceA - priceB
                })
            }
        case 'SORT_MOTOBIKE_DESC':
            return {
                ...state, filtered: [...state.filtered].sort((a, b) => {
                    const priceA = parseFloat(a.price.replace('$', '')) || 0;
                    const priceB = parseFloat(b.price.replace('$', '')) || 0;

                    return priceB - priceA
                })
            }
        default:
            return state;
    }
}
