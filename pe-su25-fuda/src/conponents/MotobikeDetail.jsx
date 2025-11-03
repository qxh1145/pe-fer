import { useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useMotobikes } from "../context/MotobikeContext";

const MotobikeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    state: { motobikes, loading, error },
  } = useMotobikes();

  const bike = useMemo(() => {
    return motobikes.find((m) => String(m.id) === String(id));
  }, [motobikes, id]);

  if (loading && !bike) return <Container className="my-4">Loading...</Container>;
  if (error) return <Container className="my-4">{error}</Container>;
  if (!bike) return <Container className="my-4">Not found.</Container>;

  return (
    <Container className="my-4">
      <Button variant="link" onClick={() => navigate(-1)}>&larr; Back</Button>
      <h2 className="mt-2">{bike.model}</h2>
      {bike.description && (
        <p className="text-muted">{bike.description}</p>
      )}
      <p>
        Year: {bike.year} | Price: {bike.price}
      </p>
      <Row className="mt-3">
        <Col md={8}>
          <Image src={bike.image} alt={bike.model} fluid rounded />
        </Col>
      </Row>
    </Container>
  );
};

export default MotobikeDetail;

