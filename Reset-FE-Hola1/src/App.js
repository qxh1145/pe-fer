import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Products from "./pages/Products";
import Review from "./pages/Review";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Bắt đầu khai báo các route các màn tương ứng url tại đây  */}
                <Route path="/" element={<Products />} />
                <Route path="reviews" element={<Review />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;