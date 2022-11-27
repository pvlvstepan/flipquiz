import { Button, Stack, Typography, Link as MuiLink } from '@mui/material';
import { useAtom } from 'jotai';
import { Link, useLocation } from 'react-router-dom';

import { userAtom } from 'atoms';

import * as Styled from './Header.styled';
import { UserMenu } from './UserMenu';

export const Header = () => {
    const [user] = useAtom(userAtom);

    const { pathname } = useLocation();

    return (
        <Styled.Wrapper>
            <Typography
                variant="h4"
                className="title"
                color={({ palette: { mode, primary } }) =>
                    mode === 'dark' ? 'white' : primary.main
                }
                component={Link}
                to="/"
            >
                FlipQuiz
            </Typography>
            <Stack
                direction="row"
                alignItems="center"
                sx={{ ml: 3 }}
                spacing={3}
            >
                <MuiLink
                    component={Link}
                    to="/"
                    sx={{ color: 'inherit' }}
                    variant="subtitle1"
                >
                    Home
                </MuiLink>
                <MuiLink
                    component={Link}
                    to="/"
                    sx={{ color: 'inherit' }}
                    variant="subtitle1"
                >
                    Study cards
                </MuiLink>
                {pathname !== '/new-study-card' ? (
                    <Button
                        variant="contained"
                        component={Link}
                        to="/new-study-card"
                        size="small"
                    >
                        Create
                    </Button>
                ) : undefined}
            </Stack>
            <Stack
                alignItems="center"
                direction="row"
                sx={{ ml: 'auto' }}
                spacing={2}
            >
                {!user ? (
                    <>
                        <Button
                            color="inherit"
                            component={Link}
                            to={`${window.location.pathname}?auth-modal=sign-in`}
                        >
                            Sign In
                        </Button>
                        <Button
                            variant="contained"
                            component={Link}
                            to={`${window.location.pathname}?auth-modal=sign-up`}
                        >
                            Sign Up
                        </Button>
                    </>
                ) : (
                    <UserMenu />
                )}
            </Stack>
        </Styled.Wrapper>
    );
};
