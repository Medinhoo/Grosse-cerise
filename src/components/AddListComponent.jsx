import React, { useEffect, useState } from "react";
import { Fab, Tooltip } from "@mui/material";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import { user$ } from "../rxjs";

const AddListComponent = () => {
  const [openAddList, setOpenAddList] = useState(false);
  const [newList, setnewList] = useState("");
  
  const handleOpenAddList = () => setOpenAddList(true);
  const handleCloseAddList = () => setOpenAddList(false);


  useEffect(() => {
    const subcription = user$.subscribe()
    
    return () => subcription.unsubscribe()
  }, []);
  

  const handleAddList = async () => {
    const newUser = {...user$.getValue(), groceryLists: [...user$.getValue().groceryLists, {"name": newList, "products" : []}]};
    console.log(newUser)
    user$.next(newUser);

    const id = newUser._id

    try {
      await fetch(`https://api-learning-three.vercel.app/users/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
      });

  } catch (error) {
      console.error('Erreur update user ', error.message);
  }

    handleCloseAddList();
  };
  

  return (
    <>
      <Tooltip
        title="Create a list"
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50% - 25px)", md: "20px" },
        }}
      >
        <Fab color="primary" aria-label="add" onClick={handleOpenAddList}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Modal
        open={openAddList}
        onClose={handleCloseAddList}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
              bgcolor={"background.default"} color={"text.primary"}

          direction="column"
          justifyContent="center"
          alignItems="center"
          width={500}
          height={200}
          p={3}
          borderRadius={5}
          gap={3}
        >
          <Typography textAlign="center" color="gray">
            Give a name to your list
          </Typography>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={newList}
            onChange={(e) => setnewList(e.target.value)}
          />
          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            mt={1}
          >
            <Button variant="contained" color="success" onClick={handleAddList}>
              Create list
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleCloseAddList}
            >
              Cancel
            </Button>
          </Box>
        </Stack>
      </Modal>
    </>
  );
};

export default AddListComponent;
