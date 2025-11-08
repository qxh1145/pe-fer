import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import axiosInstance from '../api/api.jsx';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axiosInstance.get('/user', {
                params: {
                    username: username,
                    password: password
                }
            });

            if (response.data.length > 0) {
                const user = response.data[0];
                alert('Đăng nhập thành công!');
                navigate(`/view/${user.id}`);
            } else {
                setError('Tên đăng nhập hoặc mật khẩu không đúng.');
            }
        } catch (err) {
            setError('Đã có lỗi xảy ra trong quá trình đăng nhập.');
            console.error(err);
        }
    };

    return (
        <Container>
            <Row className='mt-5 border p-5'>
                <Col md={{ span: 6, offset: 3 }}>
                    <h2 className="text-center">Đăng nhập</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Tên người dùng</Form.Label>
                            <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="Nhập tên người dùng" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Nhập mật khẩu" />
                        </Form.Group>

                        <Button variant="primary" type="submit">Đăng nhập</Button>
                    </Form>
                    <p className="mt-3">Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link></p>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginForm;