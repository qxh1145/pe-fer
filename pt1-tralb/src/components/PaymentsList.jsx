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
import InputGroup from "react-bootstrap/InputGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useUser } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { usePayment } from "../context/PaymentContext";
import { IoSearch } from "react-icons/io5";
import { BiFilterAlt } from "react-icons/bi";
import { CardBody } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GoHeartFill } from "react-icons/go";

const PaymentList = () => {
  const {
    state: { filtered: payments },
    dispatch
  } = usePayment();

  return (
    <Container>
      <Row>
        {payments.map((p) => (
          <Col md={4}>
            <Card style={{}}>
              <Card.Body>
                <Card.Title>{p.semester}</Card.Title>
                <Card.Text>{p.courseName}</Card.Text>
                <Card.Text>{p.amount}</Card.Text>
                <Card.Text>{p.date}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PaymentList;
