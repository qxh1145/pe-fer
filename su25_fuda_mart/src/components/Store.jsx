import Container from "react-bootstrap/esm/Container";
import { useFoods } from "../context/FoodContext";
import Footer from "./Footer";
import Header from "./Header";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import picture1 from "../assets/picture1.jpg";
import picture2 from "../assets/picture2.jpg";
import picture3 from "../assets/picture3.jpg";
const pictures = [picture1, picture2, picture3];


const Store = () => {
  const {
    state: { foods, loading, error }, 
    dispatch,
  } = useFoods();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Header />
      <Container>
        <Row className="g-4 mt-3">
          {foods.map((f, index) => ( 

            <Col key={f.id} md={4} lg={3}> 
              <Card className="h-100">
                <Card.Img 
                   variant="top" 
                   src={pictures[index % pictures.length]} 
                   style={{ height: '200px', objectFit: 'cover' }} 
                 />
                <Card.Body className="d-flex flex-column text-align-center">
                
                  <Card.Title>{f.name}</Card.Title> 

                  <Card.Text>
                    Giá: {f.price}
                  </Card.Text>
                  <Card.Text>
                    Số lượng: {f.stock}
                  </Card.Text>
                  
                  <Button 
                    variant="primary" 
                    onClick={() => dispatch({ type: 'DECREASE_STOCK', payload: f.id })}
                    disabled={f.stock === 0}
                  >
                    Mua ngay
                  </Button>

                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  );
};
export default Store;