import { Divider, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { FullScreenLoader } from 'components/common/FullScreenLoader';
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

    return studyCard ? (
        <Stack spacing={5}>
            <StudyCardHeader
                name={studyCard.name}
                description={studyCard.description}
                rating={studyCard.rating}
                totalRatings={studyCard.totalRatings}
                studyCardId={studyCardId}
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
