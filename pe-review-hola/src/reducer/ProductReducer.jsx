export const initialState = {
  products: [],
  loading: true,
  error: "",
  query: "",
  filtered: [],
  reviews:[],
  selectedCategory: "", // New state for selected category
};

export const ProductReducer = (state, action) => {
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
        products: action.payload,
        filtered: action.payload, // Initially, filtered is all products
        error: "",
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload || "Failed to fetch products.",
      };
    case "SET_CATEGORY_FILTER":
      const category = action.payload;
      const newFilteredProducts = category
        ? state.products.filter((product) => product.category === category)
        : state.products; // If category is empty, show all products
      return {
        ...state,
        selectedCategory: category,
        filtered: newFilteredProducts,
      };

    case "ADD_REVIEW": {
      const { productId, review } = action.payload;
      const updateProducts = (products) =>
        products.map((p) => {
          if (p.id === productId) {
            return { ...p, reviews: [...(p.reviews || []), review] };
          }
          return p;
        });

      return {
        ...state,
        products: updateProducts(state.products),
        filtered: updateProducts(state.filtered),
      };
    }

    default:
      return state;
  }
};
