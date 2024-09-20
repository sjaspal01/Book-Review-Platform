import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, Container, Grid, Card, CardContent, CardMedia, Divider, Box, Rating, LinearProgress } from '@mui/material';
import AddReview from './AddReview';

interface Review {
    reviewer_name: string;
    review_text: string;
    rating: number;
}

interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    published_date: string;
}

const placeholderImage = 'https://via.placeholder.com/200';

const BookDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<Book | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [averageRating, setAverageRating] = useState<number | null>(null);
    const [totalRatings, setTotalRatings] = useState<number>(0);
    const [ratingDistribution, setRatingDistribution] = useState<{ [key: number]: number }>({
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
    } as { [key: number]: number });

    const fetchReviews = () => {
        axios.get<Review[]>(`http://127.0.0.1:8000/books/${id}/reviews`)
            .then(response => {
                const reviews = response.data;
                setReviews(reviews);
                calculateReviewSummary(reviews);
            })
            .catch(error => console.error('Error fetching reviews:', error));
    };

    const calculateReviewSummary = (reviews: Review[]) => {
        if (reviews.length === 0) return;

        const total = reviews.length;
        const sumRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const average = sumRating / total;

        const distribution = reviews.reduce((acc: { [key: number]: number }, review) => {
            acc[review.rating] = (acc[review.rating] || 0) + 1;
            return acc;
        }, { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });

        setAverageRating(average);
        setTotalRatings(total);
        setRatingDistribution(distribution);
    };

    useEffect(() => {
        axios.get<Book[]>(`http://127.0.0.1:8000/books`)
            .then(response => {
                const selectedBook = response.data.find(b => b.id === parseInt(id as string));
                setBook(selectedBook || null);
            })
            .catch(error => console.error('Error fetching book:', error));

        fetchReviews();
    }, [id]);

    return (
        <Container sx={{ marginTop: 4, marginBottom: 4 }}>
            {book && (
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                alt="Book cover"
                                image={placeholderImage}
                                title={book.title}
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                            <Typography variant="h4" gutterBottom>
                                {book.title}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                Author: {book.author}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                Genre: {book.genre}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                Published: {new Date(book.published_date).getFullYear()}
                            </Typography>

                            {/* Customer Reviews Section */}
                            {averageRating !== null && (
                                <Box sx={{ marginTop: 4 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Customer Reviews
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Rating value={averageRating} precision={0.1} readOnly />
                                        <Typography variant="h6" sx={{ marginLeft: 1 }}>
                                            {averageRating.toFixed(1)} out of 5
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
                                        {totalRatings.toLocaleString()} global ratings
                                    </Typography>

                                    {[5, 4, 3, 2, 1].map((star) => (
                                        <Box key={star} sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                                            <Typography variant="body2" sx={{ minWidth: 50 }}>
                                                {star} star
                                            </Typography>
                                            <LinearProgress
                                                variant="determinate"
                                                value={(ratingDistribution[star] / totalRatings) * 100}
                                                sx={{ width: '100%', marginRight: 1, marginLeft: 1 }}
                                            />
                                            <Typography variant="body2" sx={{ minWidth: 30 }}>
                                                {(
                                                    (ratingDistribution[star] / totalRatings) *
                                                    100
                                                ).toFixed(0)}%
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom>
                            Reviews
                        </Typography>
                        <Divider />
                        {reviews.length > 0 ? (
                            reviews.map((review: { reviewer_name: any; rating: any; review_text: any; }, index: any) => (
                                <Box key={index} sx={{ marginTop: 2, marginBottom: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="subtitle1">
                                            {review.reviewer_name}
                                        </Typography>
                                        <Rating
                                            value={review.rating}
                                            precision={0.5}
                                            readOnly
                                            size="small"
                                        />
                                    </Box>
                                    <Typography variant="body2" color="textSecondary">
                                        {review.review_text}
                                    </Typography>
                                    <Divider sx={{ marginTop: 2 }} />
                                </Box>
                            ))
                        ) : (
                            <Typography>No reviews yet.</Typography>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <AddReview bookId={id} onReviewAdded={fetchReviews} />
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};

export default BookDetails;
