import { useEffect } from 'react';

import {
    Button,
    Paper,
    Stack,
    TextField,
    Typography,
    Link as MuiLink,
    CircularProgress,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { userAtom } from 'atoms';
import { PasswordTextfield } from 'components/common/PasswordTextfield';
import { signInQuery } from 'queries/auth/signIn';

export const SignInForm = () => {
    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
    } = useForm({
        mode: 'all',
    });

    const {
        isSuccess,
        isLoading,
        error,
        data,
        mutate: signIn,
    } = useMutation((authData) => signInQuery(authData));

    const onSubmit = handleSubmit((formData) => signIn(formData));

    const navigate = useNavigate();

    const [, setUser] = useAtom(userAtom);

    useEffect(() => {
        if (isSuccess) {
            navigate(window.location.pathname);
            setUser(data.data.user);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess]);

    return (
        <Stack
            spacing={3}
            sx={{ flex: 1, pb: 6 }}
            justifyContent="center"
            component="form"
            onSubmit={onSubmit}
            noValidate
        >
            {error ? (
                <Typography color="error" variant="body2" textAlign="center">
                    Incorrect email address or password
                </Typography>
            ) : undefined}
            <TextField
                variant="outlined"
                label={errors.email?.message || 'Email'}
                placeholder="Type your email address"
                type="email"
                error={!!errors.email}
                disabled={isLoading}
                {...register('email', {
                    required: true,
                    pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: 'Invalid Email',
                    },
                })}
            />
            <PasswordTextfield
                variant="outlined"
                placeholder="Type your password"
                label="Password"
                error={!!errors.password}
                disabled={isLoading}
                {...register('password', {
                    required: true,
                })}
            />
            <Typography variant="caption" textAlign="center">
                By clicking Sign In, you accept FlipQuiz&lsquo;s{' '}
                <b>Terms of Service</b> and
                <b> Privacy Policy</b>.
            </Typography>
            <Stack spacing={1}>
                <Button
                    variant="contained"
                    size="large"
                    type="submit"
                    disabled={!isValid || isLoading}
                >
                    {isLoading ? (
                        <CircularProgress
                            size={26.25}
                            color="inherit"
                            variant="indeterminate"
                        />
                    ) : (
                        'Sign In'
                    )}
                </Button>
                <Typography variant="caption">
                    Remember to log out of shared devices
                </Typography>
            </Stack>
            <Paper
                sx={{
                    px: 3,
                    py: 1,
                    bgcolor: 'background.default',
                    textAlign: 'center',
                    color: 'text.disabled',
                }}
                variant="outlined"
            >
                New to FlipQuiz?{' '}
                <MuiLink
                    component={Link}
                    to={`${window.location.pathname}?auth-modal=sign-up`}
                    variant="h6"
                >
                    Create&nbsp;an&nbsp;account
                </MuiLink>
            </Paper>
        </Stack>
    );
};
