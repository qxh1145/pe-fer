import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./components/LoginForm";

import { JobProvider } from "./context/JobContext";
import HomePage from "./components/HomePage";
import Detail from "./components/Detail";
function App() {
  return (
    <JobProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/detail/:id" element={<Detail/>}/>
          <Route path="/" />
          <Route path="/view/:id" />
        </Routes>
      </BrowserRouter>
    </JobProvider>
  );
}

export default App;
