import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { Box, Paper, Typography } from "@mui/material";
import { fetchUsers, user$ } from "../rxjs";
import { useNavigate } from "react-router-dom";

const MyLists = () => {
  const [checked, setChecked] = useState([0]);
  const [lists, setLists] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    user$.subscribe((u) => setLists(u.groceryLists));
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []); 


  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Box width="50%" display="flex" justifyContent="center" mt={2}>
      <Paper
        sx={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "20px",
        }}
        elevation={3}
      >
        <Typography textAlign="center" color="gray" mb={1}>
          Your grocery lists :{" "}
        </Typography>

        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {lists.length === 0 ? <Typography pt={4} textAlign="center" color="black" mb={1}>
          You have no lists created
        </Typography> :
            lists.map((list) => (
              <ListItem
                key={list.name} 
                secondaryAction={
                  <IconButton edge="end" aria-label="comments" onClick={() => navigate(`/grocery/${list.name}`)}>
                    <ArrowCircleRightIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle(list.name)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(list.name) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": list.name }}
                    />
                  </ListItemIcon>
                  <ListItemText id={list.name} primary={list.name} /> 
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </Paper>
    </Box>
  );
};

export default MyLists;
