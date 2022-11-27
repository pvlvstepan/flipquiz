import { Container, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const StudyCardsLayout = () => {
    return (
        <Container maxWidth="md">
            <Stack sx={{ py: 5 }}>
                <Outlet />
            </Stack>
        </Container>
    );
};
