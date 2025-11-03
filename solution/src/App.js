import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './components/LoginForm';
function App() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path='/' element={<LoginForm username="" password=""/>}/>
          <Route path='/'/>
          <Route path='/' />
          <Route path='/view/:id'  />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
