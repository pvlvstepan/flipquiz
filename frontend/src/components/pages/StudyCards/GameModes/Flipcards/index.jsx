import { useState, useEffect, useMemo } from 'react';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import {
    Button,
    IconButton,
    LinearProgress,
    Paper,
    Stack,
    Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { motion, useAnimation } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';

import success from 'assets/images/success.svg';
import { FullScreenLoader } from 'components/common/FullScreenLoader';
import { getStudyCardByIdQuery } from 'queries/studyCards/getStudyCardById';

const FlipCard = ({
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
                sx={{ flex: 1, p: 4, position: 'relative' }}
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

export const FlipcardsPage = () => {
    const { studyCardId } = useParams();

    const { data, isLoading, error } = useQuery(
        ['study-card', studyCardId],
        () => getStudyCardByIdQuery(studyCardId)
    );

    const { data: studyCard } = data || {};

    const [activeTerm, setActiveTerm] = useState(0);

    const [completed, setCompleted] = useState(false);

    const activeTermData = useMemo(() => {
        return studyCard?.terms[activeTerm];
    }, [activeTerm, studyCard?.terms]);

    const total = studyCard?.terms.length || 0;

    if (error && error.response?.status >= 400) {
        return (
            <Stack alignItems="center" justifyContent="center" sx={{ py: 10 }}>
                <Typography
                    textAlign="center"
                    variant="h1"
                    sx={{ mb: 3 }}
                    color="primary"
                >
                    404
                </Typography>
                <Typography textAlign="center" variant="h4">
                    It seems that the link you followed is broken...
                </Typography>
            </Stack>
        );
    }

    if (isLoading) {
        return <FullScreenLoader />;
    }

    return (
        <Stack sx={{ flex: 1, overflow: 'hidden' }}>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 5 }}
            >
                <Typography variant="h2">{studyCard?.name}</Typography>
                <IconButton component={Link} to={`/${studyCardId}`}>
                    <CloseIcon />
                </IconButton>
            </Stack>
            {!completed ? (
                <FlipCard
                    term={activeTermData.term}
                    definition={activeTermData.definition}
                    onNext={() => {
                        if (activeTerm === total - 1) {
                            setCompleted(true);
                        } else {
                            setActiveTerm(activeTerm + 1);
                        }
                    }}
                    onPrev={() => setActiveTerm(activeTerm - 1)}
                    current={activeTerm + 1}
                    total={total}
                />
            ) : (
                <>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ mb: 5 }}
                    >
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
            )}
        </Stack>
    );
};
