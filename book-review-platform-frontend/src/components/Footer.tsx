import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                width: '100%',
                bottom: 0,
                left: 0,
                backgroundColor: '#f8f8f8',
                padding: '10px 0',
                textAlign: 'center',
                borderTop: '1px solid #e7e7e7',
            }}
        >
            <Typography variant="body2" color="textSecondary">
                Copyright © 2024
            </Typography>
        </Box>
    );
};

export default Footer;
