import FlagIcon from '@mui/icons-material/Flag';
import { Avatar, Box, Button, Stack, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { stringAvatar } from 'components/layouts/Main/Header/UserMenu';
import { getPublicUsername } from 'utils/getPublicUsername';

export const UserInformation = ({ username, id }) => {
    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
        >
            <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                component={Link}
                to={`/user/${id}`}
                sx={{
                    textDecoration: 'none',
                }}
            >
                <Avatar
                    {...stringAvatar(username, {
                        color: 'white',
                        width: 50,
                        height: 50,
                    })}
                />
                <Box>
                    <Typography variant="caption" color="text.secondary">
                        Created by
                    </Typography>
                    <Box
                        sx={{
                            textDecoration: 'none',
                            color: 'text.primary',
                            '&:hover': {
                                color: 'warning.main',
                            },
                        }}
                    >
                        <Typography variant="h6">
                            {getPublicUsername(username, id)}
                        </Typography>
                    </Box>
                </Box>
            </Stack>
            <Tooltip arrow title="Report">
                <Button
                    variant="outlined"
                    color="inherit"
                    sx={{
                        color: 'text.disabled',
                        padding: 0,
                        minHeight: 36,
                        minWidth: 36,
                        borderRadius: '50%',
                    }}
                >
                    <FlagIcon />
                </Button>
            </Tooltip>
        </Stack>
    );
};
