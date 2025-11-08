import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";

const Home = () => {
  const {
    state: { filtered: something },
    searchCar,
  } = useCar();


  return (
    <Container>
        <Row><h1 style={{textAlign:"center"}}></h1></Row>
        <Row></Row>
    </Container>
  )
};
export default Home;
