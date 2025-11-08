import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useProduct } from "../context/ProductContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useCategory } from "../context/CategoryContext";
import { useBrand } from "../context/BrandContext";
import Form from "react-bootstrap/Form";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Details = () => {
  const navigate = useNavigate();
  const {
    state: { filtered: products },
    removeItem,
  } = useProduct();

  const {
    state: { categorys },
  } = useCategory();
  const {
    state: { brands },
  } = useBrand();

  const newPrice = (price, discount) => {
    return price * (discount / 100);
  };

  const { id } = useParams();
  const product = useMemo(() => {
    return products.find((m) => m.id == id);
  }, [products, id]);

  const bhome = () => navigate("/");
  const handleRemoveItem = () => {
    const selected = id;

    removeItem(selected);
    alert("sdaskmd");
    bhome();
  };
  return (
    <Container>
      <Row>
        <Col md={4}>Img</Col>
        <Col md={8}>
          <h1>Product Details: {product.title}</h1>
          <p style={{ fontWeight: "bold" }}>
            <>id: {product.id}</>
          </p>
          <p style={{ fontWeight: "bold" }}>
            descriptions:{product.description}{" "}
          </p>
          <p style={{ fontWeight: "bold" }}>price: {product.price} $ </p>
          <p style={{ fontWeight: "bold" }}>
            discount:{product.discountPercentage} %{" "}
          </p>
          <p style={{ fontWeight: "bold" }}>
            newPrice:{" "}
            {(
              product.price -
              newPrice(
                Number(product.price),
                Number(product.discountPercentage)
              )
            ).toFixed(0)}{" "}
            $
          </p>
          <Col className="gap-3">
            <Button variant="success" onClick={() => navigate("/")}>
              Home
            </Button>
            <Button variant="success" onClick={handleRemoveItem}>
              Delete
            </Button>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};
export default Details;
