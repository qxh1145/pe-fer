import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../context/OrderContext";

const OrderList = () => {
  const {
    state: { orders, loading: orderLoading, error: orderContextError },
  } = useOrders();
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = hours.toString().padStart(2, "0");

    return `${day}/${month}/${year} ${formattedHours}:${minutes}:${seconds} ${ampm}`;
  };

  const calculateTotalPrice = (products) => {
    if (!products || products.length === 0) {
      return 0;
    }
    return products.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  return (
    <Container className="mt-5">
      <h1>List of Orders</h1>

      {orderLoading && <p>Loading orders...</p>}
      {orderContextError && <p className="text-danger">{orderContextError}</p>}

      <Button onClick={() => navigate("/")} className="mb-3">
        Back
      </Button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>OrderID</th>
            <th>OrderDate</th>
            <th>Ship Address</th>
            <th>Product List</th>
            <th>TotalPrice</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id} className="table-light">
                <td>{order.id}</td>
                <td>{formatDate(order.orderDate)}</td>
                <td>{order.shipAddress}</td>
                <td>
                  <table className="table table-sm mb-0">

                    <tbody>
                      {order.products.map((p) => (
                        <tr key={p.id}>
                          <td>{p.id}</td>
                          <td>{p.name}</td>
                          <td>${p.price.toFixed(2)}</td>
                          <td>{p.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
                <td>${calculateTotalPrice(order.products).toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No orders found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </Container>
  );
};

export default OrderList;
