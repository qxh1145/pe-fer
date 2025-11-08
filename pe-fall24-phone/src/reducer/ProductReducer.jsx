export const initialState = {
  products: [],
  loading: true,
  error: "",
  query: "",
  filtered: [],
  selectedCate: "",
  selectedBrand: "",
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

    case "SET_CATEGORY_FILTER": {
      const category = action.payload;
      let filteredProducts = state.products;
      if (category) {
        filteredProducts = filteredProducts.filter(
          (p) => p.category == category
        );
      }
      if (state.selectedBrand) {
        filteredProducts = filteredProducts.filter(
          (p) => p.brand == state.selectedBrand
        );
      }
      return { ...state, selectedCate: category, filtered: filteredProducts };
    }

    case "SET_BRAND_FILTER": {
      const brand = action.payload;
      let filteredProducts = state.products;
      if (state.category) {
        filteredProducts = filteredProducts.filter(
          (p) => p.category == state.selectedCate
        );
      }
      if (brand) {
        filteredProducts = filteredProducts.filter((p) => p.brand == brand);
      }
      return { ...state, selectedBrand: brand, filtered: filteredProducts };
    }
    case "REMOVE_ITEM": {
      return {
        ...state,
        products: state.products.filter((p) => p.id != action.payload),
        filtered: state.filtered.filter((p) => p.id != action.payload),
      };
    }
    default:
      return state;
  }
};
