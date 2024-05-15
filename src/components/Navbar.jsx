import {
  AppBar,
  Menu,
  Avatar,
  IconButton,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  styled,
  Button,
  Box,
} from "@mui/material";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { logged$, user$ } from "../rxjs";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(logged$.getValue());
  const [user, setUser] = useState();

  useEffect(() => {
    const subscription = logged$.subscribe((loggedIn) => {
      setIsLoggedIn(loggedIn);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const subscription = user$.subscribe((user) => {
      setUser(user);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
  });

  const handleDisconnect = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    logged$.next(false);
    navigate("/login");
  };

  return (
    <AppBar position="sticky" sx={{ width: "100%" }}>
      <StyledToolbar>
        <IconButton>
          <MenuIcon sx={{ color: "white" }} />
        </IconButton>

        <Typography
          variant="h6"
          sx={{
            mr: 2,
            display: { xs: "none", sm: "flex" },
            fontWeight: 700,
          }}
        >
          GROSSE CERISE
        </Typography>
        <LocalGroceryStoreIcon
          fontSize="large"
          sx={{ display: { xs: "block", sm: "none" } }}
        />

        {isLoggedIn ?
          <Box display="flex" alignItems="center" gap={2} sx={{ fontWeight: "bold" }}>
            <Typography>{user.username}</Typography>
           <IconButton aria-label="delete" onClick={handleDisconnect}>
  <LogoutIcon sx={{color:"white"}} />
</IconButton>
            <Tooltip title="Open settings">
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="Spongebob" src="../assets/spongebob.jpg" />
              </IconButton>
            </Tooltip>
          </Box>
        : <Box></Box> }
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
