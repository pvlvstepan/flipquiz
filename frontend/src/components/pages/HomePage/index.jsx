import * as React from 'react';

import { Stack } from '@mui/material';

import { GameModesSection } from './sections/GameModesSection';
import { GetStartedSection } from './sections/GetStartedSection';
import { HeroSection } from './sections/HeroSection';
import { TeacherRegisterSection } from './sections/TeacherRegisterSection';

export const HomePage = () => {
    return (
        <Stack>
            <HeroSection />
            <GameModesSection />
            <TeacherRegisterSection />
            <GetStartedSection />
            {/* <NewSectionWillGoHere /> */}
        </Stack>
    );
};
