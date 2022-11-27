import { Box, CircularProgress } from '@mui/material';

export const FullScreenLoader = () => {
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
};
