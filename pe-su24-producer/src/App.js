import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./components/LoginForm";
import HomePage from "./components/HomePage";
import { MovieProvider } from "./context/MovieContext";
import { ProducerProvider } from "./context/ProducerContext";
import { DirectorProvider } from "./context/DirectorContext";
import { StarProvider } from "./context/StarContext";
import AddStar from "./components/AddStar";
function App() {
  return (
    <MovieProvider>
      <ProducerProvider>
        <DirectorProvider>
          <StarProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/" />
                <Route path="/movies/:id/add-star" element={<AddStar/>} />
                <Route path="/view/:id" />
              </Routes>
            </BrowserRouter>
          </StarProvider>
        </DirectorProvider>
      </ProducerProvider>
    </MovieProvider>
  );
}

export default App;
