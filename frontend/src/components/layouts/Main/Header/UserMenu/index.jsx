import { useState } from 'react';

import {
    Avatar,
    Divider,
    FormControlLabel,
    ListItemAvatar,
    ListItemText,
    Menu,
    MenuItem,
    Switch,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { Link } from 'react-router-dom';
import useDarkMode from 'use-dark-mode';

import { userAtom } from 'atoms';
import { signOutQuery } from 'queries/auth/signOut';
import { getPublicUsername } from 'utils/getPublicUsername';

const stringToColor = (string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
};

export const stringAvatar = (email, sx) => {
    return {
        sx: {
            ...sx,
            bgcolor: stringToColor(email),
            cursor: 'pointer',
        },
        children: email.toUpperCase()[0],
    };
};

export const UserMenu = () => {
    const [user, setUser] = useAtom(userAtom);

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const { toggle, value } = useDarkMode();

    const { mutate: signOut } = useMutation(() => signOutQuery(), {
        onSuccess: () => {
            setUser(undefined);
        },
    });

    return (
        <div>
            {user ? (
                <Avatar
                    {...stringAvatar(user.username, {
                        width: 32,
                        height: 32,
                        color: 'white',
                    })}
                    id="user-menu-button"
                    aria-controls={open ? 'user-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                />
            ) : undefined}
            <Menu
                id="user-menu"
                anchorEl={anchorEl}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'user-menu-button',
                }}
                disableAutoFocusItem
                PaperProps={{
                    elevation: 0,
                    variant: 'outlined',
                    sx: {
                        mt: 0.5,
                    },
                }}
            >
                {user ? (
                    <MenuItem
                        sx={{ pointerEvents: 'none' }}
                        onFocus={(e) => e.preventDefault()}
                    >
                        <ListItemAvatar>
                            <Avatar
                                {...stringAvatar(user?.username, {
                                    color: 'white',
                                })}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={getPublicUsername(
                                user?.username,
                                user?._id
                            )}
                            secondary={user?.email}
                        />
                    </MenuItem>
                ) : undefined}
                <Divider />
                <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to={`/user/${user?._id}`}
                >
                    Profile
                </MenuItem>
                <MenuItem onClick={toggle}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={value}
                                onChange={toggle}
                                sx={{ ml: 2 }}
                            />
                        }
                        labelPlacement="start"
                        label="Night mode"
                        sx={{
                            justifyContent: 'space-between',
                            m: 0,
                            width: '100%',
                            pointerEvents: 'none',
                        }}
                    />
                </MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/settings">
                    Settings
                </MenuItem>
                <Divider />
                <MenuItem
                    onClick={() => {
                        handleClose();
                        signOut();
                    }}
                >
                    Sign out
                </MenuItem>
            </Menu>
        </div>
    );
};
