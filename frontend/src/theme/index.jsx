import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { createTheme } from '@mui/material';

export const baseTheme = createTheme({
    components: {
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
            defaultProps: {
                variant: 'outlined',
            },
        },
        MuiInputBase: {
            styleOverrides: {
                input: ({ theme }) => ({
                    '&:after': {
                        borderBottom: `3px solid ${theme.palette.warning.main}`,
                    },
                }),
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: '8px !important',
                },
                input: {
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
        MuiTooltip: {
            styleOverrides: {
                tooltip: ({ theme }) => ({
                    background: theme.palette.primary.main,
                    borderRadius: '8px !important',
                    fontSize: '1rem',
                    padding: '0.5rem 1rem',
                }),
                arrow: ({ theme }) => ({
                    color: theme.palette.primary.main,
                }),
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
        MuiCollapse: {
            styleOverrides: {
                wrapperInner: {
                    '.SnackbarItem-contentRoot': {
                        borderRadius: '8px',
                        flexWrap: 'nowrap',
                    },
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
            fontWeight: 500,
            fontSize: '1.25rem',
        },
        h6: {
            fontWeight: 500,
            fontSize: '1.125rem',
        },
        body1: {
            fontFamily: 'Inter',
            fontWeight: 500,
        },
        body2: {
            fontFamily: 'Inter',
            fontWeight: 500,
        },
        caption: {
            fontFamily: 'Inter',
            fontWeight: 500,
        },
        overline: {
            fontFamily: 'Inter',
            fontWeight: 500,
        },
    },
    shadows: [
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
    ],
    palette: {
        primary: {
            main: '#4255ff',
        },
    },
});

export const getPaletteWithMode = (mode) => ({
    mode,
    ...(mode === 'light'
        ? {
              background: {
                  default: '#F6F7FB',
              },
              warning: {
                  main: '#dcac00',
              },
          }
        : {
              text: {
                  primary: '#fff',
                  secondary: 'rgba(255, 255, 255, 0.7)',
                  disabled: 'rgba(255, 255, 255, 0.5)',
              },
              background: {
                  default: '#0A0A2D',
                  paper: '#2E3856',
              },
              divider: '#282e3e',
              warning: {
                  main: '#ffcd1f',
              },
              action: {
                  active: '#fff',
                  hover: 'rgba(255, 255, 255, 0.08)',
                  selected: 'rgba(255, 255, 255, 0.16)',
                  disabled: 'rgba(255, 255, 255, 0.3)',
                  disabledBackground: 'rgba(255, 255, 255, 0.12)',
              },
          }),
});
