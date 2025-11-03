import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProductProvider } from "./context/ProductContext";
import ProductList from "./components/ProductList";
import ReviewList from "./components/ReviewList";
function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/reviews" element={<ReviewList />} />
        </Routes>
      </BrowserRouter>
    </ProductProvider>
  );
}

export default App;
