import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar, Box, Button, Chip, Stack, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { Link } from 'react-router-dom';

import { userAtom } from 'atoms';
import { stringAvatar } from 'components/layouts/Main/Header/UserMenu';
import { signOutQuery } from 'queries/auth/signOut';
import { getPublicUsername } from 'utils/getPublicUsername';

export const ProfileHeader = ({ username = '', id = '', role = '' }) => {
    const [user, setUser] = useAtom(userAtom);

    const { mutate: signOut } = useMutation(() => signOutQuery(), {
        onSuccess: () => {
            setUser(undefined);
        },
    });

    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
        >
            <Stack
                direction="row"
                alignItems="center"
                spacing={3}
                sx={{ minWidth: 0 }}
            >
                <Avatar
                    {...stringAvatar(username, {
                        color: 'white',
                        width: { xs: 80, md: 100 },
                        height: { xs: 80, md: 100 },
                        fontSize: { xs: 32, md: 40 },
                    })}
                />
                <Box sx={{ minWidth: 0 }}>
                    <Typography
                        variant="h2"
                        noWrap
                        sx={{ mb: 2, fontSize: { xs: 24, md: 32 } }}
                    >
                        {getPublicUsername(username, id)}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Chip label={role} variant="outlined" color="primary" />
                        {user._id === id ? (
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                                sx={{
                                    display: { sm: 'none' },
                                }}
                            >
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
                                    component={Link}
                                    to="/settings"
                                >
                                    <SettingsIcon />
                                </Button>
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
                                    onClick={signOut}
                                >
                                    <LogoutIcon />
                                </Button>
                            </Stack>
                        ) : undefined}
                    </Stack>
                </Box>
            </Stack>
            {user._id === id ? (
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{
                        display: { xs: 'none', sm: 'flex' },
                    }}
                >
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
                        component={Link}
                        to="/settings"
                    >
                        <SettingsIcon />
                    </Button>
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
                        onClick={signOut}
                    >
                        <LogoutIcon />
                    </Button>
                </Stack>
            ) : undefined}
        </Stack>
    );
};
