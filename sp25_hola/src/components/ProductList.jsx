import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import { useOrders } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const navigate = useNavigate()
  const {
    state: { filtered, products, loading, error, query, selectedCategory }, // Get selectedCategory from context
    setCategoryFilter, // Get setCategoryFilter function from context
  } = useProducts();

  const {
    state: { items },
    total,
    // updateQuantity, // Not used in this component, can be removed
    removeItem,
    clearCart,
    addToCart,
  } = useCart();

  const {
    state: { orders, loading: orderLoading, error: orderContextError }, // Get loading and error from OrderContext state
    addOrder, // Get the addOrder function from context
  } = useOrders();

  const [isOrdered, setIsOrdered] = useState(false);
  const [shipAddress, setShipAddress] = useState(""); // New state for shipping address
  const [orderError, setOrderError] = useState(""); // State to handle errors during order placement
  const allCategories = products.map((product) => product.category);
  // allCategories sẽ là: ['beauty', 'beauty', 'beauty', 'beauty', 'beauty', 'fragrances', 'fragrances', 'fragrances']

  // 2. Dùng Set để lọc duy nhất và chuyển về lại mảng
  const uniqueCategories = [...new Set(allCategories)];

  const handleChangeFilter = (e) => {
    const selectedCategory = e.target.value;
    setCategoryFilter(selectedCategory); // Use context function to set filter
  };
  const handleAddToCart = (p) => {
    if (isOrdered) {
      setIsOrdered(false);
    }
    addToCart(p);
  };
  const handleRemove = (id) => {
    removeItem(id);
  };

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      setOrderError("Cannot place an empty order.");
      return;
    }
    if (!shipAddress.trim()) {
      setOrderError("Shipping address cannot be empty.");
      return;
    }

    setOrderError(""); // Clear any previous errors

    const orderProducts = items.map((item) => ({
      id: item.id,
      name: item.title, // Map title from cart item to name for order product
      price: item.price,
      quantity: item.quantity,
    }));

    const newOrder = {
      id: Math.random().toString(36).substring(2, 6), // Generate a simple unique ID
      orderDate: new Date().toISOString(),
      products: orderProducts,
      shipAddress: shipAddress,
    };

    try {
      await addOrder(newOrder); // Call addOrder from context
      clearCart(); // Clear the cart after successful order
      setShipAddress(""); // Clear shipping address input
      setIsOrdered(true); // Indicate that an order has been placed successfully
    } catch (error) {
      // Error is already handled and logged in OrderContext, but we can update local state if needed
      setOrderError(
        orderContextError || "Failed to place order. Please try again."
      );
    }
  };

  const sumAverageRating = (reviews) => {
    console.log(typeof reviews);
    if (!reviews || reviews.length === 0) {
      return 0;
    }
    // Reduce để tính tổng điểm đánh giá với key mình chọn trong mảng reviews
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);

    return Number((totalRating / reviews.length).toFixed(2)); // Trả về trung bình cộng làm tròn đến 1 chữ số thập phân
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center">Products Review System</h1>
      <div className="d-flex justify-content-between align-items-center mt-4'">
        <div>
          <Form.Select
            aria-label="Default select example"
            defaultValue={"Select all category"}
            onChange={(e) => handleChangeFilter(e)}
            value={selectedCategory} // Use selectedCategory from context
          > 
            <option value="">Select all category</option>
            {uniqueCategories.map((category, index) => (
              <option key={index}>{category}</option>
            ))}
          </Form.Select>
        </div>
        <div>
          <Button variant="success" onClick={() => navigate("/orders")}>Success</Button>
        </div>
      </div>

      <Row className="mt-4">
        <Col md={7}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Rate</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => ( // Render filtered products from context
                <tr key={p.id}>
                  {" "}
                  {/* Added key for list rendering */}
                  <td>{p.title}</td>
                  <td>{p.category}</td>
                  <td>{p.price}</td>
                  <td>{sumAverageRating(p.reviews)}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleAddToCart(p)}
                    >
                      Add to Cart
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col md={5}>
          <div className="border p-3 h-100">
            <h6 className="fw-bold">Cart</h6>
            {orderError && <p className="text-danger">{orderError}</p>}{" "}
            {/* Display local order error */}
            {orderLoading && <p>Placing order...</p>}{" "}
            {/* Display loading state */}
            {isOrdered ? ( // Show success message if order placed
              <div>
                <p className="text-success">Order placed successfully!</p>
                <Button variant="primary" onClick={() => setIsOrdered(false)}>
                  Continue Shopping
                </Button>
              </div>
            ) : items.length === 0 ? (
              <div>No items in cart</div>
            ) : (
              <>
                <div>
                  <Table striped="columns">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {" "}
                      {/* Moved tbody outside map for correctness */}
                      {items.map((it) => (
                        <tr>
                          <td>{it.id}</td>{" "}
                          {/* Assuming it.id is the product ID */}
                          <td>{it.title}</td>
                          <td>{it.price}</td>
                          <td>{it.quantity}</td>
                          <td>
                            <Button
                              variant="danger"
                              onClick={() => handleRemove(it.id)}
                            >
                              Remove
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
                <div>
                  <h6>Total: ${total.toFixed(2)}</h6> {/* Display total */}
                  <h6>Ship address</h6>
                  <Form.Control
                    as="textarea"
                    placeholder="Enter shipping address"
                    style={{ height: "100px" }}
                    value={shipAddress}
                    onChange={(e) => setShipAddress(e.target.value)}
                  />
                  <Button
                    variant="warning"
                    onClick={handlePlaceOrder}
                    className="mt-2"
                    disabled={orderLoading}
                  >
                    Place order
                  </Button>
                </div>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductList;
