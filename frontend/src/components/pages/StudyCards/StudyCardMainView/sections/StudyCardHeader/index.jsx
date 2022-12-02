import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import GroupIcon from '@mui/icons-material/Group';
import { Box, Rating, Stack, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import { rateStudyCard } from 'queries/studyCards/rateStudyCard';

export const StudyCardHeader = ({
    name,
    description,
    rating = 0,
    studyCardId,
    totalRatings = 0,
    totalUsers = 0,
    createdAt,
}) => {
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    const { mutate: rateCard } = useMutation(
        (newRating) => {
            return rateStudyCard(studyCardId, newRating);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['study-card', studyCardId]);
                enqueueSnackbar('Your rating was submitted!', {
                    variant: 'success',
                });
            },
        }
    );

    return (
        <Box>
            <Typography
                variant="h2"
                sx={{ mb: 5, fontSize: { xs: 24, md: 36 } }}
                noWrap
            >
                {name}
            </Typography>
            {description ? (
                <Typography color="text.secondary">{description}</Typography>
            ) : undefined}
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                alignItems={{ xs: 'flex-start', md: 'center' }}
                sx={{ mt: 2 }}
                spacing={1}
            >
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Rating
                        name="simple-controlled"
                        value={rating}
                        onChange={(event, newValue) => {
                            rateCard(newValue);
                        }}
                    />
                    <Typography variant="subtitle1" color="text.secondary">
                        {rating?.toFixed(1)} ({totalRatings} reviews)
                    </Typography>
                </Stack>

                {totalUsers > 0 ? (
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <GroupIcon color="action" />
                        <Typography variant="subtitle1" color="text.secondary">
                            {totalUsers} learners
                        </Typography>
                    </Stack>
                ) : undefined}
                {createdAt ? (
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <AccessTimeFilledIcon color="action" />
                        <Typography variant="subtitle1" color="text.secondary">
                            {new Date(createdAt).toLocaleDateString('my-MY')}{' '}
                            {new Date(createdAt).toLocaleTimeString('my-MY', {
                                timeStyle: 'short',
                                hour12: true,
                            })}
                        </Typography>
                    </Stack>
                ) : undefined}
            </Stack>
        </Box>
    );
};
