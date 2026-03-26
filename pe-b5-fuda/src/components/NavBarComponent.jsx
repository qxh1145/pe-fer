import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";
import { AiOutlineUserAdd } from "react-icons/ai";
import Carousel from "react-bootstrap/Carousel";
import { usePhone } from "../context/PhoneContext";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const NavBarComponent = () => {
  const navigate = useNavigate()
  const {
    state: { filtered: mobiles },
    search,
  } = usePhone();
  return (
    <Container>
      <Row className="align-content ">
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand>Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link>
                  <AiFillHeart />
                </Nav.Link>
                <Nav.Link>
                  <AiOutlineShoppingCart />
                </Nav.Link>
                <Nav.Link>
                  <BiLogIn />
                </Nav.Link>
                <Nav.Link>
                  <AiOutlineUserAdd />
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Row>

     
    </Container>
  );
};

export default NavBarComponent;
