import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useExpenses } from "../context/ExpensesContext";
import { useNavigate, useParams } from "react-router-dom";
const Header = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    state: { filtered: expenses },
    removeExpenses,
    updateExpenses,
    addToList,
  } = useExpenses();
  const nameL = expenses.find((ex) => ex.id == id)?.name;

  return (
    <Container>
      <Row>
        <Navbar expand="lg" className="bg-body-tertiary ">
          <Container>
            <Navbar.Brand><img src="./images/logo.png"/></Navbar.Brand>
            <Navbar.Brand>PersonalBudget</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <span>Signed in as <span style={{fontWeight: "bold"}}>{nameL}</span></span>
                <Button variant="danger" onClick={() => navigate("/login")}>
                  Logout
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Row>
    </Container>
  );
};

export default Header;
