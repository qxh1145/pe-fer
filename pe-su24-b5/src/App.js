import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';
import { StudentsProvider } from './context/StudentContext';
import { SubjectsProvider } from './context/SubjectsContext';
import { DetailsProvider } from './context/DetailContext';
import { GradeProvider } from './context/GradeContext';
import Grade from './components/Grade';
function App() {
  return (
    <StudentsProvider>
      <DetailsProvider>
        <SubjectsProvider>
          <GradeProvider>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/student/:studentId' element={<Grade />} />
                <Route path='/' />
                <Route path='/view/:id' />
              </Routes>
            </BrowserRouter>
          </GradeProvider>

        </SubjectsProvider>
      </DetailsProvider>
    </StudentsProvider>
  );
}

export default App;
