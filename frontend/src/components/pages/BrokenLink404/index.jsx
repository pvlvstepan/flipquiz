import { Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const BrokenLink404 = () => {
    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                zIndex: 1,
            }}
        >
            <Typography
                textAlign="center"
                variant="h1"
                sx={{ mb: 3, fontSize: 120 }}
                color="primary"
            >
                404
            </Typography>
            <Typography textAlign="center" variant="h4">
                It seems that the link you have followed is broken...
            </Typography>
            <Typography
                textAlign="center"
                variant="h6"
                color="text.secondary"
                sx={{ mt: 3 }}
            >
                No worries, you can still go back to the home page
            </Typography>
            <Button
                component={Link}
                to="/"
                variant="contained"
                sx={{ mt: 5 }}
                size="large"
            >
                Return to home page
            </Button>
        </Stack>
    );
};
