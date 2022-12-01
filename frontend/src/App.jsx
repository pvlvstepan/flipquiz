import { Route, Routes } from 'react-router-dom';

import { MainLayout } from 'components/layouts/Main';
import { StudyCardsLayout } from 'components/layouts/StudyCards';
import { AuthLoader } from 'components/organisms/AuthLoader';
import { AuthModal } from 'components/pages/AuthModal';
import { BrokenLink404 } from 'components/pages/BrokenLink404';
import { HomePage } from 'components/pages/HomePage';
import { UserProfilePage } from 'components/pages/Profile';
import Settings from 'components/pages/Settings';
import { FlipcardsPage } from 'components/pages/StudyCards/GameModes/Flipcards';
import { StudyCardLearnMode } from 'components/pages/StudyCards/GameModes/Learn';
import { NewStudyCardPage } from 'components/pages/StudyCards/NewStudyCard';
import { StudyCardMainView } from 'components/pages/StudyCards/StudyCardMainView';

export const App = () => {
    return (
        <AuthLoader>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/study-card" element={<StudyCardsLayout />}>
                        <Route path="new" element={<NewStudyCardPage />} />
                    </Route>
                    <Route path="/" element={<StudyCardsLayout />}>
                        <Route
                            path="/new-study-card"
                            element={<NewStudyCardPage />}
                        />
                        <Route
                            path="/:studyCardId"
                            element={<StudyCardMainView />}
                        />
                        <Route
                            path="/:studyCardId/flipcards"
                            element={<FlipcardsPage />}
                        />
                        <Route
                            path="/:studyCardId/learn"
                            element={<StudyCardLearnMode />}
                        />
                        <Route
                            path="/user/:userId"
                            element={<UserProfilePage />}
                        />
                    </Route>
                </Route>
                <Route path="*" element={<BrokenLink404 />} />
            </Routes>
            <AuthModal />
        </AuthLoader>
    );
};
