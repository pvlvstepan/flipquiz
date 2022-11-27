import CableIcon from '@mui/icons-material/Cable';
import QuizIcon from '@mui/icons-material/Quiz';
import SchoolIcon from '@mui/icons-material/School';
import StyleIcon from '@mui/icons-material/Style';
import { Box, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

export const GameModeButton = ({ children, href, ...props }) => {
    return (
        <Button
            {...props}
            variant="outlined"
            fullWidth
            sx={{
                justifyContent: 'flex-start',
                '&:hover': {
                    borderBottomWidth: 5,
                    marginBottom: '-5px',
                },
            }}
            component={Link}
            to={href}
        >
            {children}
        </Button>
    );
};

export const GameModeButtons = () => {
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <GameModeButton startIcon={<StyleIcon />} href="flipcards">
                        Flipcards
                    </GameModeButton>
                </Grid>
                <Grid item xs={3}>
                    <GameModeButton startIcon={<SchoolIcon />} href="learn">
                        Learn
                    </GameModeButton>
                </Grid>
                <Grid item xs={3}>
                    <GameModeButton startIcon={<QuizIcon />} href="test">
                        Test
                    </GameModeButton>
                </Grid>
                <Grid item xs={3}>
                    <GameModeButton startIcon={<CableIcon />} href="match">
                        Match
                    </GameModeButton>
                </Grid>
            </Grid>
        </Box>
    );
};
