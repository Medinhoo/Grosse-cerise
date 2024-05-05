import React from 'react'
import { Fab, Tooltip } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';


const AddComponent = () => {
    return (
        <Tooltip title="Create a list" sx={{
            position: "fixed",
            bottom: 20,
            left: {xs:'calc(50% - 25px)', md:'20px'}
        }}>
            <Fab color="primary" aria-label="add">
                <AddIcon />
            </Fab>
        </Tooltip>)
}

export default AddComponent