import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { OrdersProvider } from "./context/OrderContext";
import OrderList from "./components/OrderList";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProductProvider>
                <CartProvider>
                  <OrdersProvider>
                    <ProductList />
                  </OrdersProvider>
                </CartProvider>
              </ProductProvider>
            }
          />
          <Route
            path="/orders"
            element={
              <OrdersProvider>
                <OrderList />
              </OrdersProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
