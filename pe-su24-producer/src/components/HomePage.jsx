import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Table from "react-bootstrap/Table";

import { useMovie } from "../context/MovieContext";
import { useProducers } from "../context/ProducerContext";
import { useDirector } from "../context/DirectorContext";
import { useStar } from "../context/StarContext";
import { Link } from "react-router-dom";
const HomePage = () => {
  const {
    state: { filtered: movies },
    setGenreFilter,
    setProducerFilter // Use filtered projects from context
  } = useMovie();
  const {
    state: { producers },
  } = useProducers();
  const {
    state: { directors },
  } = useDirector();
  const {
    state: { stars },
  } = useStar();

  const allProducer = producers.map((p) => p.name);

  // 2. Dùng Set để lọc duy nhất và chuyển về lại mảng
  const uniqueProducer = [...new Set(allProducer)];

  const handleChangeProducerFilter = (e) => {
    const selectedP = e;
    setGenreFilter(selectedP); // Use context function to set filter
  };

  const handleChangePFilter = (e) => {
    const selectedPro = e
    const pID = producers.find((p) => p.name == selectedPro)?.id

    setProducerFilter(pID)
    console.log(pID)
  }



  return (
    <Container>
      <Row>
        <h1>React Application</h1>
      </Row>
      <Row>
        <div
          className="d-flex gap-5 justify-content-center"
          style={{
            borderTop: "1px solid black",
            borderBottom: "1px solid black",
            padding: "3vh",
          }}
        >
          {/* //   <p href="/" value={"Comedy"} onClick={(e) =>handleChangeProducerFilter(e.target.value)}>Comendy</p>
        //   <p href="/" value={"Action"} onClick={(e) =>handleChangeProducerFilter(e.target.value)}>Action</p>
        //   <p href="/" value={"Cartoon"} onClick={(e) =>handleChangeProducerFilter(e.target.value)}>Cartoon</p> */}
          <p onClick={() => handleChangeProducerFilter("Comedy")}>Comedy</p>
          <p onClick={() => handleChangeProducerFilter("Action")}>Action</p>
          <p onClick={() => handleChangeProducerFilter("Cartoon")}>Cartoon</p>
          <p onClick={() => handleChangeProducerFilter("Drama")}>Drama</p>
        </div>
      </Row>

      <Row>
        <Col md={3}>
          <h5>Producers</h5>
          <ul>
            {uniqueProducer.map((m, index) => (
              <li>
                {/* <a href="">{producers.find((p) => m == p.id)?.name}</a> */}
                <p onClick={() => handleChangePFilter(m)}>{m}</p>
              </li>
            ))}
          </ul>
        </Col>
        <Col md={9}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Release</th>
                <th>Description</th>
                <th>Producer</th>
                <th>Director</th>
                <th>Genres</th>
                <th>Star</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((m) => (
                <tr>
                  <td>{m.id}</td>
                  <td>{m.title}</td>
                  <td>{m.release}</td>
                  <td>{m.description}</td>
                  <td>{producers.find((p) => p.id == m.producer)?.name}</td>
                  <td>{directors.find((d) => d.id == m.director)?.fullname}</td>
                  <td>{m.genres.join(" ")}</td>
                  <td>
                    {m.stars
                      .map((starId, index) => {
                        const star = stars.find((s) => s.id == starId);
                        return <div>{star ? (index + 1) + "-" + star.fullname : "Không rõ"} </div>
                      })
                    }
                    <Link to={`/movies/${m.id}/add-star`}>Add star</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
export default HomePage;
