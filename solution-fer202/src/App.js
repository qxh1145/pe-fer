import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Home from './components/Home';
function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginForm />}/>
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/home/:id' element={<Home/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
