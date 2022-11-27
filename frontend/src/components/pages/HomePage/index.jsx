import * as React from 'react';

import { Typography, Button, Box } from '@mui/material';

import Background from 'assets/images/HPbrng.jpg';

import ProductHeroLayout from './ProductHeroLayout';

// this is where the home page codes will be
// we need some simple home page similar to quizlet

export const HomePage = () => {
    return (
        <ProductHeroLayout
            sxBackground={{
                background: `url(${Background})`,
                backgroundPosition: { xs: '70% center', sm: 'center' },
                backgroundSize: 'cover',
            }}
        >
            <Box sx={{ maxWidth: 600 }}>
                <Typography color="inherit" textAlign="left" variant="h2">
                    The best digital flashcards and study tools
                </Typography>
                <Typography
                    color="inherit"
                    textAlign="left"
                    variant="h6"
                    sx={{ mb: 4, mt: { xs: 4, sm: 8 } }}
                >
                    Join approximately more than 60 million students who use
                    Flip Quiz flashcards, exam prep, and professional solutions
                    to enhance their GPAs and accomplish their objectives.
                </Typography>
                <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    component="a"
                    href="/premium-themes/onepirate/sign-up/"
                    sx={{ minWidth: 200 }}
                >
                    Sign up for free
                </Button>
                <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
                    Discover the experience
                </Typography>
            </Box>
        </ProductHeroLayout>
    );
};
