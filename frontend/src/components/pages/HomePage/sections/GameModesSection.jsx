import * as React from 'react';

import CableIcon from '@mui/icons-material/Cable';
import QuizIcon from '@mui/icons-material/Quiz';
import SchoolIcon from '@mui/icons-material/School';
import { Typography, Button, Grid, Container, Stack, Box } from '@mui/material';
import { Link } from 'react-router-dom';

import flipcards from 'assets/images/terms.jpg';

// Container keeps the content centered on the screen so it doesnt touch the side

// Grid container is what makes two columns

// Grid item xs={6} means that it's a column which is 6/12 wide = 50%

export const GameModesSection = () => {
    return (
        // use this guy in every section
        <Container
            sx={{
                mt: 3,
                my: 14,
            }}
        >
            <Grid container spacing={5}>
                <Grid item xs={12} lg={6}>
                    <Box
                        sx={{
                            borderRadius: '15px',
                            overflow: 'hidden',
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <Box
                            component="img"
                            src={flipcards}
                            sx={{
                                bgcolor: 'background.default',
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                            }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Typography color="inherit" textAlign="left" variant="h2">
                        Be ready for test day with different study modes
                    </Typography>
                    <Typography
                        color="inherit"
                        textAlign="left"
                        variant="h6"
                        sx={{ mb: 4, mt: { xs: 4, sm: 8 } }}
                    >
                        Turn your flashcards into customizable practice tests.
                        Go beyond memorization with question types that
                        challenge your memory strength.
                    </Typography>

                    <Stack direction="row" spacing={2}>
                        <SchoolIcon sx={{ width: 60, height: 60 }} />
                        <Box sx={{ maxWidth: { lg: 400 } }}>
                            <Typography
                                color="inherit"
                                textAlign="left"
                                variant="h5"
                            >
                                Practice with FlashCards
                            </Typography>

                            <Typography
                                color="text.secondary"
                                textAlign="left"
                                variant="h6"
                                sx={{ mb: 3, mt: { xs: 1, sm: 2 } }}
                            >
                                Get instant feedback while practicing with
                                multiple choice, true or false questions,
                                written questions and many more.
                            </Typography>
                        </Box>
                    </Stack>

                    <Stack direction="row" spacing={2}>
                        <QuizIcon sx={{ width: 60, height: 60 }} />
                        <Box sx={{ maxWidth: { lg: 400 } }}>
                            <Typography
                                color="inherit"
                                textAlign="left"
                                variant="h5"
                            >
                                Take a Test
                            </Typography>

                            <Typography
                                color="text.secondary"
                                textAlign="left"
                                variant="h6"
                                sx={{ mb: 3, mt: { xs: 1, sm: 2 } }}
                            >
                                Be prepared for your upcoming examinations by
                                practising with our mock tests according to each
                                modules.
                            </Typography>
                        </Box>
                    </Stack>

                    <Stack direction="row" spacing={2}>
                        <CableIcon sx={{ width: 60, height: 60 }} />
                        <Box sx={{ maxWidth: { lg: 400 } }}>
                            <Typography
                                color="inherit"
                                textAlign="left"
                                variant="h5"
                            >
                                Match terms and definitions
                            </Typography>

                            <Typography
                                color="text.secondary"
                                textAlign="left"
                                variant="h6"
                                sx={{ mb: 3, mt: { xs: 1, sm: 2 } }}
                            >
                                Test your memory skills by practicing on the
                                terms and definitions available in each modules.
                            </Typography>
                        </Box>
                    </Stack>

                    <Button
                        color="primary"
                        variant="contained"
                        size="large"
                        component={Link}
                        to={`${window.location.pathname}?auth-modal=sign-up`}
                        sx={{
                            minWidth: 200,
                            mt: 5,
                            width: { xs: '100%', sm: 'auto' },
                        }}
                    >
                        Try Learn and Test for free
                    </Button>
                    <Typography
                        variant="body2"
                        color="inherit"
                        sx={{ mt: 2 }}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};
