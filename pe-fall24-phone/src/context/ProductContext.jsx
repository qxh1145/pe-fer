import { createContext, useContext, useEffect, useReducer } from "react";
import axiosInstance from "../api/api"; // Assuming axiosInstance is used for products
import { ProductReducer } from "../reducer/ProductReducer";
import { initialState } from "../reducer/ProductReducer";
export const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductReducer, initialState);

  useEffect(() => {
    const controller = new AbortController();

    const getProduct = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const res = await axiosInstance.get("/product", {
          signal: controller.signal,
        }); // Assuming /products endpoint
        dispatch({ type: "FETCH_SUCCESS", payload: res.data });
      } catch (error) {
        if (error.name !== "CanceledError" && error.name !== "AbortError") {
          dispatch({ type: "FETCH_ERROR", payload: error.message });
          console.error("Fetch projects failed:", error);
        }
      }
    };
    getProduct();

    return () => controller.abort();
  }, []);

  const setCategoryFilter = (category) => {
    dispatch({ type: "SET_CATEGORY_FILTER", payload: category });
  };
  const setBrandFilter = (brand) => {
    dispatch({ type: "SET_BRAND_FILTER", payload: brand });
  };
  const removeItem = (id) => dispatch({ type: "REMOVE_ITEM", payload: id  });

  return (
    <ProductContext.Provider
      value={{ state, dispatch, setCategoryFilter, setBrandFilter, removeItem }}
    >
      {children}
    </ProductContext.Provider>
  );
};
export const useProduct = () => useContext(ProductContext);
