import DeleteSection from './delete-section';
import EmailSection from './email-section';
import NightmodeSection from './nightmode-section';
import PasswordSection from './password-section';

const Settings = () => {
    return (
        <div style={{ padding: '10px' }}>
            <NightmodeSection />
            <EmailSection />
            <PasswordSection />
            <DeleteSection />
        </div>
    );
};
export default Settings;
