import CableIcon from '@mui/icons-material/Cable';
import QuizIcon from '@mui/icons-material/Quiz';
import SchoolIcon from '@mui/icons-material/School';
import StyleIcon from '@mui/icons-material/Style';
import { Box, Button, Grid, Tooltip } from '@mui/material';
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
                <Grid item xs={12} sm={6} md={3}>
                    <GameModeButton startIcon={<StyleIcon />} href="flipcards">
                        Flipcards
                    </GameModeButton>
                </Grid>
                <Tooltip title="Coming soon!" arrow>
                    <Grid item xs={12} sm={6} md={3}>
                        <GameModeButton
                            startIcon={<SchoolIcon />}
                            href="learn"
                            disabled
                        >
                            Learn
                        </GameModeButton>
                    </Grid>
                </Tooltip>
                <Tooltip title="Coming soon!" arrow>
                    <Grid item xs={12} sm={6} md={3}>
                        <GameModeButton
                            startIcon={<QuizIcon />}
                            href="test"
                            disabled
                        >
                            Test
                        </GameModeButton>
                    </Grid>
                </Tooltip>
                <Tooltip title="Coming soon!" arrow>
                    <Grid item xs={12} sm={6} md={3}>
                        <GameModeButton
                            startIcon={<CableIcon />}
                            href="match"
                            disabled
                        >
                            Match
                        </GameModeButton>
                    </Grid>
                </Tooltip>
            </Grid>
        </Box>
    );
};
