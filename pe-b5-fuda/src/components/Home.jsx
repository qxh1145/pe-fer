import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";

import { usePhone } from "../context/PhoneContext";
import NavBarComponent from "./NavBarComponent";
import ProductPage from "./ProductPage";
const Home = () => {
  const {
    state: { filtered: mobiles },
    search,
  } = usePhone();

  return (
    <Container>
      <Row>
        <NavBarComponent/>
      </Row>
      <Row>
        <ProductPage/>
      </Row>
      <Row></Row>
    </Container>
  );
};
export default Home;
