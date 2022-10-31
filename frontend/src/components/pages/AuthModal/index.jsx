import { Dialog, DialogContent, Grid, Stack } from '@mui/material';

import { useAuthModal } from 'hooks/useAuthModal';

import { AuthBackground } from './AuthBackground';
import { ModalTabs } from './ModalTabs';
import { SignInForm } from './SignIn/inded';
import { SignUpForm } from './SignUp/inded';

export const AuthModal = () => {
    const { activeTab, changeTab, closeModal } = useAuthModal();

    return (
        <Dialog open={!!activeTab} fullScreen>
            <DialogContent sx={{ p: 0 }}>
                <Grid container sx={{ height: '100%' }}>
                    <AuthBackground />
                    <Grid item xs={12} md={6}>
                        <Stack sx={{ height: '100%' }}>
                            <Stack
                                sx={{
                                    maxWidth: 576,
                                    width: '100%',
                                    mx: 'auto',
                                    flex: 1,
                                    p: 3,
                                }}
                                spacing={3}
                            >
                                <ModalTabs
                                    activeTab={activeTab}
                                    onChange={changeTab}
                                    onClose={closeModal}
                                />
                                {activeTab === 'sign-in' ? (
                                    <SignInForm />
                                ) : (
                                    <SignUpForm />
                                )}
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};
