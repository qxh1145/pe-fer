import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./components/LoginForm";
import HomePage from "./components/HomePage";
import { ProjectProvider } from "./context/ProjectContext";
import { DepartmentProvider } from "./context/DepartmentContext";
import { EmployeeProvider } from "./context/EmployeeContext";
import EmployeeList from "./components/EmployeeList";
function App() {
  return (
    <ProjectProvider>
      <DepartmentProvider>
        <EmployeeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/departments/:id/employees"
                element={<EmployeeList />}
              />
              <Route path="/" />
              <Route path="/view/:id" />
            </Routes>
          </BrowserRouter>
        </EmployeeProvider>
      </DepartmentProvider>
    </ProjectProvider>
  );
}

export default App;
