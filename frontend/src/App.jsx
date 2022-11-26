import { Route, Routes } from 'react-router-dom';

import { MainLayout } from 'components/layouts/Main';
import { AuthLoader } from 'components/organisms/AuthLoader';
import { AuthModal } from 'components/pages/AuthModal';
import { HomePage } from 'components/pages/HomePage';

export const App = () => {
    return (
        <AuthLoader>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                </Route>
            </Routes>
            <AuthModal />
        </AuthLoader>
    );
};
