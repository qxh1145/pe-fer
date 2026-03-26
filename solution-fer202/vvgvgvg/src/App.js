import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import { ExpensesProvider } from './context/ExpensesContext';
function App() {
  return (
    <ExpensesProvider>
    <BrowserRouter>
        <Routes>
           <Route path="/" element={<Navigate to={"/login"} replace></Navigate>}/>
          <Route path='/login' element={<LoginForm />}/>
          <Route path='/home/:id' element={<Home/>} />
        </Routes>
      </BrowserRouter>
      </ExpensesProvider>
  );
}

export default App;
