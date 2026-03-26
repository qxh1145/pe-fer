import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Header from "./Header";
import FilterBar from "./FilterBar";
import PaymentList from "./PaymentsList";
const Home = () => {
  // const {
  //   state: { filtered: something },
  //   searchCar,
  // } = useCar();


  return (
    <Container>
        <Row><Header></Header></Row>
        <Row><FilterBar/></Row>
        <Row><PaymentList/></Row>
    </Container>
  )
};
export default Home;
