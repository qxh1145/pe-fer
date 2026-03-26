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
import { useUser } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";

const Header = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const {
    state: { filtered: users },
  } = useUser();
  const name = users.find((us) => us.id == id)?.fullName;
  return (
    <Container>
      <Row>
        <Navbar expand="lg" className="bg-body-tertiary ">
          <Container>
            <Navbar.Brand>TuitionTracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <span>Signed as {name}</span>
                <Button variant="danger" onClick={() => navigate("/login")}>Logout</Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Row>
    </Container>
  );
};

export default Header;
