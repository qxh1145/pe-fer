import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterForm  from './components/RegisterForm';
import { CarProvider } from './context/CarContext';
import Home from './components/Home';
function App() {
  return (
    <CarProvider>
    <BrowserRouter>
        <Routes>
          <Route path='/'  element={<RegisterForm/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/view/:id'  />
        </Routes>
      </BrowserRouter>
      </CarProvider>
  );
}

export default App;
