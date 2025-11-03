import Table from "react-bootstrap/Table";
import { useProducts } from "../context/ProductContext";

const ReviewList = () => {
  const {
    state: { products, loading: orderLoading, error: orderContextError },
  } = useProducts();

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
    return products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  return (
    <>
      <h1>List of review</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ProductID</th>
            <th>Title</th>
            <th>Reviews</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr>
              <td>{p.id}</td>
              <td>{p.title}</td>
              <Table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Reviewer</th>
                    <th>Comment</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                {p.reviews.map((p) => (
                  <tr>
                    <td>{p.date}</td>
                    <td>{p.reviewerName}</td>
                    <td>{p.comment}</td>
                    <td>{p.rating}</td>
                  </tr>
                ))}
              </Table>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ReviewList;
