/* eslint-disable no-console */
import { useEffect, useState } from 'react';

import { Button, Container, Stack, Typography } from '@mui/material';
import axios from 'axios';
import useDarkMode from 'use-dark-mode';

export const App = () => {
    const { toggle, value } = useDarkMode();

    const [data, setData] = useState('');

    useEffect(() => {
        axios
            .get('/api')
            .then((res) => {
                setData(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

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
                <Typography variant="caption" textAlign="center">
                    {data}
                </Typography>
            </Stack>
        </Container>
    );
};
