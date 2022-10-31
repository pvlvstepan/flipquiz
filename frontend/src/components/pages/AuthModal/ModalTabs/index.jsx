import { CloseOutlined } from '@mui/icons-material';
import { Box, IconButton, Stack, Tab, Tabs } from '@mui/material';

export const ModalTabs = ({
    activeTab,
    onClose = () => undefined,
    onChange = () => undefined,
}) => {
    return (
        <Stack direction="row" spacing={1} justifyContent="space-between">
            <Tabs value={activeTab || false} onChange={(e, v) => onChange(v)}>
                <Tab label="Sign Up" value="sign-up" disableRipple />
                <Tab label="Sign In" value="sign-in" disableRipple />
            </Tabs>
            <Box sx={{ display: 'inline-flex' }}>
                <IconButton
                    edge="end"
                    onClick={() => onClose()}
                    sx={{ my: 'auto' }}
                >
                    <CloseOutlined />
                </IconButton>
            </Box>
        </Stack>
    );
};
