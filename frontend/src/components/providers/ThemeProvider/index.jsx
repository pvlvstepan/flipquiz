import { useEffect, useMemo } from 'react';

import {
    ThemeProvider as MuiThemeProvider,
    CssBaseline,
    createTheme,
    GlobalStyles,
} from '@mui/material';
import { SnackbarProvider } from 'notistack';
import useDarkMode from 'use-dark-mode';

import { SnackBarCloseAction } from 'components/common/SnackbarAction';
import { baseTheme, getPaletteWithMode } from 'theme';

import '@fontsource/palanquin-dark/700.css';
import '@fontsource/palanquin-dark/500.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/400.css';

export const ThemeProvider = ({ children }) => {
    const { value } = useDarkMode();

    const theme = useMemo(() => {
        return createTheme({
            ...baseTheme,
            palette: {
                ...baseTheme.palette,
                ...getPaletteWithMode(value ? 'dark' : 'light'),
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
                <GlobalStyles
                    styles={{
                        '#root': {
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: '100vh',
                            main: {
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                            },
                        },
                        a: {
                            textDecoration: 'none !important',
                        },
                    }}
                />
                {children}
            </SnackbarProvider>
        </MuiThemeProvider>
    );
};
