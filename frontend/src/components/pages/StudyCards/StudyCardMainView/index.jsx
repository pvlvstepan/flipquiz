import { Divider, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { FullScreenLoader } from 'components/common/FullScreenLoader';
import { getStudyCardByIdQuery } from 'queries/studyCards/getStudyCardById';

import { StudyCardHeader } from './sections/StudyCardHeader';
import { StudyCardTerms } from './sections/StudyCardTerms';
import { UserInformation } from './sections/UserInformation';

export const StudyCardMainView = () => {
    const { studyCardId } = useParams();

    const { data, isLoading } = useQuery(['study-card', studyCardId], () =>
        getStudyCardByIdQuery(studyCardId)
    );

    const { data: studyCard } = data || {};

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
            <Divider />
            {studyCard.createdBy ? (
                <UserInformation
                    username={studyCard.createdBy.username}
                    id={studyCard.createdBy._id}
                />
            ) : undefined}
            <Divider />
            <StudyCardTerms terms={studyCard.terms} />
        </Stack>
    ) : null;
};
