import { Button, Container, Stack, Typography } from '@mui/material';
import useDarkMode from 'use-dark-mode';

export const App = () => {
    const { toggle, value } = useDarkMode();

    return (
        <Container>
            <Stack spacing={4} sx={{ p: 5 }} alignItems="center">
                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Typography variant="h2">FlipQuiz</Typography>
                    <Button onClick={() => toggle()} variant="contained">
                        {value ? 'Light' : 'Dark'} Mode
                    </Button>
                </Stack>
                <Typography textAlign="center" sx={{ maxWidth: 400 }}>
                    FlipQuiz is an online platform that helps you study
                    information through interactive tools and games. Our mission
                    is to help you practice and master what you&apos;re
                    learning.
                </Typography>
            </Stack>
        </Container>
    );
};
