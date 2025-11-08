import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

import { useJobs } from "../context/JobContext";
import { Link } from "react-router-dom";

const HomePage = () => {
  const {
    state: { filtered: jobs },
    searchJobs,
  } = useJobs();

  

  return (
    <Container>
      <Row style={{ textAlign: "center" }}>
        <h1>Job Finder</h1>
      </Row>
      <Row>
        <Form.Label>Search Jobs by location</Form.Label>
        <Form.Control type="text" placeholder="Enter location" onChange={(e) => searchJobs(e.target.value)} />
      </Row>
      <Row>
        {jobs.map((j) => (
          <Col md={4}>
            <Card style={{ gap: "1px", marginTop: "10px" }}>
              <Card.Body>
                <Card.Title><Link to={`/detail/${j.id}`}>{j.title}</Link></Card.Title>
                <Card.Text>{j.company}</Card.Text>
                <Card.Text><span style={{fontWeight: "bold"}}>Location: </span>{j.location}</Card.Text>
                <Card.Text><span style={{fontWeight: "bold"}}>Employment Type: </span>{j.employmentType}</Card.Text>
                <Card.Text><span style={{fontWeight: "bold"}}>Salary: </span>{j.salary.amount}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
export default HomePage;
