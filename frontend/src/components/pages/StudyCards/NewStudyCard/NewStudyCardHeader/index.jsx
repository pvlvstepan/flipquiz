import {
    Box,
    Button,
    CircularProgress,
    Container,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';

const StickyHeader = ({ submitDisabled, isLoading }) => {
    const { ref, inView } = useInView({
        rootMargin: '-60px',
    });

    return (
        <Box ref={ref} sx={{ minHeight: 60 }}>
            <Box
                sx={{
                    width: '100%',
                    position: !inView ? 'fixed' : undefined,
                    zIndex: 999,
                    bgcolor: 'background.default',
                    top: !inView ? 0 : undefined,
                    left: !inView ? 0 : undefined,
                    borderBottom: !inView ? 1 : undefined,
                    borderColor: 'divider',
                }}
            >
                <Container
                    maxWidth={inView ? false : 'md'}
                    disableGutters={inView}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{
                            minHeight: 60,
                        }}
                    >
                        <Typography
                            variant="h2"
                            sx={{
                                transition: 'font-size 0.2s ease-in-out',
                                fontSize: !inView ? 24 : 36,
                            }}
                        >
                            Create a new study card
                        </Typography>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={submitDisabled}
                        >
                            {isLoading ? (
                                <CircularProgress
                                    size={26.25}
                                    color="inherit"
                                    variant="indeterminate"
                                />
                            ) : (
                                'Create'
                            )}
                        </Button>
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
};

export const NewStudyCardHeader = ({ submitDisabled, isLoading }) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <Stack spacing={3}>
            <StickyHeader
                submitDisabled={submitDisabled}
                isLoading={isLoading}
            />
            <TextField
                {...register('name', { required: true })}
                error={!!errors.name}
                variant="standard"
                label="Title"
                fullWidth
                placeholder="Enter a title, like “Biology - Chapter 22: Evolution”"
                sx={{
                    maxWidth: { md: '75%' },
                }}
                color="warning"
            />
            <TextField
                {...register('description')}
                error={!!errors.description}
                variant="standard"
                label="Description"
                placeholder="Add a description..."
                fullWidth
                sx={{
                    maxWidth: { md: '75%' },
                }}
                color="warning"
            />
        </Stack>
    );
};
