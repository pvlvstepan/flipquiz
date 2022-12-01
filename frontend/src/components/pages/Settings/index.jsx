import DeleteSection from './delete-section';
import EmailSection from './email-section';
import NightmodeSection from './nightmode-section';
import PasswordSection from './password-section';

export const SettingsPage = () => {
    return (
        <div style={{ padding: '10px' }}>
            <NightmodeSection />
            <EmailSection />
            <PasswordSection />
            <DeleteSection />
        </div>
    );
};
