import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { GoArrowLeft } from "react-icons/go";

import { useNavigate, useParams } from "react-router-dom";
import { usePhone } from "../context/PhoneContext";

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    state: { filtered: mobiles },
    search,
  } = usePhone();

  const detailPhone = mobiles.find((m) => m.id == id);

  return (
    <Container>
      <Row style={{ display: "flex" }}>
        <Col>
          <Card>
            <Card.Img src={detailPhone.image} />
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Button variant="primary">{detailPhone.price}</Button>
            </Card.Body>
            <Card.Body>
              <h3>{detailPhone.name}</h3>
            </Card.Body>
            <Card.Body>{detailPhone.description}</Card.Body>

            <Card.Body style={{ marginTop: "60%" }}>
              <ButtonGroup className="w-100" aria-label="Basic example">
                <Button size="sm" variant="success">
                  Add to Cart
                </Button>

                <Button size="sm" variant="outline-primary">
                  View Details
                </Button>
              </ButtonGroup>
            </Card.Body>
            <Card.Body>
              <Button
                className="w-100"
                variant="outline-secondary"
                onClick={() => navigate(-1)}
              >
                <GoArrowLeft />
                back to List
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Detail;
