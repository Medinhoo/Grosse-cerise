import { Box, Container, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch, ThemeProvider, createTheme } from '@mui/material'
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { darkMode$ } from '../rxjs';

const LeftBar = () => {
    const [darkMode, setDarkMode] = useState(darkMode$.getValue() || false);

    useEffect(() => {
        const subscription = darkMode$.subscribe(d => {
            setDarkMode(d);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const handleDark = () => {
        setDarkMode(!darkMode);
        darkMode$.next(!darkMode);
    };

    return (
        <Box
            sx={{
                display: { xs: "none", md: "block" },
                width: '20%',
                height: '100%',
                justifyContent: 'center',
            }}
        >
            <Box position="fixed">
                <List sx={{ width: '100%' }}>
                    <ListItem disablePadding sx={{ width: '100%' }}>
                        <Link to={'/lists'} style={{ textDecoration: 'none', color: darkMode ? 'white' : 'black', width: '100%' }}>
                            <ListItemButton sx={{ paddingLeft: "40px" }}>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                    <ListItem disablePadding sx={{ width: '100%' }}>
                        <Link to={'/lists'} style={{ textDecoration: 'none', color: darkMode ? 'white' : 'black', width: '100%' }}>
                            <ListItemButton sx={{ paddingLeft: "40px" }}>
                                <ListItemIcon>
                                    <LocalGroceryStoreIcon />
                                </ListItemIcon>
                                <ListItemText primary="My Lists" />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                    <ListItem disablePadding sx={{ width: '100%' }}>
                        <ListItemButton sx={{ paddingLeft: "40px" }}>
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Community" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ width: '100%' }}>
                        <Link to={'/profile'} style={{ textDecoration: 'none', color: darkMode ? 'white' : 'black', width: '100%' }}>
                            <ListItemButton sx={{ paddingLeft: "40px" }}>
                                <ListItemIcon>
                                    <AccountCircleIcon />
                                </ListItemIcon>
                                <ListItemText primary="My Profile" />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                    <ListItem sx={{ paddingLeft: "40px" }}>
                        <DarkModeIcon />
                        <Switch checked={darkMode} color="primary" onClick={handleDark} />
                    </ListItem>
                </List>
            </Box>
        </Box>
    );
};

export default LeftBar;