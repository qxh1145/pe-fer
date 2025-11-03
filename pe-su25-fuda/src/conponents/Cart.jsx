import { Table, Button, Form } from "react-bootstrap";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { state: { items }, total, updateQuantity, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container my-4">
        <h3>Your Cart</h3>
        <p>Cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h3 className="text-center mb-4">Your Cart</h3>

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Model</th>
            <th>Price</th>
            <th style={{width: 120}}>Qty</th>
            <th>Subtotal</th>
            <th style={{width: 120}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it.id}>
              <td>{it.model}</td>
              <td>{it.price}</td>
              <td>
                <Form.Control
                  type="number"
                  min={1}
                  value={it.quantity}
                  onChange={(e) => updateQuantity(it.id, Number(e.target.value))}
                />
              </td>
              <td>{`$${(it.priceNum * it.quantity).toFixed(2)}`}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => removeItem(it.id)}>
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-end align-items-center gap-3">
        <h5 className="mb-0">Total: ${total.toFixed(2)}</h5>
        <Button variant="success">Checkout</Button>
        <Button variant="outline-secondary" onClick={clearCart}>Clear</Button>
      </div>
    </div>
  );
}

export default Cart
