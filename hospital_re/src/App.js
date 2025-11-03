import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import PatientList from './components/PatitentList';
import { PatientProvider } from './context/PatientContext';

function App() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path='/' element={<LoginForm username="" password="" />} />
          <Route path='/patients' element={<PatientProvider><PatientList/></PatientProvider>}/>

          
        </Routes>
      </BrowserRouter>
  );
}

export default App;
