import { AppBar, Menu, Avatar, IconButton, MenuItem, Toolbar, Tooltip, Typography, styled } from '@mui/material'
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {

  const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between'
  })

  return (
    <AppBar position='sticky'>
      <StyledToolbar>

        <IconButton>
        <MenuIcon sx={{color:'white'}}/>
        </IconButton>

        <Typography
          variant="h6"
          sx={{
            mr: 2,
            display: { xs: 'none', sm: 'flex' },
            fontWeight: 700,
          }}
        >
          GROSSE CERISE
        </Typography>
        <LocalGroceryStoreIcon fontSize='large' sx={{ display: { xs: "block", sm: "none" } }} />
       
        <Tooltip title="Open settings">
          <IconButton sx={{ p: 0 }}>
            <Avatar alt="Spongebob" src="./assets/spongebob.jpg" />
          </IconButton>
        </Tooltip>


      </StyledToolbar>
    </AppBar>
  )
}

export default Navbar