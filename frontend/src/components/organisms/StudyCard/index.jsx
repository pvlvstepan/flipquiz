import { Paper, Typography, Box, Stack, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';

import { stringAvatar } from 'components/layouts/Main/Header/UserMenu';
import { getPublicUsername } from 'utils/getPublicUsername';

export const StudyCard = ({ id, name, terms, username = '', userId = '' }) => {
    return (
        <Paper>
            <Stack
                component={Link}
                to={`/${id}`}
                justifyContent="space-between"
                sx={{
                    px: 1.5,
                    py: 2,
                    height: 150,
                    borderBottom: 5,
                    cursor: 'pointer',
                    borderBottomColor: 'transparent',
                    '&:hover': {
                        borderBottomColor: 'primary.main',
                    },
                    textDecoration: 'none',
                    color: 'inherit',
                    borderRadius: 'inherit',
                }}
            >
                <Box>
                    <Typography variant="h6" noWrap title={name}>
                        {name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {terms} terms
                    </Typography>
                </Box>
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{
                        textDecoration: 'none',
                    }}
                >
                    <Avatar
                        {...stringAvatar(username, {
                            color: 'white',
                            width: 24,
                            height: 24,
                            fontSize: 16,
                        })}
                    />
                    <Typography variant="subtitle2">
                        {getPublicUsername(username, userId)}
                    </Typography>
                </Stack>
            </Stack>
        </Paper>
    );
};
