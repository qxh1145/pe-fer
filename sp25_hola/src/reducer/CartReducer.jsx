export const cartInitial = {
    items: []
};

export const CartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART": {
            const p = action.payload;
            const priceNum = parseFloat(String(p.price).replace("$", "")) || 0;
            const existing = state.items.find((item) => item.id === p.id);
            if (existing) {
                return {
                    ...state,
                    items: state.items.map((item) => item.id === p.id ? { ...item, quantity: item.quantity + 1 } : item
                    )
                };
            }
            return {
               ...state, items: [...state.items, {id: p.id, title: p.title, price: p.price, priceNum, quantity: 1}]
            }
        }
        case "UPDATE_QUANTITY": {
            const { id, quantity } = action.payload;
            return {
                ...state,
                items: state.items.map((item) => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)
            }
        }
        case "REMOVE_ITEM": {
            return { ...state, items: state.items.filter((item) => item.id !== action.payload.id) }
        }
        case "CLEAR_CART":
            return cartInitial;

        default: 
            return state;    
    }
}
