import { Button, Stack, Typography } from '@mui/material';
import Confetti from 'react-confetti';
import { Link } from 'react-router-dom';

import success from 'assets/images/success.svg';

export const FlipCardsSuccess = ({ studyCardId }) => {
    return (
        <>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 5 }}
            >
                <Confetti
                    numberOfPieces={1000}
                    tweenDuration={5000}
                    recycle={false}
                />
                <Typography variant="h3">
                    Way to go! You’ve reviewed all the terms.
                </Typography>
                <img alt="" src={success} />
            </Stack>
            <Stack direction="row">
                <Button
                    variant="contained"
                    component={Link}
                    to={`/${studyCardId}`}
                    sx={{ mx: 'auto' }}
                >
                    Continue
                </Button>
            </Stack>
        </>
    );
};
