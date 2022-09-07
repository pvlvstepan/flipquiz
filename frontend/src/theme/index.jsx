import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { createTheme } from '@mui/material';

export const baseTheme = createTheme({
    components: {
        MuiButtonBase: {
            styleOverrides: {
                root: {
                    boxShadow: 'none !important',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: '8px !important',
                },
            },
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    borderTopLeftRadius: '8px !important',
                    borderTopRightRadius: '8px !important',
                },
            },
        },
        MuiSwitch: {
            styleOverrides: {
                root: ({ theme }) => ({
                    width: 42,
                    height: 22,
                    padding: 0,
                    '& .MuiSwitch-switchBase': {
                        padding: 0,
                        margin: 2,
                        transitionDuration: '300ms',
                        '&.Mui-checked': {
                            transform: 'translateX(20px)',
                            color: '#fff',
                            '& + .MuiSwitch-track': {
                                backgroundColor: theme.palette.primary.main,
                                opacity: 1,
                                border: 0,
                            },
                            '&.Mui-disabled + .MuiSwitch-track': {
                                opacity: 0.5,
                            },
                        },
                        '&.Mui-focusVisible .MuiSwitch-thumb': {
                            color: theme.palette.primary.main,
                            border: '6px solid #fff',
                        },
                        '&.Mui-disabled .MuiSwitch-thumb': {
                            color:
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[600],
                        },
                        '&.Mui-disabled + .MuiSwitch-track': {
                            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
                        },
                    },
                    '& .MuiSwitch-thumb': {
                        boxSizing: 'border-box',
                        width: 18,
                        height: 18,
                    },
                    '& .MuiSwitch-track': {
                        borderRadius: 26 / 2,
                        backgroundColor:
                            theme.palette.mode === 'light'
                                ? '#E9E9EA'
                                : '#39393D',
                        opacity: 1,
                        transition: theme.transitions.create(
                            ['background-color'],
                            {
                                duration: 300,
                            }
                        ),
                    },
                }),
            },
        },
        MuiCheckbox: {
            defaultProps: {
                icon: <RadioButtonUncheckedIcon />,
                checkedIcon: <CheckCircleTwoToneIcon />,
            },
        },
        MuiSlider: {
            styleOverrides: {
                thumb: {
                    '&:before': {
                        boxShadow: '0 0 5px rgba(0,0,0,0.3)',
                    },
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    borderRadius: '8px !important',
                    fontSize: '1rem',
                    padding: '0.5rem 1rem',
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    height: '4px',
                    borderTopLeftRadius: '4px',
                    borderTopRightRadius: '4px',
                },
            },
        },
    },
    typography: {
        fontFamily: 'Palanquin Dark',
        button: {
            fontWeight: 700,
        },
        h1: {
            fontWeight: 700,
            fontSize: '3rem',
        },
        h2: {
            fontWeight: 700,
            fontSize: '2.25rem',
        },
        h3: {
            fontWeight: 700,
            fontSize: '1.875rem',
        },
        h4: {
            fontWeight: 700,
            fontSize: '1.5rem',
        },
        h5: {
            fontWeight: 700,
            fontSize: '1.25rem',
        },
        h6: {
            fontWeight: 700,
            fontSize: '1.125rem',
        },
        body1: {
            fontFamily: 'Inter',
        },
        body2: {
            fontFamily: 'Inter',
        },
        caption: {
            fontFamily: 'Inter',
        },
        overline: {
            fontFamily: 'Inter',
        },
    },
});
