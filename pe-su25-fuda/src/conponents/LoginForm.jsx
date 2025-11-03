import axios from 'axios';
import { useState } from 'react';
import { Container, Col, Row, Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/api';
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
            const res = await axiosInstance.get("/UserAccounts", {
                params: { username: form.username, password: form.password },
            });

            if (Array.isArray(res.data) && res.data.length === 1) {
                const user = res.data[0];
                localStorage.setItem("user", JSON.stringify(user));

                navigate("/motobikes", { replace: true });
            } else {
                setError("Invalid username or password!")
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
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" name='username' value={form.username} onChange={onChange} required />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name='password' value={form.password} onChange={onChange} required />
                        </Form.Group>

                        {error ? <Alert variant="danger" className="py-2">{error}</Alert> : null}

                        <Form.Group className='d-flex justify-content-center gap-3 align-content-center mt-4'>
                            <Button variant="primary" type="submit" >
                                ÍSubmit
                            </Button>
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={() => { setForm({ username: "", password: "" }); setError(""); }}
                            >
                                Cancel
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
