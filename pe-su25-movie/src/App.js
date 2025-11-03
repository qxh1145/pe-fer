import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MoviesProvider } from './context/MovieContext';
import MoviesList from './components/MovieList';
import BookingList from './components/BookingList';
import { BookingProvider } from './context/BookingContext';
function App() {
  return (
   <BrowserRouter>
      <MoviesProvider>
        <Routes>
          <Route path='/' element={<MoviesList/>}/>
          <Route path='/booking/create'element={<BookingProvider><BookingList/></BookingProvider>}/>
          <Route path='/view/:id'  />
        </Routes>
      </MoviesProvider>
      </BrowserRouter>
  );
}

export default App;
