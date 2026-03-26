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
const FilterBar = () => {
  const {
    state: { filtered: users },
  } = useUser();

  const {
    state: { filtered: payments },
    dispatch,
    search,
  } = usePayment();
  return (
    <Container>
      <Row className="border p-3">
        <Col md={3}>
          <InputGroup>
            <Button variant="outline-secondary" id="button-addon1">
              <IoSearch />
            </Button>
            <Form.Control
              aria-label="Filter by Genre"
              placeholder="Search by sem or course name"
              onChange={(e) => search(e.target.value)}
            ></Form.Control>
          </InputGroup>
        </Col>

        <Col md={3}>
          <InputGroup className="mb-3">
            <DropdownButton
              variant="outline-secondary"
              title={<BiFilterAlt />}
              id="input-group-dropdown-1"
            ></DropdownButton>
            <Dropdown>
              <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                Sort by Course Name
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => dispatch({ type: "SORT_ASC_COURSENAME" })}
                >
                  A → Z
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => dispatch({ type: "SORT_DESC_COURSENAME" })}
                >
                  Z → A
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </InputGroup>
        </Col>
        <Col md={3}>
          <InputGroup className="mb-3">
            <DropdownButton
              variant="outline-secondary"
              title={<BiFilterAlt />}
              id="input-group-dropdown-1"
            ></DropdownButton>
            <Dropdown>
              <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                Sort by date
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => dispatch({ type: "SORT_ASC_DATE" })}
                >
                  A → Z
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => dispatch({ type: "SORT_DESC_DATE" })}
                >
                  Z → A
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </InputGroup>
        </Col>

        <Col md={3}>
          <InputGroup className="mb-3 w-100">
            <DropdownButton
              variant="outline-secondary"
              title={<BiFilterAlt />}
              id="input-group-dropdown-1"
            ></DropdownButton>
            <Dropdown >
              <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                Sort by amount
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => dispatch({ type: "SORT_ASC_AMOUNT" })}
                >
                  A → Z
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => dispatch({ type: "SORT_DESC_AMOUNT" })}
                >
                  Z → A
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default FilterBar;
