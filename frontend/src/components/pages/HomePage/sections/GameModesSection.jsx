import * as React from 'react';

import CableIcon from '@mui/icons-material/Cable';
import QuizIcon from '@mui/icons-material/Quiz';
import SchoolIcon from '@mui/icons-material/School';
import { Typography, Button, Grid, Container, Stack, Box } from '@mui/material';

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
            <Grid container>
                <Grid item xs={6}>
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
                        <SchoolIcon fontSize="large" />
                        <Box sx={{ maxWidth: 400 }}>
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
                        <QuizIcon fontSize="large" />
                        <Box sx={{ maxWidth: 400 }}>
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
                        <CableIcon fontSize="large" />
                        <Box sx={{ maxWidth: 400 }}>
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
                        component="a"
                        href="/premium-themes/onepirate/sign-up/"
                        sx={{ minWidth: 200 }}
                    >
                        Try Learn and Test for free
                    </Button>
                    <Typography
                        variant="body2"
                        color="inherit"
                        sx={{ mt: 2 }}
                    />
                </Grid>
                <Grid item xs={6}>
                    Screen shots hihi
                </Grid>
            </Grid>
        </Container>
    );
};
