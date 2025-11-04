import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import {Link} from "react-router-dom"

import { useStudent } from '../context/StudentContext';
import { useSubject } from '../context/SubjectsContext';
import { useDetail } from '../context/DetailContext';

const HomePage = () => {
    const {
        state: { filtered: students , query},
        searchStudent,
    } = useStudent();
    const {
        state: { subjects },
    } = useSubject();

    const {
        state: { details },
    } = useDetail();

    return (
        <Container>
            <Row><h1 style={{ textAlign: "center" }}>Student Management</h1></Row>
            <Row><Form.Control value={query} onChange={(e) => searchStudent(e.target.value)} placeholder='Enter student name to search' /></Row>

            <Row>
                <Col md={3}>
                    <h5>Subjects</h5>
                    <ul>
                        {subjects.map((s) => (
                            <li style={{ textDecoration: "underline", color: "blue" }}>{s.name}</li>
                        ))}
                    </ul>
                </Col>
                <Col md={9}>
                    <h5>List of student</h5>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>StudentId</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Street</th>
                                <th>City</th>
                                <th>isRegularStudent</th>
                                <th>View grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((stu) => (
                            <tr>
                                <td>{stu.studentId}</td>
                                <td>{stu.name}</td>
                                <td>{stu.age}</td>
                                <td>{details.find((d) => stu.studentId == d.studentId)?.address.street}</td>
                                <td>{details.find((d) => stu.studentId == d.studentId)?.address.city}</td>
                                <td>{stu.isRegularStudent ? "Fulltime" : "Application"}</td>
                                <td><Link to={`/student/${stu.studentId}`}>View</Link></td>
                            </tr>
                            ))}
                    
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default HomePage