import { useEffect } from 'react';

import ShareIcon from '@mui/icons-material/Share';
import { Avatar, Box, Button, Stack, Tooltip, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import useClipboard from 'react-use-clipboard';

import { stringAvatar } from 'components/layouts/Main/Header/UserMenu';
import { getPublicUsername } from 'utils/getPublicUsername';

export const UserInformation = ({ username, id }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [isCopied, setCopied] = useClipboard(window.location.href);

    useEffect(() => {
        if (isCopied) {
            enqueueSnackbar('Study card link copied', {
                variant: 'success',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCopied]);

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
            <Tooltip arrow title="Share link">
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
                    onClick={setCopied}
                >
                    <ShareIcon />
                </Button>
            </Tooltip>
        </Stack>
    );
};
