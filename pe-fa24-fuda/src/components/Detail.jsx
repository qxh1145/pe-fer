import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

import { useJobs } from "../context/JobContext";
import { Link, useNavigate, useParams } from "react-router-dom";

const Detail = () => {
  const navigate = useNavigate();
  const {
    state: { filtered: jobs },
  } = useJobs();
  const { id } = useParams();

  const selectedJob = jobs.find((j) => j.id == id);

  console.log(selectedJob);

  const handleApplyJob = () => {
    alert("Apply success");
    navigate("/")
  };

  return (
    <Container>
      <Row>
        <h1 style={{ textAlign: "center" }}>{selectedJob.title}</h1>
      </Row>
      <Row>All Insights</Row>
      <div>
        <span style={{ fontWeight: "bold" }}>Location: </span>
        {selectedJob.location}
      </div>
      <div>
        <span style={{ fontWeight: "bold" }}>Employment Type: </span>
        {selectedJob.employmentType}
      </div>
      <div>
        <span style={{ fontWeight: "bold" }}>Salary: </span>
        {selectedJob.salary.currency} {selectedJob.salary.amount}
      </div>

      <Row>
        <span style={{ fontWeight: "bold" }}>Requirement: </span>
        <div>
          {selectedJob.requirements.map((e) => (
            <div style={{ borderBottom: "1px solid black" }}>{e}</div>
          ))}
        </div>
      </Row>
      <Row>
        <span style={{ fontWeight: "bold" }}>Posted Date:</span>
        {selectedJob.postedDate}
      </Row>

      <div>
        <span style={{ fontWeight: "bold" }}>Application Deadline:</span>{" "}
        {selectedJob.applicationDeadline}
      </div>
      <Row className="mt-5">
        <Button style={{ marginLeft: "40%", width: "20%" }} variant="primary" onClick={handleApplyJob}>
          Apply Now
        </Button>
      </Row>
    </Container>
  );
};

export default Detail;
