import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Store from "./components/Store";
import { FoodsProvider } from "./context/FoodContext";
function App() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path='/' element={<Home/>}/>
          <Route path='/store'element={<FoodsProvider><Store/></FoodsProvider>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
