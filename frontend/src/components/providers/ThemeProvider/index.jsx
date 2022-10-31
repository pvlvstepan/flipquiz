import { useEffect, useMemo } from 'react';

import {
    ThemeProvider as MuiThemeProvider,
    CssBaseline,
    createTheme,
} from '@mui/material';
import { SnackbarProvider } from 'notistack';
import useDarkMode from 'use-dark-mode';

import { SnackBarCloseAction } from 'components/common/SnackbarAction';
import { baseTheme } from 'theme';

import '@fontsource/palanquin-dark/700.css';
import '@fontsource/inter/400.css';

export const ThemeProvider = ({ children }) => {
    const { value } = useDarkMode();

    const theme = useMemo(() => {
        return createTheme({
            ...baseTheme,
            palette: {
                mode: value ? 'dark' : 'light',
            },
        });
    }, [value]);

    useEffect(() => {
        if (value) {
            document.head.children.namedItem('color-scheme').content = 'dark';
        } else {
            document.head.children.namedItem('color-scheme').content = 'light';
        }
    }, [value]);

    return (
        <MuiThemeProvider theme={theme}>
            <SnackbarProvider
                // eslint-disable-next-line react/no-unstable-nested-components
                action={(key) => <SnackBarCloseAction snackbarKey={key} />}
                preventDuplicate
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <CssBaseline />
                {children}
            </SnackbarProvider>
        </MuiThemeProvider>
    );
};
