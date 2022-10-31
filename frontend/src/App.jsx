import { Box, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { Route, Routes } from 'react-router-dom';

import { userAtom } from 'atoms';
import { AuthModal } from 'components/pages/AuthModal';
import { TestPage } from 'components/pages/Test';
import { checkAuthQuery } from 'queries/auth/checkAuth';

export const App = () => {
    const [user, setUser] = useAtom(userAtom);

    const { isLoading } = useQuery(['check-auth'], () => checkAuthQuery(), {
        onSuccess: (d) => setUser(d.data.user),
        enabled: !user,
        retry: false,
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return (
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <CircularProgress variant="indeterminate" />
            </Box>
        );
    }

    return (
        <>
            <Routes>
                <Route path="/" element={<TestPage />} />
            </Routes>
            <AuthModal />
        </>
    );
};
