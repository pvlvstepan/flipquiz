import { Route, Routes } from 'react-router-dom';

import { MainLayout } from 'components/layouts/Main';
import { StudyCardsLayout } from 'components/layouts/StudyCards';
import { AuthLoader } from 'components/organisms/AuthLoader';
import { AuthModal } from 'components/pages/AuthModal';
import { HomePage } from 'components/pages/HomePage';
import { NewStudyCardPage } from 'components/pages/StudyCards/NewStudyCard';
import { StudyCardMainView } from 'components/pages/StudyCards/StudyCardMainView';

export const App = () => {
    return (
        <AuthLoader>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/study-card" element={<StudyCardsLayout />}>
                        <Route path="new" element={<NewStudyCardPage />} />
                    </Route>
                    <Route path="/" element={<StudyCardsLayout />}>
                        <Route
                            path="/:studyCardId"
                            element={<StudyCardMainView />}
                        />
                    </Route>
                </Route>
            </Routes>
            <AuthModal />
        </AuthLoader>
    );
};
