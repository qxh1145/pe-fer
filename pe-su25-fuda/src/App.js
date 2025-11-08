
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './conponents/LoginForm';
import Motobikes from './conponents/Motobikes';
import { MotobikesProvider } from './context/MotobikeContext';
import { CartProvider } from './context/CartContext';
import Cart from './conponents/Cart';
import MotobikeDetail from './conponents/MotobikeDetail';
function App() {
  return (
    <MotobikesProvider>
    <CartProvider>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<LoginForm username="" password="" />} />
          <Route path='/motobikes' element={<Motobikes />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/view/:id' element={<MotobikesProvider><MotobikeDetail /></MotobikesProvider>} />
        </Routes>
      </BrowserRouter>
      
    </CartProvider>
    </MotobikesProvider>
  );
}

export default App;
