import { Form, Row, Dropdown, Col, Container, Alert } from "react-bootstrap";
import { useMotobikes } from "../context/MotobikeContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Motobikes = () => {
  const {
    state: { filtered, motobikes, loading, error, query },
    searchMotobike,
    dispatch,
  } = useMotobikes();

  const { addToCart } = useCart();
  const [addedItem, setAddedItem] = useState(null);
  const navigate = useNavigate();

  const handleAddToCart = (m) => {
    addToCart(m);
    dispatch({ type: "DECREASE_STOCK", payload: m.id });
    setAddedItem(m);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Container>
        <Row className="d-flex justify-content-center align-content-center mt-4">
          <Col xs={6}>
            <Form.Control
              type="text"
              placeholder="Search by model"
              value={query}
              onChange={(e) => searchMotobike(e.target.value)}
              style={{ width: "70%", float: "right" }}
            />
          </Col>
          <Col xs={6}>
            <Dropdown style={{ float: "left" }}>
              <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                Sort by price
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => dispatch({ type: "SORT_MOTOBIKE_ASC" })}>
                  Low → High
                </Dropdown.Item>
                <Dropdown.Item onClick={() => dispatch({ type: "SORT_MOTOBIKE_DESC" })}>
                  High → Low
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>

      <Container>
        {addedItem && (
          <div className="mt-3">
            <Alert variant="success" className="text-center mb-2 rounded-3 py-3">
              {`${addedItem.model} has been added to your cart.`}
            </Alert>
            <div className="d-flex justify-content-center">
              <Button variant="info" className="rounded-3" onClick={() => navigate('/cart')}>View Cart</Button>
            </div>
          </div>
        )}
        <Row>
          {filtered.map((m) => (
            <Col key={m.id} md={3} className="mt-5">
              <Card className="h-100">
                <Card.Img className="h-100" variant="top" src={m.image} />
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Card.Title>{m.model}</Card.Title>
                  <Card.Text>{m.year}</Card.Text>
                  <Card.Text>{m.price}</Card.Text>
                  <Card.Text>{m.stock}</Card.Text>
                  <div className="d-flex justify-content-center gap-3 ">
                    <Button style={{ width: '50%' }} variant="primary" onClick={() => navigate(`/view/${m.id}`)}>Detail</Button>
                    <Button
                      onClick={() => handleAddToCart(m)}
                      style={{ width: '50%' }}
                      variant="success"
                      disabled={typeof m.stock === 'number' && m.stock <= 0}
                    >
                      {typeof m.stock === 'number' && m.stock <= 0 ? 'Out of stock' : 'Add to cart'}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Motobikes;
