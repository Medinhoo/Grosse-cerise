import { Box, Container, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch } from '@mui/material'
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const LeftBar = () => {

    const [darkMode, setDarkMode] = useState(false);

    return (
        <Box
            sx={{ display: { xs: "none", md: "block" }, width: '20%' }}>
            <Box position="fixed">
                <List>
                    <ListItem disablePadding>
                    <Link to={'/'} style={{textDecoration:'none', color:'black'}}>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                        </Link>
                    </ListItem>
                    <ListItem disablePadding>
                        <Link to={'/lists'} style={{textDecoration:'none', color:'black'}}>
                        <ListItemButton>
                            <ListItemIcon>
                                <LocalGroceryStoreIcon />
                            </ListItemIcon>
                            <ListItemText primary="My Lists" />
                        </ListItemButton>
                        </Link>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Community" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                    <Link to={'/profile'} style={{textDecoration:'none', color:'black'}}>
                        <ListItemButton>
                            <ListItemIcon>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary="My Profile" />
                        </ListItemButton>
                        </Link>
                    </ListItem>
                    <ListItem disablePadding>
                        <Container sx={{ display: "flex", alignItems: 'center' }}>
                            <DarkModeIcon />
                            <Switch defaultValue={false} color="primary" onClick={e => setDarkMode(!darkMode)} />
                        </Container>
                    </ListItem>
                </List>
            </Box>
        </Box>
    )
}

export default LeftBar