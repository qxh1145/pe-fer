import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./components/LoginForm";
import HomePage from "./components/HomePage";
import { CategoryProvider } from "./context/CategoryContext";
import { ProductProvider } from "./context/ProductContext";
import { BrandProvider } from "./context/BrandContext";
import Details from "./components/Detail";
function App() {
  return (
    <ProductProvider>
      <CategoryProvider>
        <BrandProvider> 
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products/detail/:id" element={<Details/>} />
              <Route path="/" />
              <Route path="/view/:id" />
            </Routes>
          </BrowserRouter>
        </BrandProvider>
      </CategoryProvider>
    </ProductProvider>
  );
}

export default App;
