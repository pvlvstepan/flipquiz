import { Box, Grid, Typography } from '@mui/material';

import { StudyCard } from 'components/organisms/StudyCard';

export const RecentStudyCards = ({ cards = [] }) => {
    return (
        <Box>
            <Typography variant="h5" sx={{ mb: 3 }}>
                Recent ({cards.length})
            </Typography>
            <Grid container spacing={2}>
                {cards.map((el) => {
                    return (
                        <Grid item xs={12} sm={6} lg={4} key={el._id}>
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
        </Box>
    );
};
