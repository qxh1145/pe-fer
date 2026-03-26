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
import InputGroup from "react-bootstrap/InputGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import { IoSearch } from "react-icons/io5";
import { BiFilterAlt } from "react-icons/bi";
import { CardBody } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";     
import { GoHeartFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
const ProductPage = () => {
    const navigate = useNavigate();

  const {
    state: { filtered: mobiles },
    search,
  } = usePhone();

  return (
    <Container className="mt-5">
      <Row>
        <h1>Products</h1>
      </Row>

      <Row className="border p-3">
        <Col md={6}>
          <InputGroup>
            <Button variant="outline-secondary" id="button-addon1">
              <IoSearch />
            </Button>
            <Form.Control
              aria-label="Filter by Genre"
              placeholder="Search product"
              // value={selectedGenre}
              // onChange={handleGenreFilter}
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
            <Form.Select
              aria-label="Filter by years"
              // value={selectedYear}
              // onChange={handleYearFilter}
            >
              <option value="">All Category</option>
              <option value="2019">2019</option>
              <option value="2014">2014</option>
              <option value="2010">2010</option>
              <option value="2008">2008</option>
              <option value="2001">2001</option>
              <option value="1972">1972</option>
            </Form.Select>
          </InputGroup>
        </Col>
        <Col md={3}>
          <InputGroup className="mb-3">
            <DropdownButton
              variant="outline-secondary"
              title={<BiFilterAlt />}
              id="input-group-dropdown-1"
            ></DropdownButton>
            <Form.Select
              aria-label="Filter by years"
              // value={selectedYear}
              // onChange={handleYearFilter}
            >
              <option value="">Name A - Z</option>
              <option value="2019">2019</option>
              <option value="2014">2014</option>
              <option value="2010">2010</option>
              <option value="2008">2008</option>
              <option value="2001">2001</option>
              <option value="1972">1972</option>
            </Form.Select>
          </InputGroup>
        </Col>
      </Row>

      <Row className="mt-3">
        {mobiles.map((m) => (
          <Col md={4}>
            <Card className="h-100">
              <Card.Img style={{height:"50%"}} src={m.image} />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{m.name}</Card.Title>
                <Card.Text>{m.description}</Card.Text>
              </Card.Body>
              <CardBody>
                <Button size="sm" variant="primary">
                  ${m.price}
                </Button>
                <CardBody/>
                <ButtonGroup className="w-100" aria-label="Basic example">
                  <Button size="sm" variant="outline-primary" onClick={() => navigate(`/detail/${m.id}`)}><AiOutlineEye/>View Details</Button>
                  <Button size="sm" variant="success"><AiOutlineShoppingCart/>Add to Cart</Button>
                  <Button size="sm" variant="outline-danger"><GoHeartFill/>Favourite</Button>
                </ButtonGroup>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductPage;
