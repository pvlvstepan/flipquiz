import { useState } from 'react';

import CableIcon from '@mui/icons-material/Cable';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QuizIcon from '@mui/icons-material/Quiz';
import SchoolIcon from '@mui/icons-material/School';
import StyleIcon from '@mui/icons-material/Style';
import {
    Box,
    Button,
    Container,
    Menu,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material';
import { useInView } from 'react-intersection-observer';

import { GameModeButton } from '../GameModeButtons';

export const StudyCardStickyHeader = ({ title }) => {
    const { ref, inView } = useInView({
        initialInView: true,
    });

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box ref={ref} sx={{ m: '0 !important' }}>
            <Box
                sx={{
                    width: '100%',
                    position: 'fixed',
                    zIndex: 999,
                    bgcolor: 'background.default',
                    top: !inView ? 0 : -60,
                    left: 0,
                    borderBottom: 1,
                    borderColor: 'divider',
                    transition: 'top 0.3s ease-in-out',
                }}
            >
                <Container maxWidth="md">
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{
                            minHeight: 60,
                        }}
                    >
                        <Typography
                            variant="h4"
                            noWrap
                            sx={{ fontSize: { xs: 16, md: 24 } }}
                        >
                            {title}
                        </Typography>
                        <Button
                            size="large"
                            variant="contained"
                            endIcon={<ExpandMoreIcon />}
                            onClick={handleClick}
                        >
                            Study
                        </Button>
                    </Stack>
                </Container>
                <Menu
                    anchorEl={anchorEl}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        disablePadding: true,
                    }}
                    PaperProps={{
                        sx: {
                            p: 1,
                            mt: 0.5,
                        },
                    }}
                >
                    <Stack spacing={2}>
                        <GameModeButton
                            startIcon={<StyleIcon />}
                            href="flipcards"
                        >
                            Flipcards
                        </GameModeButton>
                        <Tooltip title="Coming soon!" arrow>
                            <span>
                                <GameModeButton
                                    startIcon={<SchoolIcon />}
                                    href="learn"
                                    disabled
                                >
                                    Learn
                                </GameModeButton>
                            </span>
                        </Tooltip>
                        <Tooltip title="Coming soon!" arrow>
                            <span>
                                <GameModeButton
                                    startIcon={<QuizIcon />}
                                    href="test"
                                    disabled
                                >
                                    Test
                                </GameModeButton>
                            </span>
                        </Tooltip>
                        <Tooltip title="Coming soon!" arrow>
                            <span>
                                <GameModeButton
                                    startIcon={<CableIcon />}
                                    href="match"
                                    disabled
                                >
                                    Match
                                </GameModeButton>
                            </span>
                        </Tooltip>
                    </Stack>
                </Menu>
            </Box>
        </Box>
    );
};
