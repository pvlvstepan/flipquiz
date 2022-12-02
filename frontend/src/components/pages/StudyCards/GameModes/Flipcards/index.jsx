import { useState, useMemo } from 'react';

import { Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { FullScreenLoader } from 'components/common/FullScreenLoader';
import { BrokenLink404 } from 'components/pages/BrokenLink404';
import { useStudyCardAnalytics } from 'hooks/useStudyCardAnalytics';
import { getStudyCardByIdQuery } from 'queries/studyCards/getStudyCardById';

import { GameModeHeader } from '../GameModeHeader';
import { FlipCard } from './Flipcard';
import { FlipCardsSuccess } from './Success';

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

    useStudyCardAnalytics({ id: studyCardId });

    if (error && error.response?.status >= 400) {
        return <BrokenLink404 />;
    }

    if (isLoading) {
        return <FullScreenLoader />;
    }

    return (
        <Stack sx={{ flex: 1, overflow: 'hidden' }}>
            <GameModeHeader studyCardId={studyCardId} name={studyCard?.name} />
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
                <FlipCardsSuccess
                    studyCardId={studyCardId}
                    onReset={() => {
                        setActiveTerm(0);
                        setCompleted(false);
                    }}
                />
            )}
        </Stack>
    );
};
