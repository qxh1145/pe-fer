import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useMovies } from "../context/MovieContext";
import { useBooking } from "../context/BookingContext";

const BookingList = () => {
  const { state: { movies }, dispatch: movieDispatch } = useMovies();
  const { bookingState: { users }, createBooking } = useBooking();
  const navigate = useNavigate();

  const [selectedUser, setSelectedUser] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [seats, setSeats] = useState(1);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Xóa lỗi cũ khi submit lại

    // 1. Validation: Kiểm tra tất cả các trường và số ghế
    if (!selectedUser || !selectedMovie || !bookingDate || !seats || parseInt(seats, 10) < 1) {
      setError("all field are required and seat must be larger than 0");
      return;
    }

    try {
      const movieToUpdate = movies.find(m => m.id == selectedMovie);
      // Gọi hàm createBooking từ context
      await createBooking({ selectedMovie, movieToUpdate });
      
      alert("Đặt vé thành công!");
      navigate("/"); // Redirect to homepage
    } catch (error) {
      console.error("Failed to book movie:", error);
      setError("An error occurred while booking. Please try again.");
    }
  };

  return (
    <Container>
      <Row>
        <Col><h1>Create Booking</h1></Col>
      </Row>

      {error && (
        <Row>
          <Col><p style={{ color: 'red' }}>{error}</p></Col>
        </Row>
      )}

      <Row>
        <Col>
          <Form.Select aria-label="select user" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
            <option value="">Select User</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </Form.Select>
        </Col>
        <Col>
          <Form.Select aria-label="Select movie" value={selectedMovie} onChange={(e) => setSelectedMovie(e.target.value)}>
            <option value="">Select Movie</option>
            {movies.map(movie => (
              <option key={movie.id} value={movie.id}>{movie.title}</option>
            ))}
          </Form.Select>
        </Col>
        <Col>
          <Form.Control type="datetime-local" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />
        </Col>
        <Col>
          <Form.Control type="number" placeholder="Seats" value={seats} onChange={(e) => setSeats(e.target.value)} />
        </Col>
        <Col>
          <Button
            variant="success"
            className="w-100"
            onClick={handleSubmit}
          >
            Book
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
export default BookingList;
