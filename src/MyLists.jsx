import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import { Box, Paper, Typography } from "@mui/material";

const MyLists = ({ lists }) => {
  const [checked, setChecked] = useState([0]);

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
          {lists.map((value) => {
            return (
              <ListItem
                key={value}
                secondaryAction={
                  <IconButton edge="end" aria-label="comments">
                    <CommentIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle(value)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": value }}
                    />
                  </ListItemIcon>
                  <ListItemText id={value} primary={value} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </Box>
  );
};

export default MyLists;
