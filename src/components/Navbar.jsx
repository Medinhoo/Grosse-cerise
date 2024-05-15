import { AppBar, Menu, Avatar, IconButton, MenuItem, Toolbar, Tooltip, Typography, styled, Button, Box } from '@mui/material'
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import React, { useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { logged$, user$ } from '../rxjs';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate()

  const [isLoggedIn, setIsLoggedIn] = useState(logged$.getValue());

  const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between'
  })

  const handleDisconnect = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    logged$.next(false)  
    navigate('/login')
  }

  useEffect(() => {
    const subscription = logged$.subscribe((loggedIn) => {
      setIsLoggedIn(loggedIn);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [])


  return (
    <AppBar position='sticky' sx={{width:'100%'}}>
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

<Box display="flex" gap={3} sx={{fontWeight:"bold"}}>

        {isLoggedIn && <Button variant='text' onClick={handleDisconnect} sx={{ color: '#ff3333', fontWeight: 'bold' }}>
  Disconnect
</Button>}
        <Tooltip title="Open settings">
          <IconButton sx={{ p: 0 }}>
            <Avatar alt="Spongebob" src="../assets/spongebob.jpg" />
          </IconButton>
        </Tooltip>
</Box>


      </StyledToolbar>
    </AppBar>
  )
}

export default Navbar