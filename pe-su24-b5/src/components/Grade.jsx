import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link, useParams} from "react-router-dom"
import { useGrade } from '../context/GradeContext';
import { useSubject } from '../context/SubjectsContext';
import { useStudent } from '../context/StudentContext';

const Grade = () => {
    const { studentId } = useParams()
    const {
        state: { grades },
    } = useGrade();
    const {
        state: { subjects },
    } = useSubject();
    const {
        state: { filtered: students, query },
        searchStudent,
    } = useStudent();

    return (
        <Container>
            <Row><h1 style={{ textAlign: "center" }}>Student Management</h1></Row>
            <Row><Form.Control placeholder='Enter student name to search' /></Row>
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
                    <Button variant="success">Success</Button>
                    <Row><h1 style={{ textAlign: "center" }}>{students.find((s) => s.studentId == studentId)?.name}'s Grade Details</h1></Row>
                    <Row>
                        <h5>Add a new grade</h5>
                        <Col md={5}><Form.Control placeholder='Enter Grade' /></Col>
                        <Col md={5}><Form.Control placeholder='Enter Additional ex' /></Col>
                        <Col> <Button variant="primary">Add new</Button></Col>
                    </Row>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Grade</th>
                                <th>Explaination</th>

                            </tr>
                        </thead>
                        <tbody>
                            {grades.map((g) => (
                                <tr>
                                    <td>{g.grade}</td>
                                    <td>{g.additionalExplanation}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )

}
export default Grade