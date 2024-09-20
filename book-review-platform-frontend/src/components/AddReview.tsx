// src/components/AddReview.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Snackbar, Alert, FormControl, InputLabel, MenuItem, Select, Rating, Box } from '@mui/material';

interface AddReviewProps {
    bookId: string | undefined;
    onReviewAdded: () => void; 
}

const AddReview: React.FC<AddReviewProps> = ({ bookId, onReviewAdded }: AddReviewProps) => {
    const [reviewerName, setReviewerName] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(5);
    const [showSnackbar, setShowSnackbar] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const reviewData = {
            reviewer_name: reviewerName,
            review_text: reviewText,
            rating: rating,
        };

        axios.post(`http://127.0.0.1:8000/books/${bookId}/review/add`, reviewData)
            .then(response => {
                setReviewerName('');
                setReviewText('');
                setRating(5);
                onReviewAdded();
                setShowSnackbar(true);
            })
            .catch(error => console.error('Error adding review:', error));
    };

    const handleCloseSnackbar = () => {
        setShowSnackbar(false);
    };

    return (
        <Container>
            <Typography variant="h5" gutterBottom>
                Add a Review
            </Typography>
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                    <Rating
                        name="rating"
                        value={rating}
                        defaultValue={0}
                        onChange={(event: any, newValue: any) => {
                            setRating(newValue);
                        }}
                    />
                </Box>
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={reviewerName}
                    onChange={(e: { target: { value: any; }; }) => setReviewerName(e.target.value)}
                    required
                    margin="normal"
                />
                <TextField
                    label="Review"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={reviewText}
                    onChange={(e: { target: { value: any; }; }) => setReviewText(e.target.value)}
                    required
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Submit Review
                </Button>
            </form>

            <Snackbar
                open={showSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Review added successfully!
                </Alert>
            </Snackbar>
            
        </Container>
    );
};

export default AddReview;
