import { useState } from 'react';
import { Container, Col, Row, Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const LoginForm = ({ username, password }) => {

    const navigate = useNavigate();

    const [form, setForm] = useState({ username: username, password: password });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true)
        try {
            if (form.username === "admin" && form.password === "admin") {
                navigate("/patients", { replace: true });
            } else {
                setError("login failed. Incorrect username or password.");
            }
        } catch (error) {
            console.log("error", error)
        } finally {
            setLoading(false)
        };
    }
    return (

        <Container>
            <Row className='mt-5 border p-5'>
                <Col md={{ span: 6, offset: 3 }}>
                    <h1 style={{ textAlign: "center" }}>Login</h1>
                    <Form style={{ marginRight: '5vh' }} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" name='username' value={form.username} onChange={onChange} required />
                            
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name='password' value={form.password} onChange={onChange} required />
                        </Form.Group>

                        {error ? <Alert variant="danger" className="py-2">{error}</Alert> : null}

                        <Form.Group className='d-flex  align-content-center mt-4'>
                            <Button variant="primary" type="submit" >
                                Submit
                            </Button>
                          
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

LoginForm.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
};

export default LoginForm;
