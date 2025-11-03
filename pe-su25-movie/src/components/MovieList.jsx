import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useMovies } from "../context/MovieContext";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

const MoviesList = () => {
  const navigate = useNavigate()

  const {
    state: { filtered, movies, loading, error, query, selectedGenre, selectedYear },
    searchMovies,
    setCategoryFilter,
    setYearFilter,
    dispatch,
  } = useMovies();

  const handleGenreFilter = (e) => {
    const selectedGenre = e.target.value;
    setCategoryFilter(selectedGenre); // Use context function to set filter
  };
  const handleYearFilter = (e) => {
    const selectedYear = e.target.value;
    setYearFilter(selectedYear); // Use context function to set filter
  };

  return (
    <Container>
      <Col>
        <h1>Movies List</h1>
      </Col>
      <Row>
        <Col md={3}>
          <Form.Select
            aria-label="Filter by Genre"
            value={selectedGenre}
            onChange={handleGenreFilter}
          >
            <option value="">All Genres</option>
            <option value="Sci-Fi">Sci-fi</option>
            <option value="Thriller">Thriller</option>
            <option value="Crime">Crime</option>
            <option value="Action">Action</option>
            <option value="Animation">Animation</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select
            aria-label="Filter by years"
            value={selectedYear}
            onChange={handleYearFilter}
          >
            <option value="">All Year</option>
            <option value="2019">2019</option>
            <option value="2014">2014</option>
            <option value="2010">2010</option>
            <option value="2008">2008</option>
            <option value="2001">2001</option>
            <option value="1972">1972</option>
          </Form.Select>
        </Col>
        <Col md={6}>
          <Form.Control type="text" value={query} onChange={(e) => searchMovies(e.target.value)}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            style={{ float: "right", marginTop: "4vh" }}
            variant="success"
            onClick={() => navigate("booking/create")}
          >
            Success
          </Button>
        </Col>
      </Row>

      <Row>
        {filtered.map((m) => (
          <Col md={3} className="mb-3">
            <Card className="h-100 ">
              <Card.Img
                className="h-50"
                variant="top"
                src={`../../images/${m.poster}`}
              />
              <Card.Body>
                <Card.Title>{m.title}</Card.Title>
                <Card.Text>
                  <span style={{ fontWeight: "bold" }}>Genre: </span> {m.genre}
                </Card.Text>
                <Card.Text>
                  <span style={{ fontWeight: "bold" }}>releaseYear: </span>
                  {m.releaseYear}
                </Card.Text>
                <Card.Text>
                  <span style={{ fontWeight: "bold" }}>Duration: </span>
                  {m.duration}
                </Card.Text>
                <Card.Text>
                  <span style={{ fontWeight: "bold" }}>Rating: </span>
                  {m.rating}
                </Card.Text>
                <Card.Text>
                  <span style={{ fontWeight: "bold" }}>Booked: </span>
                  {m.booked}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
export default MoviesList;
