import { Button, Stack, Typography } from '@mui/material';
import { useAtom } from 'jotai';
import { Link } from 'react-router-dom';

import { userAtom } from 'atoms';

import * as Styled from './Header.styled';
import { UserMenu } from './UserMenu';

export const Header = () => {
    const [user] = useAtom(userAtom);

    return (
        <div style={{ paddingBottom: '60px' }}>
            <Styled.Wrapper>
                <Typography variant="h4" className="title" color="primary">
                    FlipQuiz
                </Typography>
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
        </div>
    );
};
