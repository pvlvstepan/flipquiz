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
            <Typography variant="h2" sx={{ mb: 5 }} noWrap>
                {name}
            </Typography>
            {description ? (
                <Typography color="text.secondary">{description}</Typography>
            ) : undefined}
            <Stack
                direction="row"
                alignItems="center"
                sx={{ mt: 2 }}
                spacing={1}
            >
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
        </Box>
    );
};
