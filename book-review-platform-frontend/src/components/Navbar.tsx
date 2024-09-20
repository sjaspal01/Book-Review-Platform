import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography
                    variant="h6"
                    sx={{ flexGrow: 1 }}
                    component={Link}
                    to="/"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    Book Review Platform
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
