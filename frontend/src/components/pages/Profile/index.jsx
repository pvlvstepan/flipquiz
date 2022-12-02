import { Divider, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { FullScreenLoader } from 'components/common/FullScreenLoader';
import { getUserProfile } from 'queries/profile/getUserProfile';

import { BrokenLink404 } from '../BrokenLink404';
import { ProfileHeader } from './sections/ProfileHeader';
import { RecentStudyCards } from './sections/RecentStudyCards';
import { UserStudyCards } from './sections/UserStudyCards';

export const UserProfilePage = () => {
    const { userId } = useParams();

    const { data, isLoading, error } = useQuery(['user-profile', userId], () =>
        getUserProfile(userId)
    );

    const { data: userProfile } = data || {};

    if (error && error.response?.status >= 400) {
        return <BrokenLink404 />;
    }

    if (isLoading) {
        return <FullScreenLoader />;
    }

    return (
        <Stack spacing={5}>
            <ProfileHeader
                username={userProfile?.username}
                id={userProfile?._id}
                role={userProfile?.role}
            />
            {userProfile?.recent?.length ? (
                <>
                    <Divider />
                    <RecentStudyCards cards={userProfile?.recent} />
                </>
            ) : undefined}
            <Divider />
            <UserStudyCards
                cards={userProfile?.studyCards}
                username={userProfile?.username}
                userID={userProfile?._id}
            />
        </Stack>
    );
};
