import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useProduct } from "../context/ProductContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useCategory } from "../context/CategoryContext";
import { useBrand } from "../context/BrandContext";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const {
    state: { filtered: products },
    setCategoryFilter,
    setBrandFilter,
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
  const navigate = useNavigate();

  const [selectedB, setSelectedB] = useState("");
  const [selectedC, setSelectedC] = useState("");

  const handleCategoryFilter = (e) => {
    const selectedCategory = e.target.value;
    setSelectedC(selectedCategory);
    setCategoryFilter(selectedCategory); // Use context function to set filter
  };
  const handleBrandFilter = (e) => {
    const selectedBrand = e.target.value;
    setSelectedB(selectedBrand);
    setBrandFilter(selectedBrand); // Use context function to set filter
  };
  return (
    <Container>
      <Row>
        <Col md={3}>
          <h3>Category</h3>
          <Row>
            {categorys.map((c) => (
              <Col md={12}>
                <Form.Check
                  type="radio"
                  label={c.name}
                  value={c.id}
                  onChange={handleCategoryFilter}
                  checked={selectedC == c.id}
                />
              </Col>
            ))}
          </Row>
          <Row>
            <h3>Brand</h3>
            <Row>
              {brands.map((b) => (
                <Col md={12}>
                  <Form.Check
                    type="radio"
                    value={b.id}
                    label={b.name}
                    onChange={handleBrandFilter}
                    checked={selectedB == b.id}
                  />
                </Col>
              ))}
            </Row>
          </Row>
        </Col>
        <Col md={9}>
          <h2>List of Product</h2>
          <Row>
            {products.map((p) => (
              <Col md={3}>
                <Card className="w-200 mt-3">
                  <Card.Img variant="top" src={p.image} />
                  <Card.Body>
                    <Card.Title>{p.title}</Card.Title>
                    <Card.Text>
                      Brand: {brands.find((b) => p.brand == b.id)?.name}
                    </Card.Text>
                    <Card.Text>
                      Category:{" "}
                      {categorys.find((c) => p.category == c.id)?.name}
                    </Card.Text>
                    <Card.Text>
                      <br></br>
                    </Card.Text>
                    <Card.Text>$ {p.price}</Card.Text>
                    <Card.Text>{p.discountPercentage} %</Card.Text>
                    <Card.Text>
                      New Price: ${" "}
                      {(
                        p.price -
                        newPrice(Number(p.price), Number(p.discountPercentage))
                      ).toFixed(0)}
                    </Card.Text>
                    <Button variant="primary" onClick={() => navigate(`/products/detail/${p.id }`)}>View details</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
