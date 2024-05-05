import React from 'react'
import { Fab, Tooltip } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';


const AddComponent = () => {
    return (
        <Tooltip title="Create a list" sx={{
            position: "fixed",
            bottom: 20,
            left: 20
        }}>
            <Fab color="primary" aria-label="add">
                <AddIcon />
            </Fab>
        </Tooltip>)
}

export default AddComponent