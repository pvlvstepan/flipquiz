import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { userAtom } from 'atoms';
import { FullScreenLoader } from 'components/common/FullScreenLoader';
import { checkAuthQuery } from 'queries/auth/checkAuth';

export const AuthLoader = ({ children }) => {
    const [user, setUser] = useAtom(userAtom);

    const { isLoading } = useQuery(['check-auth'], () => checkAuthQuery(), {
        onSuccess: (d) => setUser(d.data.user),
        enabled: !user,
        retry: false,
    });

    if (isLoading) {
        return <FullScreenLoader />;
    }

    return children;
};
