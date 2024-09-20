// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import Navbar from './components/Navbar';
import { Container } from '@mui/material';
import Footer from './components/Footer';

const App: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <Container sx={{marginTop: 12}}>
                <Routes>
                    <Route path="/" element={<BookList />} />
                    <Route path="/books/:id" element={<BookDetails />} />
                </Routes>
            </Container>
            <Footer />
        </Router>
    );
};

export default App;
