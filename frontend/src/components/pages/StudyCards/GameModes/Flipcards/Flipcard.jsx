import { useEffect, useState } from 'react';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
    Button,
    LinearProgress,
    Paper,
    Stack,
    Typography,
} from '@mui/material';
import { motion, useAnimation } from 'framer-motion';

export const FlipCard = ({
    term,
    definition,
    onPrev = () => undefined,
    onNext = () => undefined,
    current,
    total,
}) => {
    const [flipped, setFlipped] = useState(false);

    const controls = useAnimation();

    useEffect(() => {
        if (flipped) {
            controls.start({
                rotateX: 180,
                scaleZ: -1,
                scaleY: -1,
            });
        } else {
            controls.start({
                rotateX: 0,
                scaleZ: 1,
                scaleY: 1,
            });
        }
    }, [controls, flipped]);

    const animateNext = () => {
        controls
            .start({
                x: '100%',
            })
            .then(() => {
                controls.start({
                    x: 0,
                });
            });
    };
    const animatePrev = () => {
        controls
            .start({
                x: '-100%',
            })
            .then(() => {
                controls.start({
                    x: 0,
                });
            });
    };

    return (
        <Paper
            sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }}
            component={motion.div}
            animate={controls}
        >
            <LinearProgress
                value={(current / total) * 100}
                variant="determinate"
            />
            <Stack
                alignItems="center"
                justifyContent="center"
                sx={{ flex: 1, p: 4, pt: 8, position: 'relative' }}
                onClick={() => setFlipped(!flipped)}
            >
                <Typography
                    variant="h6"
                    sx={{
                        position: 'absolute',
                        top: 32,
                        left: 32,
                    }}
                >
                    {current} / {total}
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        position: 'absolute',
                        top: 32,
                        right: 32,
                    }}
                >
                    {flipped ? 'Definition' : 'Term'}
                </Typography>
                <Typography
                    variant="h3"
                    sx={{ fontWeight: 500 }}
                    textAlign="center"
                >
                    {flipped ? definition : term}
                </Typography>
            </Stack>
            <Stack
                direction="row"
                alignItems="center"
                sx={{ p: 4 }}
                spacing={4}
            >
                <Button
                    fullWidth
                    color="inherit"
                    variant="outlined"
                    onClick={() => {
                        onPrev();
                        animatePrev();
                        setFlipped(false);
                    }}
                    size="large"
                    disabled={current === 1}
                >
                    <ArrowBackIosNewIcon />
                </Button>
                <Button
                    fullWidth
                    color="inherit"
                    variant="outlined"
                    onClick={() => {
                        onNext();
                        animateNext();
                        setFlipped(false);
                    }}
                    size="large"
                >
                    <ArrowForwardIosIcon />
                </Button>
            </Stack>
        </Paper>
    );
};
