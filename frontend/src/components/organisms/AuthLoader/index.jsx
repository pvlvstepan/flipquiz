import { Box, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { userAtom } from 'atoms';
import { checkAuthQuery } from 'queries/auth/checkAuth';

export const AuthLoader = ({ children }) => {
    const [user, setUser] = useAtom(userAtom);

    const { isLoading } = useQuery(['check-auth'], () => checkAuthQuery(), {
        onSuccess: (d) => setUser(d.data.user),
        enabled: !user,
        retry: false,
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

    return children;
};
