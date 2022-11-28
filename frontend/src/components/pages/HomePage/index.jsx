import * as React from 'react';

import { Stack } from '@mui/material';

import { GameModesSection } from './sections/GameModesSection';
import { HeroSection } from './sections/HeroSection';

export const HomePage = () => {
    return (
        <Stack>
            <HeroSection />
            <GameModesSection />
            {/* <NewSectionWillGoHere /> */}
        </Stack>
    );
};
