import { CloseOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useSnackbar } from 'notistack';

export const SnackBarCloseAction = ({ snackbarKey }) => {
    const { closeSnackbar } = useSnackbar();

    return (
        <IconButton
            size="small"
            color="inherit"
            onClick={() => closeSnackbar(snackbarKey)}
        >
            <CloseOutlined color="inherit" />
        </IconButton>
    );
};
