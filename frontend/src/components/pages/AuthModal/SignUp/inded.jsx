import { useEffect } from 'react';

import {
    Button,
    Paper,
    Stack,
    TextField,
    Link as MuiLink,
    FormControlLabel,
    Checkbox,
    Typography,
    CircularProgress,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { PasswordTextfield } from 'components/common/PasswordTextfield';
import { signUpQuery } from 'queries/auth/signUp';

export const SignUpForm = () => {
    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        watch,
    } = useForm({
        mode: 'all',
    });

    const {
        isSuccess,
        isLoading,
        error,
        mutate: signUp,
    } = useMutation((authData) => signUpQuery(authData));

    const password = watch('password');

    const navigate = useNavigate();

    const onSubmit = handleSubmit((formData) =>
        signUp({
            email: formData.email,
            password: formData.password,
            role: formData?.isLecturer ? 'TEACHER' : undefined,
        })
    );

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (isSuccess) {
            enqueueSnackbar(
                'Account successfully created. You may now sign in!',
                {
                    variant: 'success',
                }
            );
            navigate(`${window.location.pathname}?auth-modal=sign-in`);
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
        >
            {error ? (
                <Typography color="error" variant="body2" textAlign="center">
                    {error.response.status === 409
                        ? 'An account with this email already exists'
                        : 'Something went wrong, please try again later'}
                </Typography>
            ) : undefined}
            <TextField
                disabled={isLoading}
                variant="outlined"
                label={errors.email?.message || 'Email'}
                placeholder="email@flipquiz.com"
                type="email"
                error={!!errors.email}
                {...register('email', {
                    required: true,
                    pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: 'Invalid Email',
                    },
                })}
            />
            <PasswordTextfield
                disabled={isLoading}
                variant="outlined"
                placeholder="Type your new password"
                label="Password"
                error={!!errors.password}
                {...register('password', {
                    required: true,
                })}
            />
            <PasswordTextfield
                disabled={isLoading}
                variant="outlined"
                placeholder="Repeat password"
                label={errors.passwordRepeat?.message || 'Repeat password'}
                error={!!errors.passwordRepeat}
                {...register('passwordRepeat', {
                    required: true,
                    validate: (v) => v === password || 'Passwords do not match',
                })}
            />
            <Stack>
                <FormControlLabel
                    {...register('isLecturer')}
                    control={<Checkbox />}
                    disabled={isLoading}
                    label={
                        <Typography
                            variant="caption"
                            color={errors.isLecturer ? 'error' : undefined}
                        >
                            I am a <b>Teacher</b> or a <b>Lecturer</b>
                        </Typography>
                    }
                />
                <FormControlLabel
                    {...register('tc', {
                        required: true,
                    })}
                    disabled={isLoading}
                    control={<Checkbox />}
                    label={
                        <Typography
                            variant="caption"
                            color={errors.tc ? 'error' : undefined}
                        >
                            I accept FlipQuiz&lsquo;s <b>Terms of Service</b>{' '}
                            and
                            <b> Privacy Policy</b>.
                        </Typography>
                    }
                />
            </Stack>
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
                    'Sign Up'
                )}
            </Button>
            <Paper
                sx={{
                    px: 3,
                    py: 1,
                    bgcolor: 'transparent',
                    textAlign: 'center',
                    color: 'text.disabled',
                }}
                variant="outlined"
            >
                Already have an account?{' '}
                <MuiLink
                    component={Link}
                    to={`${window.location.pathname}?auth-modal=sign-in`}
                    variant="h6"
                >
                    Sign&nbsp;In
                </MuiLink>
            </Paper>
        </Stack>
    );
};
