import React, { useState } from 'react';
import axiosInstance from '../api/api.jsx';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';

function RegisterForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Mật khẩu không khớp.');
            return;
        }

        try {
            const existingUsers = await axiosInstance.get(`/user?username=${username}`);
            if (existingUsers.data.length > 0) {
                setError('Tên người dùng đã tồn tại.');
                return;
            }

            await axiosInstance.post('/user', { username, password });
            alert('Đăng ký thành công!');
            navigate('/');
        } catch (err) {
            setError('Đã có lỗi xảy ra trong quá trình đăng ký.');
            console.error(err);
        }
    };

    return (
        <Container>
            <Row className='mt-5 border p-5'>
                <Col md={{ span: 6, offset: 3 }}>
                    <h2 className="text-center">Đăng ký</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Tên người dùng</Form.Label>
                            <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Xác nhận mật khẩu</Form.Label>
                            <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        </Form.Group>

                        <Button variant="primary" type="submit">Đăng ký</Button>
                    </Form>
                    <p className="mt-3">Đã có tài khoản? <Link to="/">Đăng nhập tại đây</Link></p>
                </Col>
            </Row>
        </Container>
    );
}

export default RegisterForm;