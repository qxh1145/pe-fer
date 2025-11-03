import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

import { useDepartment } from "../context/DepartmentContext";
import { useProject } from "../context/ProjectContext";
import { useState } from "react";
import { Link } from "react-router-dom";
const HomePage = () => {
  const {
    state: { departments },
  } = useDepartment();

  const {
    state: { filtered: projects }, // Use filtered projects from context
    setDepFilter,
  } = useProject();

  // State to hold the selected department ID for radio buttons
  const [selectedDep, setSelectedDep] = useState("");

  const handleChangeFilter = (e) => {
    const selectedDep = e.target.value;
    setSelectedDep(selectedDep);
    setDepFilter(selectedDep);
  };
  return (
    <Container>
      <Row>
        <Col style={{ textAlign: "center", marginBottom: "5vh" }}>
          <h1>List of Projects</h1>
        </Col>
      </Row>
      <Row>
        <Col md={3}>
          <h5>Department</h5>
          <div>
            <Form.Group>
              <Form.Check
                type="radio"
                label="All"
                name="departmentFilter"
                value=""
                onChange={handleChangeFilter}
                checked={selectedDep === ""}
              />
              {departments.map((d) => (
                <Form.Check
                  key={d.id}
                  type="radio"
                  value={d.id}
                  name="departmentFilter"
                  label={d.name}
                  onChange={handleChangeFilter}
                  checked={selectedDep == d.id}
                />
              ))}
            </Form.Group>
          </div>
        </Col>
        <Col md={9}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>ProjectName</th>
                <th>Descriptions</th>
                <th>StartDate</th>
                <th>Type</th>
                <th>Department</th>
                <th>Funtions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.description}</td>
                  <td>{p.startDate}</td>
                  <td>{p.type}</td>
                  <td>
                    {
                      departments.find((d) => p.department == d.id)?.name
                    }
                  </td>
                  <td>
                    {/* Assuming you want to link to a project detail page */}
                    <Link to={`/departments/${p.id}/employees`}>Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
