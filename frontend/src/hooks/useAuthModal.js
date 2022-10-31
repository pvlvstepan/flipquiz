import { useEffect, useState } from 'react';

import { useAtom } from 'jotai';
import { useSearchParams } from 'react-router-dom';

import { userAtom } from 'atoms';

export const useAuthModal = () => {
    const [params, setParams] = useSearchParams();

    const [activeTab, setActiveTab] = useState(undefined);

    const authModal = params.get('auth-modal');

    const [user] = useAtom(userAtom);

    useEffect(() => {
        if (authModal === 'sign-in' || authModal === 'sign-up') {
            setActiveTab(authModal);
        } else if (authModal) {
            params.set('auth-modal', 'sign-in');
            setParams(params);
        } else {
            setActiveTab(undefined);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authModal]);

    useEffect(() => {
        if (user) {
            setActiveTab(undefined);
            params.delete('auth-modal');
            setParams(params);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authModal, user]);

    const changeTab = (tab) => {
        params.set('auth-modal', tab);
        setParams(params);
    };

    const closeModal = () => {
        setActiveTab(undefined);
        params.delete('auth-modal');
        setParams(params);
    };

    return { activeTab, changeTab, closeModal };
};
