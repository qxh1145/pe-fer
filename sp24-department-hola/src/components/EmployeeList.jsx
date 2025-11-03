import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useParams } from "react-router-dom";
import { useDepartment } from "../context/DepartmentContext";
import { useEmployees } from "../context/EmployeeContext";

const EmployeeList = () => {
  const { id } = useParams(); // Lấy id từ URL
  const {
    state: { departments, loading: depLoading },
  } = useDepartment();
  const {
    state: { employees, loading: empLoading },
  } = useEmployees();

  // Tìm phòng ban dựa trên id từ URL
  const department = departments.find((d) => d.id == id);

  // Lọc danh sách nhân viên thuộc phòng ban đó
  const employeesInDepartment = employees.filter((emp) => emp.department == id);

  if (depLoading || empLoading) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <Row style={{ textAlign: "center" }}>
        <h1>List of Employee</h1>
      </Row>
      <Row>
        <Col>
          <Link to={"/"}>Home</Link>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <h3>Department: {department ? department.name : "Not Found"}</h3>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Date of Birth</th>
                <th>Gender</th>
                <th>Position</th>
              </tr>
            </thead>
            <tbody>
              {employeesInDepartment.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.dob}</td>
                  <td>{emp.gender}</td>
                  <td>{emp.position}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
export default EmployeeList;
