import React, { useState } from 'react'
import { Fab, Tooltip } from "@mui/material"
import { AppBar, Autocomplete, Box, Button, IconButton, Modal, Slider, Stack, TextField, Toolbar, Typography } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';


const AddListComponent = ({lists, setLists}) => {

    const [openAddList, setOpenAddList] = useState(false);
    const [newList, setnewList] = useState('');

    const handleOpenAddList = () => setOpenAddList(true);
    const handleCloseAddList = () => setOpenAddList(false);

    const handleAddList = () => {
        setLists(l => [...lists, newList])
        handleCloseAddList()
        console.log(lists)
    }

    return (
        <>
        <Tooltip title="Create a list" sx={{
            position: "fixed",
            bottom: 20,
            left: {xs:'calc(50% - 25px)', md:'20px'}
        }}>
            <Fab color="primary" aria-label="add" onClick={handleOpenAddList}>
                <AddIcon />
            </Fab>
        </Tooltip>
        <Modal open={openAddList} onClose={handleCloseAddList} sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <Stack direction="column" justifyContent="center" alignItems="center" width={500} height={200} bgcolor="white" p={3} borderRadius={5} gap={3}>
      <Typography textAlign="center" color="gray">Give a name to your list</Typography>
      <TextField id="outlined-basic" label="Name" variant="outlined" value={newList} onChange={e => setnewList(e.target.value)}/>
      <Box display="flex" justifyContent="space-between" width="100%" mt={1}>
        <Button variant="contained" color="success" onClick={handleAddList}>
          Create list
        </Button>
        <Button variant="contained" color="error" onClick={handleCloseAddList}>
          Cancel
        </Button>
      </Box>
    </Stack>
  </Modal>
            </>


    )
}

export default AddListComponent