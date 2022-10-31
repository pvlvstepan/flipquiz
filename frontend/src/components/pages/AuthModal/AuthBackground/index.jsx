import { Grid, Stack, Typography } from '@mui/material';

import authBg from 'assets/images/auth.jpg';

export const AuthBackground = () => {
    return (
        <Grid item xs={6} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Stack
                sx={{
                    height: '100%',
                    p: 3,
                    background: `url(${authBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                }}
                justifyContent="space-between"
            >
                <Typography variant="h2" color="white">
                    Learning tools <br />
                    made for <u>you</u>
                </Typography>
                <Typography variant="h1" color="white">
                    FlipQuiz
                </Typography>
            </Stack>
        </Grid>
    );
};
