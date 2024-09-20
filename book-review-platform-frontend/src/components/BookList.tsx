// src/components/BookList.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Typography, Container, Card, CardContent, CardMedia, Grid, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    published_date: string;
}

const BookList: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const navigate = useNavigate();
    const placeholderImage = 'lord_of_the_rings.png';

    const viewDetails = (id: number) => {
        navigate(`/books/${id}`);
    };

    useEffect(() => {
        axios.get<Book[]>('http://127.0.0.1:8000/books')
            .then(response => setBooks(response.data))
            .catch(error => console.error('Error fetching books:', error));
    }, []);

    return (
        <Container sx={{ marginTop: 4, marginBottom: 4 }}>
            <Grid container spacing={3}>
                {books.map((book: { id: number; title: any; author: any; genre: any; published_date: any; }) => (
                    <Grid item xs={12} sm={6} md={4} key={book.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                alt="Book cover"
                                height="200"
                                image={placeholderImage}
                            />
                            <CardContent>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '100%',
                                    }}
                                >
                                    <Typography
                                    variant="h6"
                                    gutterBottom
                                    component={Link}
                                    to={`/books/${book.id}`}
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    {book.title}
                                </Typography>
                                    <Typography variant="subtitle1" align="center">
                                        {book.author}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" align="center">
                                        Genre: {book.genre}
                                    </Typography>
                                    
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => viewDetails(book.id)}
                                        sx={{ marginTop: 2 }}
                                    >
                                        View Details
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default BookList;
