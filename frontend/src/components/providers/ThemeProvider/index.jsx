import { useEffect, useMemo } from 'react';

import {
    ThemeProvider as MuiThemeProvider,
    CssBaseline,
    createTheme,
} from '@mui/material';
import useDarkMode from 'use-dark-mode';

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
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    );
};
