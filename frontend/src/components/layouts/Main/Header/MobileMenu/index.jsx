import { useState } from 'react';

import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Button, IconButton, Menu, MenuItem } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

export const MobileMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const { pathname } = useLocation();

    return (
        <>
            <IconButton onClick={handleClick} color="primary" edge="start">
                <MenuOpenIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                open={open}
                onClose={handleClose}
                disableAutoFocusItem
                PaperProps={{
                    elevation: 0,
                    variant: 'outlined',
                    sx: {
                        mt: 0.5,
                    },
                }}
                MenuListProps={{
                    disablePadding: true,
                }}
            >
                <MenuItem component={Link} to="/" onClick={handleClose}>
                    Home
                </MenuItem>
                <MenuItem
                    component={Link}
                    to="/study-cards"
                    onClick={handleClose}
                >
                    Study Cards
                </MenuItem>
                {pathname !== '/new-study-card' ? (
                    <MenuItem onClick={handleClose}>
                        <Button
                            onClick={handleClose}
                            variant="contained"
                            component={Link}
                            to="/new-study-card"
                            size="small"
                            fullWidth
                        >
                            Create
                        </Button>
                    </MenuItem>
                ) : undefined}
            </Menu>
        </>
    );
};
