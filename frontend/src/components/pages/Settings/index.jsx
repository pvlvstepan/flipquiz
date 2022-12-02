import { Container } from '@mui/material';

import DeleteSection from './delete-section';
import EmailSection from './email-section';
import NightmodeSection from './nightmode-section';
import PasswordSection from './password-section';

export const SettingsPage = () => {
    return (
        <Container maxWidth="lg">
            <NightmodeSection />
            <EmailSection />
            <PasswordSection />
            <DeleteSection />
        </Container>
    );
};
