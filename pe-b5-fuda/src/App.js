import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Home from "./components/Home";
import NavBarComponent from "./components/NavBarComponent";
import { PhoneProvider } from "./context/PhoneContext";
import NavCarou from "./components/NavCarou";
import Details from "./components/Detail";
function App() {
  return (
    <PhoneProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/home/:id" element={<NavCarou />} />
          <Route path="/shop" element={<Home />} />
          <Route path="/detail/:id" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </PhoneProvider>
  );
}

export default App;
