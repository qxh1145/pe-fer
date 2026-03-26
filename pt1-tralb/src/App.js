import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Home from "./components/Home";
import { UserProvider } from "./context/UserContext";
import { PaymentProvider } from "./context/PaymentContext";
function App() {
  return (
    <UserProvider>
      <PaymentProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to={"/login"} replace></Navigate>}/>
            <Route  path="/login" element={<LoginForm />}/>
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/home/:id" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </PaymentProvider>
    </UserProvider>
  );
}

export default App;
