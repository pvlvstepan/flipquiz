import { Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { FullScreenLoader } from 'components/common/FullScreenLoader';
import { BrokenLink404 } from 'components/pages/BrokenLink404';
import { getStudyCardByIdQuery } from 'queries/studyCards/getStudyCardById';

import { GameModeHeader } from '../GameModeHeader';

export const StudyCardLearnMode = () => {
    const { studyCardId } = useParams();

    const { data, isLoading, error } = useQuery(
        ['study-card', studyCardId],
        () => getStudyCardByIdQuery(studyCardId)
    );

    const { data: studyCard } = data || {};

    if (error && error.response?.status >= 400) {
        return <BrokenLink404 />;
    }

    if (isLoading) {
        return <FullScreenLoader />;
    }

    return (
        <Stack sx={{ flex: 1, overflow: 'hidden' }}>
            <GameModeHeader studyCardId={studyCardId} name={studyCard?.name} />
        </Stack>
    );
};
