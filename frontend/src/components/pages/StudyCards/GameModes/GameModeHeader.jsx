import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const GameModeHeader = ({ studyCardId, name }) => {
    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 5 }}
        >
            <Typography variant="h2">{name}</Typography>
            <IconButton component={Link} to={`/${studyCardId}`}>
                <CloseIcon />
            </IconButton>
        </Stack>
    );
};
