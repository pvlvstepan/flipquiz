import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { ButtonBase, Paper, Stack, Typography } from '@mui/material';

export const NewTermButton = (props) => {
    return (
        <Paper
            component={ButtonBase}
            sx={{
                '&:hover': {
                    color: 'warning.main',
                },
            }}
            {...props}
        >
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={1}
                sx={{ minHeight: 100 }}
            >
                <PlaylistAddIcon />
                <Typography variant="button">Add Term</Typography>
            </Stack>
        </Paper>
    );
};
