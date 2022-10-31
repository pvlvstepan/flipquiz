import { Button, Container, Stack, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { Link } from 'react-router-dom';
import useDarkMode from 'use-dark-mode';

import { userAtom } from 'atoms';
import { signOutQuery } from 'queries/auth/signOut';

export const TestPage = () => {
    const { toggle, value } = useDarkMode();

    const [user, setUser] = useAtom(userAtom);

    const { mutate: signOut } = useMutation(() => signOutQuery(), {
        onSuccess: () => {
            setUser(undefined);
        },
    });

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
                {!user ? (
                    <Button
                        component={Link}
                        to={`${window.location.pathname}?auth-modal=sign-in`}
                        variant="contained"
                    >
                        Sign In
                    </Button>
                ) : undefined}
                {user ? (
                    <Button variant="contained" onClick={() => signOut()}>
                        Sign Out
                    </Button>
                ) : undefined}
                {user ? (
                    <Stack component="pre" sx={{ whiteSpace: 'pre-line' }}>
                        {JSON.stringify(user, null, 4)}
                    </Stack>
                ) : undefined}
            </Stack>
        </Container>
    );
};
