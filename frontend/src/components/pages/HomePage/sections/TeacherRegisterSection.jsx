import * as React from 'react';

import { Typography, Button, Grid, Container, Box } from '@mui/material';

import image from 'assets/images/Teacher.jpg';

export const TeacherRegisterSection = () => {
    return (
        // use this guy in every section
        <Box
            sx={{
                bgcolor: 'background.paper',
            }}
        >
            <Container
                sx={{
                    mt: 3,
                    my: 14,
                }}
            >
                <Grid container spacing={5}>
                    <Grid item xs={12} lg={6}>
                        <Typography
                            color="inherit"
                            textAlign="left"
                            variant="h4"
                        >
                            TEACHERS
                        </Typography>
                        <Typography
                            color="inherit"
                            textAlign="left"
                            variant="h3"
                        >
                            Empower your students
                        </Typography>
                        <Typography
                            color="text.secondary"
                            textAlign="left"
                            variant="h6"
                            sx={{ mb: 3, mt: { xs: 1, sm: 2 } }}
                        >
                            Help every student study anything with confidence,
                            no matter what they intend to achieve. Using
                            FlipQuiz unlimited study sets, study modes, as well
                            as in game Checkpoint, teachers can immediately
                            create a more active classroom. Both students and
                            educators can enroll and study for free.
                        </Typography>
                        <Button
                            color="primary"
                            variant="contained"
                            size="large"
                            component="a"
                            href="/premium-themes/onepirate/sign-up/"
                            sx={{
                                minWidth: 200,
                                mt: 5,
                                width: { xs: '100%', sm: 'auto' },
                            }}
                        >
                            Create a free account
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
                                src={image} // replace this with img
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
