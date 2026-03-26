import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import { useExpenses } from "../context/ExpensesContext";
import Header from "./Header";
import Content from "./Content";
const Home = () => {
  const {
    state: { filtered: expenses },
    removeExpenses,
    updateExpenses,
    addToList
  } = useExpenses();


  return (
    <Container>
        <Row><Header/></Row>
        <Row><Content/></Row>
    </Container>
  )
};
export default Home;
