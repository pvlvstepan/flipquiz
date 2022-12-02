import { useQuery } from '@tanstack/react-query';

import { recordStudyCardAnalytics } from 'queries/studyCards/recordAnalytics';

export const useStudyCardAnalytics = ({ id }) => {
    const { data, isLoading } = useQuery(
        ['study-card-analytics', id],
        () => recordStudyCardAnalytics(id),
        {
            enabled: !!id,
        }
    );

    return { data, isLoading };
};
