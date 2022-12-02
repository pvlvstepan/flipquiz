import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { FullScreenLoader } from 'components/common/FullScreenLoader';
import { StudyCard } from 'components/organisms/StudyCard';
import { BrokenLink404 } from 'components/pages/BrokenLink404';
import { RecentStudyCards } from 'components/pages/Profile/sections/RecentStudyCards';
import { getAllStudyCardsQuery } from 'queries/studyCards/getAllStudyCards';

export const AllStudyCardsPage = () => {
    const { isLoading, data, error } = useQuery(
        ['all-study-cards'],
        getAllStudyCardsQuery
    );

    const { data: cards } = data || {};

    if (error && error.response?.status >= 400) {
        return <BrokenLink404 />;
    }

    if (isLoading) {
        return <FullScreenLoader />;
    }

    return (
        <Container
            maxWidth="md"
            sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}
        >
            <Stack sx={{ py: 5, flex: 1 }}>
                {cards?.recent?.length ? (
                    <RecentStudyCards cards={cards.recent} />
                ) : undefined}
                <Box sx={{ mt: 3 }}>
                    <Typography variant="h5" sx={{ mb: 3 }}>
                        All Study Cards ({cards?.studyCards?.length})
                    </Typography>
                    {cards?.studyCards?.length ? (
                        <Grid container spacing={3}>
                            {cards?.studyCards?.map((el) => {
                                return (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        lg={4}
                                        key={el._id}
                                    >
                                        <StudyCard
                                            name={el.name}
                                            terms={el.terms}
                                            username={el.createdBy.username}
                                            userId={el.createdBy._id}
                                            id={el._id}
                                        />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    ) : (
                        <Typography
                            variant="h6"
                            sx={{ mb: 2 }}
                            color="text.secondary"
                        >
                            We don&apos;t have any Study Cards yet :(
                        </Typography>
                    )}
                </Box>
            </Stack>
        </Container>
    );
};
