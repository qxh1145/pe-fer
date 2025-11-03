import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParams, useNavigate } from "react-router-dom";
import { useMovie } from "../context/MovieContext";
import { useStar } from "../context/StarContext";
import { useState, useEffect } from "react";

const AddStar = () => {
  const {
    state: { filtered: movies },
    updateMovieStars,
  } = useMovie();
  const {
    state: { stars },
  } = useStar();

  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [selectedStars, setSelectedStars] = useState([]);

  useEffect(() => {
    const foundMovie = movies.find((m) => m.id === id);
    if (foundMovie) {
      setMovie(foundMovie);
      setSelectedStars(foundMovie.stars || []);
    }
  }, [id, movies]);

  const handleStarChange = (starId) => {
    setSelectedStars((prevSelectedStars) => {
      if (prevSelectedStars.includes(starId)) {
        return prevSelectedStars.filter((id) => id !== starId);
      } else {
        return [...prevSelectedStars, starId];
      }
    });
  };

  const handleSave = () => {
    updateMovieStars(id, selectedStars);
    navigate("/"); // Go back to the previous page
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row style={{ textAlign: "center" }}>
        <h1>Add star to movie</h1>
      </Row>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Movie title</Form.Label>
          <Form.Control type="text" value={movie.title} disabled />
        </Form.Group>
        <Form.Group>
          <Form.Label>Stars</Form.Label>
          {stars.map((s) => (
            <Form.Check
              key={s.id}
              label={s.fullname}
              value={s.id}
              checked={selectedStars.includes(Number(s.id))}
              onChange={() => handleStarChange(Number(s.id))}
            />
          ))}
        </Form.Group>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default AddStar;