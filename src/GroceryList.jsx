import { AppBar, Box, IconButton, Modal, Toolbar, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { Delete } from '@mui/icons-material';
import React, { useState } from 'react';

const GroceryList = () => {

  const columns = [
    { field: 'productName', headerName: 'Product name', flex: 1 },
    { field: 'quantity', headerName: 'Quantity', type: 'number', flex: 1 },
    { field: 'Store', headerName: 'Store name', flex: 1 },
    { field: 'importance', headerName: 'Importance /10', type: 'number', flex: 1 },
    {
      field: 'delete',
      headerName: '',
      width: 80,
      renderCell: (params) => (
        <IconButton onClick={() => handleDeleteProduct(params.row.id)}>
          <Delete color='error' />
        </IconButton>
      )
    }
  ];

  const [rows, setRows] = useState([
    { id: 1, productName: 'Apple', quantity: 10, Store: 'Aldi', importance: 9 },
    { id: 2, productName: 'Apple', quantity: 10, Store: 'Aldi', importance: 9 },
    { id: 3, productName: 'Apple', quantity: 10, Store: 'Aldi', importance: 9 },
    { id: 4, productName: 'Apple', quantity: 10, Store: 'Aldi', importance: 9 },
    { id: 5, productName: 'Apple', quantity: 10, Store: 'Aldi', importance: 9 },
    { id: 6, productName: 'Apple', quantity: 10, Store: 'Aldi', importance: 9 },
    { id: 7, productName: 'Apple', quantity: 10, Store: 'Aldi', importance: 9 },
    { id: 8, productName: 'Apple', quantity: 10, Store: 'Aldi', importance: 9 },
    { id: 9, productName: 'Apple', quantity: 10, Store: 'Aldi', importance: 9 },
  ]);

  const handleDeleteProduct = (id) => {
    setRows(r => r.filter(row => row.id !== id));
  };

  const handleAddProduct = (product) => {
    setRows(r => [...r, product]);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box width='50%' p={4}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Grocery List
            </Typography>
            <IconButton color="inherit" onClick={handleOpen}>
              <Add />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div style={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection
          />
        </div>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
 ihciduhciuhifdhifh         
        </Box>
      </Modal>
    </>
  );
}

export default GroceryList;
