import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const Review = () => {

    const [data, setData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:9999/products')
            .then(response => response.json())
            .then(data => {
                console.log("Fetched products:", data);
                const productsWithReviews = data.filter(product => product.reviews && product.reviews.length > 0);
                setData(productsWithReviews);
            })
    }, [])

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const formattedHours = hours.toString().padStart(2, '0');

        return `${day}/${month}/${year} ${formattedHours}:${minutes}:${seconds} ${ampm}`;
    };

    return (
        <Container className='mt-5'>
            <h1>List of Reviews</h1>

            <Button onClick={() => navigate(-1)} className='mb-2'>
                Back
            </Button>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ProductId</th>
                        <th>Title</th>
                        <th colSpan="4">Reviews</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((product) => (
                        <React.Fragment key={product.id}>
                            <tr className="table-light">
                                <td rowSpan={product.reviews.length + 1}>{product.id}</td>
                                <td rowSpan={product.reviews.length + 1}>{product.title}</td>
                                <td><strong>Date</strong></td>
                                <td><strong>Reviewer</strong></td>
                                <td><strong>Comment</strong></td>
                                <td><strong>Rating</strong></td>
                            </tr>
                            {product.reviews.map((review, index) => (
                                <tr key={index}>
                                    <td>{formatDate(review.date)}</td>
                                    <td>{review.reviewName}</td>
                                    <td>{review.comment}</td>
                                    <td>{review.rating}</td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </Container>
    )
}

export default Review
