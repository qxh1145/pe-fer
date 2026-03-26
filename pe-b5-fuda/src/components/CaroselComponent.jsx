import { useNavigate } from "react-router-dom";
import { usePhone } from "../context/PhoneContext";

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
import { AiOutlineArrowRight } from "react-icons/ai";

const CaroselComponent = () => {
  const navigate = useNavigate();
  const {
    state: { filtered: mobiles },
    search,
  } = usePhone();

  return (
    <Container>
      <Row>
        <Carousel data-bs-theme="dark" className="">
          {mobiles.map((m) => (
            <Carousel.Item>
              <img
                className="d-block w-100 "
                src={m.image}
                alt="First slide"
                style={{ height: "500px" }}
              />
              <Carousel.Caption>
                <h5>{m.name}</h5>
                <p>{m.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Row>
      <Row>
        <h1 style={{ textAlign: "center" }}>Welcome to our shop</h1>
      </Row>
      <Row>
        <p style={{ textAlign: "center" }}>
          the best place to buy mobile shop with great offer and quality
          products
        </p>
      </Row>
      <Row className="">
        <Col md={5}></Col>
        <Col md={4}>
          <div>
            <Button
              style={{ width: "60%" }}
              size="lg"
              variant="primary"
              onClick={() => navigate("/shop")}
            >
              Browse mobile shop <AiOutlineArrowRight />
            </Button>
          </div>
        </Col>
        <Col md={4}></Col>
      </Row>
    </Container>
  );
};

export default CaroselComponent;
