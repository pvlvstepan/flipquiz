import { Container, Stack } from '@mui/material';
import { useAtom } from 'jotai';
import { Navigate, Outlet } from 'react-router-dom';

import { userAtom } from 'atoms';

export const StudyCardsLayout = () => {
    const [user] = useAtom(userAtom);

    return user ? (
        <Container
            maxWidth="md"
            sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}
        >
            <Stack sx={{ py: 5, flex: 1 }}>
                <Outlet />
            </Stack>
        </Container>
    ) : (
        <Navigate to="/?auth-modal=sign-in" />
    );
};
