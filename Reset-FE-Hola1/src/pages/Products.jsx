

import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown';


const Products = () => {

    const [categorys, setCategorys] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectFilter, setSelectFilter] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [validationError, setValidationError] = useState({})
    const [formSubmit, setFormSubmit] = useState(
        {
            reviewName: '',
            comment: '',
            rating: 0
        }
    );

    useEffect(() => {
        fetch('http://localhost:9999/products')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setProducts(data);
                //Set là một kiểu dữ liệu trong javaScript dùng để lưu các giá trị không trùng lặp
                const brandCategory = [...new Set(data.map(category => category.category))]
                setCategorys(brandCategory);
            })
    }, [])


    const filterProductsByCategory = selectFilter ? products.filter(products => products.category === selectFilter) : products;


    const handleChangeFilter = (e) => {
        const selectedCategory = e.target.value;
        setSelectFilter(selectedCategory);
    }



    const sumAverageRating = (reviews) => {
        if (!reviews || reviews.length === 0) {
            return 0;
        }
        // Reduce để tính tổng điểm đánh giá với key mình chọn trong mảng reviews
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        return (totalRating / reviews.length).toFixed(1); // Trả về trung bình cộng làm tròn đến 1 chữ số thập phân
    }

    const handleSelectProduct = (product) => {
        setSelectedProduct(product);
        // Có thể thực hiện các hành động khác khi chọn sản phẩm, ví dụ: hiển thị chi tiết sản phẩm
        setShowMessage(false);
        setMessage("");
        setValidationError({});
        setFormSubmit({
            reviewName: '',
            comment: '',
            rating: 0
        });
    }

    const handleSubmitReview = () => {

        console.log("Form Submit Data:", formSubmit);

        const messageError = {};
        if (formSubmit.reviewName.trim() === "") {
            messageError.reviewName = "Review Name is required";
            setValidationError(messageError);
            return
        }
        if (formSubmit.comment.trim() === "") {
            messageError.comment = "Comment is required";
            setValidationError(messageError);
            return
        }

        const payloadForm = {
            reviewName: formSubmit.reviewName,
            comment: formSubmit.comment,
            rating: Number(formSubmit.rating),
            date: new Date().toISOString(),
        }


        fetch(`http://localhost:9999/products/${selectedProduct.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                reviews: [...selectedProduct.reviews, payloadForm]
            })
        }).then(response => response.json())
            .then(data => {
                console.log("Review submitted successfully:", data);
                setMessage("Thanks for your review!");
                setShowMessage(true);
                // Cập nhật lại sản phẩm đã chọn với đánh giá mới
                setSelectedProduct({
                    ...selectedProduct,
                    reviews: [...selectedProduct.reviews, payloadForm]
                });
                // Reset form submit
                setFormSubmit({
                    reviewName: '',
                    comment: '',
                    rating: 0
                });
                // window.location.reload();
            })

    }

    return (
        <Container className='mt-4'>
            <h1 className='text-center'>Products Review System</h1>

            <div className='d-flex justify-content-between align-items-center mt-4'>
                <div>
                    <Form.Select
                        aria-label="Default select example"
                        defaultValue={"Select all category"}
                        onChange={(e) => handleChangeFilter(e)}
                        value={selectFilter}
                    >
                        <option value="" >Select all category</option>
                        {categorys.map((category, index) => (
                            <option key={index} >
                                {category}
                            </option>
                        ))}
                    </Form.Select>
                </div>
                <div>
                    <Button variant="success" href="/reviews">
                        Show Reviews List
                    </Button>
                </div>
            </div>


            <Row className='mt-4'>
                <Col xs={12} md={8}>
                    <Row>
                        {filterProductsByCategory.map((product, index) => (
                            <Col md={4} key={index} className='mb-4'>
                                <Card className='h-100'>
                                    <Card.Body className='d-flex flex-column gap-1'>
                                        <Card.Title>{product.title}</Card.Title>
                                        <Card.Text className='d-flex flex-column gap-2'>
                                            <div>Price: {product.price}</div>
                                            <div>Category: {product.category}</div>
                                            <div>Average Rate: {sumAverageRating(product.reviews)}</div>
                                        </Card.Text>
                                        <Button
                                            variant="primary"
                                            onClick={() => handleSelectProduct(product)}
                                        >
                                            Add New Review
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
                <Col xs={12} md={4}>
                    <div className='border p-3'>
                        <h6 className='fw-bold'>Review Detail</h6>
                        {selectedProduct ? (
                            <div>
                                <div>ProductId: {selectedProduct.id} </div>
                                <div>title: {selectedProduct.title} </div>
                                <div>category: {selectedProduct.category} </div>
                                <div>Price: {selectedProduct.price} </div>

                                {message !== "" && (
                                    <div className='text-success font-bold'>{message}</div>
                                )}
                                {showMessage === false && (
                                    <>
                                        <h6 className='fw-bold mt-3'>Add a new Review </h6>
                                        <Form>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Review Name</Form.Label>
                                                <Form.Control
                                                    type='text'
                                                    onChange={(e) => setFormSubmit({ ...formSubmit, reviewName: e.target.value })}
                                                    placeholder="Disabled input"
                                                    isValid={!formSubmit.reviewName.trim() ? false : true}
                                                />
                                                {validationError.reviewName && (
                                                    <div className='text-danger'>{validationError.reviewName}</div>
                                                )}
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control
                                                    rows={3}
                                                    onChange={(e) => setFormSubmit({ ...formSubmit, comment: e.target.value })}
                                                    as="textarea"
                                                    isValid={!formSubmit.comment.trim() ? false : true}
                                                />
                                                {validationError.comment && (
                                                    <div className='text-danger'>{validationError.comment}</div>
                                                )}
                                            </Form.Group>

                                            <Form.Group className="mb-3 d-flex  gap-2">
                                                <Form.Label>Rating</Form.Label>
                                                <div>
                                                    {[1, 2, 3, 4, 5].map((rating) => (
                                                        <Form.Check
                                                            key={rating}
                                                            inline
                                                            label={rating}
                                                            name="rating"
                                                            onChange={(e) => setFormSubmit({ ...formSubmit, rating: e.target.value })}
                                                            value={rating}
                                                            checked={Number(formSubmit.rating) === rating}
                                                            type="radio"
                                                            id={`inline-${rating}`}
                                                        />
                                                    ))}
                                                </div>
                                            </Form.Group>

                                            <Button
                                                variant="warning"
                                                onClick={handleSubmitReview}
                                            >
                                                Submit Review
                                            </Button>
                                        </Form></>
                                )}
                            </div>
                        ) : (
                            <div className='text-danger font-bold'>Select a product to Review!</div>
                        )}
                    </div>
                </Col>
            </Row>
        </Container >
    )
}

export default Products
