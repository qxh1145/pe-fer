import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useProducts } from "../context/ProductContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const ProductList = () => {
    const navigate = useNavigate()
    
    const {
    state: { filtered, products, loading, error, query, selectedCategory }, // Get selectedCategory from context
    setCategoryFilter,
    addReview,
  } = useProducts();

  const [showMessage, setShowmessage] = useState("");
  const allCategories = products.map((product) => product.category);
  const uniqueCategories = [...new Set(allCategories)];
  const [form, setForm] = useState({
    rating: 5,
    comment: "",
    reviewerName: "",
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const sumAverageRating = (reviews) => {
    console.log(typeof reviews);
    if (!reviews || reviews.length === 0) {
      return 0;
    }
    // Reduce để tính tổng điểm đánh giá với key mình chọn trong mảng reviews
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);

    return Number((totalRating / reviews.length).toFixed(2)); // Trả về trung bình cộng làm tròn đến 1 chữ số thập phân
  };

  const handleChangeFilter = (e) => {
    const selectedCategory = e.target.value;
    setCategoryFilter(selectedCategory); // Use context function to set filter
  };

  const handleSelectedProduct = (product) => {
    setSelectedProduct(product);
    setReviewSubmitted(false); // Reset submission status
    setShowmessage(""); // Clear previous message
    setForm({
      reviewerName: "",
      rating: 5,
      comment: "",
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const newReview = {
      ...form,
      rating: parseInt(form.rating, 10),
      date: new Date().toISOString(),
    };

    await addReview(selectedProduct.id, newReview);
    setReviewSubmitted(true); // Show success message instead of form
    setShowmessage("Thanks for your review");
  };

  return (
    <Container>
      <Row>
        <h1>Products Review Systems</h1>
      </Row>
      <Row className="justify-content-between align-items-center mt-4 mb-4">
        <Col xs={"auto"}>
          <Form.Select
            aria-label="Default select example"
            defaultValue={"Select all category"}
            onChange={(e) => handleChangeFilter(e)}
            value={selectedCategory}
          >
            <option value="">Select all category</option>
            {uniqueCategories.map((category, index) => (
              <option key={index}>{category}</option>
            ))}
          </Form.Select>
        </Col>

        <Col xs={"auto"}>
          <Button variant="success" onClick={() => navigate("/reviews")}>Success</Button>
        </Col>
      </Row>

      <Row>
        <Col md={8}>
          <Row>
            {filtered.map((p) => (
              <Col md={3} className="mb-4">
                <Card className="h-100 w-100 ">
                  <Card.Body className="d-flex flex-column gap-1">
                    <Card.Title>{p.title}</Card.Title>
                    <Card.Text>{p.category}</Card.Text>
                    <Card.Text>{p.price}$</Card.Text>
                    <Card.Text>{sumAverageRating(p.reviews)}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => handleSelectedProduct(p)}
                    >
                      Add new review
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

        <Col md={4} className="border p-3 h-100">
          <h6>Review details</h6>
          {selectedProduct ? (
            <>
              <div>
                <div>Product id: {selectedProduct.id}</div>
                <div>Title: {selectedProduct.title}</div>
                <div>Category: {selectedProduct.category}</div>
                <div>Price: {selectedProduct.price}$</div>
              </div>

              <div className="border"></div>

              {reviewSubmitted ? (
                <div className="alert alert-success mt-3">{showMessage}</div>
              ) : (
                <Form className="mt-3" onSubmit={handleSubmitReview}>
                  <h6>Add a new review</h6>
                  <p>Reviewer name</p>
                  <Form.Control
                    type="text"
                    placeholder="Enter Reviewer name"
                    name="reviewerName"
                    value={form.reviewerName}
                    onChange={handleFormChange}
                    required
                  ></Form.Control>

                  {/* <p className="m-2">Rating</p>
                  <Form.Select >
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </Form.Select> */}
                  <Form.Group className="mb-3 d-flex  gap-2">
                    <Form.Label>Rating</Form.Label>
                    <div>
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <Form.Check
                          key={rating}
                          inline
                          label={rating}
                          name="rating"
                          value={rating}
                          onChange={handleFormChange}
                          checked={Number(form.rating) === rating}
                          type="radio"
                          id={`inline-${rating}`}
                        />
                      ))}
                    </div>
                  </Form.Group>

                  <p className="m-2">Comment</p>
                  <Form.Control
                    className=""
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: "100px" }}
                    name="comment"
                    value={form.comment}
                    onChange={handleFormChange}
                    required
                  ></Form.Control>
                  <div className="d-flex justify-content-end gap-2 mt-3">
                    <Button
                      variant="secondary"
                      onClick={() => setSelectedProduct(null)}
                    >
                      Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                      Submit Review
                    </Button>
                  </div>
                </Form>
              )}
            </>
          ) : (
            <div>Select a products to review</div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductList;
