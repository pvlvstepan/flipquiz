import { Box, Grid, Typography } from '@mui/material';
import { useAtom } from 'jotai';

import { userAtom } from 'atoms';
import { StudyCard } from 'components/organisms/StudyCard';

export const UserStudyCards = ({ cards = [], userID, username }) => {
    const [user] = useAtom(userAtom);

    return (
        <Box>
            <Typography variant="h5" sx={{ mb: 3 }}>
                {user?._id === userID ? 'Your Study Cards' : 'Study Cards'} (
                {cards.length})
            </Typography>
            {cards.length ? (
                <Grid container spacing={3}>
                    {cards.map((el) => {
                        return (
                            <Grid item xs={12} sm={6} lg={4} key={el._id}>
                                <StudyCard
                                    name={el.name}
                                    terms={el.terms}
                                    username={username}
                                    userId={userID}
                                    id={el._id}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            ) : (
                <Typography variant="h6" sx={{ mb: 2 }} color="text.secondary">
                    {user?._id === userID
                        ? "You don't have any Study Cards yet"
                        : "This user doesn't have any Study Cards yet"}
                </Typography>
            )}
        </Box>
    );
};
