import { useCar } from "../context/CarContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

const Home = () => {
  const {
    state: { filtered: cars },
    searchCar
  } = useCar();

  return (
    <Container>
      <Row>
        <Form.Label>Search car by Price</Form.Label>
        <Form.Control type="number" placeholder="Search car" onChange={(e) => searchCar(e.target.value)}/>
      </Row>
      <Row>
        {cars.map((c) => (
          <Col className="gap-3" md={3}>
            <Card style={{textAlign: "center"}} >
              <Card.Img variant="top" src={c.image} />
              <Card.Body>
                <Card.Title>
                  {c.make} {c.model}{" "}
                </Card.Title>
                <Card.Text>Year: {c.year}</Card.Text>
                <Card.Text>Price: {c.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
export default Home;
