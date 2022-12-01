import * as React from 'react';

import { Typography, Button, Grid, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export const GetStartedSection = () => {
    return (
        // use this guy in every section
        <Box>
            <Container
                sx={{
                    mt: 3,
                    my: 14,
                }}
            >
                <Typography
                    color="inherit"
                    textAlign="center"
                    variant="h4"
                    sx={{ mb: 12, mt: { xs: 4, sm: 8 } }}
                >
                    90% of students who use FlipQuiz report receiving higher
                    grades
                </Typography>

                <Grid container spacing={5}>
                    <Grid item xs={12} lg={6}>
                        <Typography
                            color="inherit"
                            textAlign="left"
                            variant="h3"
                        >
                            Memorize faster for free
                        </Typography>
                        <Typography
                            color="text.secondary"
                            textAlign="left"
                            variant="h6"
                            sx={{ mb: 3, mt: { xs: 1, sm: 2 } }}
                        >
                            According to research, using flashcards to test
                            yourself is more successful than rereading your
                            information. FlipQuizis utilised by students in over
                            100 different areas, ranging from arithmetic to
                            medicine to current languages.
                        </Typography>
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
                            Get Started
                        </Button>
                        <Typography
                            variant="body2"
                            color="inherit"
                            sx={{ mt: 2 }}
                        />
                    </Grid>
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
                                src="" // replace this with img
                                sx={{
                                    bgcolor: 'background.paper',
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    minHeight: 500,
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};
