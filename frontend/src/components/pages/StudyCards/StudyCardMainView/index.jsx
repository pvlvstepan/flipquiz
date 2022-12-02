import { Divider, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { FullScreenLoader } from 'components/common/FullScreenLoader';
import { BrokenLink404 } from 'components/pages/BrokenLink404';
import { getStudyCardByIdQuery } from 'queries/studyCards/getStudyCardById';

import { GameModeButtons } from './sections/GameModeButtons';
import { StudyCardComments } from './sections/StudyCardComments';
import { StudyCardHeader } from './sections/StudyCardHeader';
import { StudyCardStickyHeader } from './sections/StudyCardStickyHeader';
import { StudyCardTerms } from './sections/StudyCardTerms';
import { UserInformation } from './sections/UserInformation';

export const StudyCardMainView = () => {
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

    return studyCard ? (
        <Stack spacing={5}>
            <StudyCardHeader
                name={studyCard.name}
                description={studyCard.description}
                rating={studyCard.rating}
                totalRatings={studyCard.totalRatings}
                studyCardId={studyCardId}
                totalUsers={studyCard.totalUsers}
                createdAt={studyCard.createdAt}
            />
            <Divider />
            <GameModeButtons />
            <Divider />
            <StudyCardStickyHeader title={studyCard.name} />
            {studyCard.createdBy ? (
                <UserInformation
                    username={studyCard.createdBy.username}
                    id={studyCard.createdBy._id}
                />
            ) : undefined}
            <Divider />
            <StudyCardTerms terms={studyCard.terms} />
            <Divider />
            <StudyCardComments
                studyCardId={studyCardId}
                commentsEnabled={studyCard.commentsEnabled}
            />
        </Stack>
    ) : null;
};
