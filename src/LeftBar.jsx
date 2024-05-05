import { Box, Container, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch } from '@mui/material'
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import DeleteIcon from '@mui/icons-material/Delete';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import HomeIcon from '@mui/icons-material/Home';
import React, { useState } from 'react'

const LeftBar = () => {

    const label = { inputProps: { 'aria-label': 'Color switch demo' } };
    const [darkMode, setDarkMode] = useState(false);

    return (
        <Box
            flex={1}
            sx={{ display: { xs: "none", sm: "block" }, minWidth: "225px", }}>
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
                                <LocalGroceryStoreIcon />
                            </ListItemIcon>
                            <ListItemText primary="My Groceries" />
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
                            <Switch {...label} defaultValue={false} color="primary" onClick={e => setDarkMode(!darkMode)} />
                        </Container>
                    </ListItem>
                </List>
            </Box>
        </Box>
    )
}

export default LeftBar