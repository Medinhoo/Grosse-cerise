import { Box, Container, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch } from '@mui/material'
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import DeleteIcon from '@mui/icons-material/Delete';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import React, { useState } from 'react'

const LeftBar = () => {

    const [darkMode, setDarkMode] = useState(false);

    return (
        <Box
            sx={{ display: { xs: "none", md: "block" }, width: '20%' }}>
            <Box position="fixed">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <LocalGroceryStoreIcon />
                            </ListItemIcon>
                            <ListItemText primary="My Groceries" />
                        </ListItemButton>
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
                        <ListItemButton>
                            <ListItemIcon>
                                <DeleteIcon />
                            </ListItemIcon>
                            <ListItemText primary="My last grocery list" />
                        </ListItemButton>
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