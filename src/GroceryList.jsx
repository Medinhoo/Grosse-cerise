import { AppBar, Autocomplete, Box, Button, IconButton, Modal, Slider, Stack, TextField, Toolbar, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { Delete } from '@mui/icons-material';
import React, { useState } from 'react';


function AddProductModal(props) {
  return (<Modal open={props.openAddProduct} onClose={props.handleCloseAddProduct} sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <Stack direction="column" justifyContent="center" alignItems="center" width={500} height={400} bgcolor="white" p={3} borderRadius={5} gap={1}>
      <Typography textAlign="center" color="gray">Add a product to your list</Typography>
      <Autocomplete id="free-solo-demo" value={props.selectedProduct} onChange={(event, newValue) => {
        props.setSelectedProduct(newValue);
      }} freeSolo options={products} renderInput={params => <TextField {...params} label="Products" />} sx={{
        width: "100%"
      }} />

      <Typography textAlign="center" color="gray" pt={1}>Quantity :</Typography>
      <Slider defaultValue={1} value={props.quantity} onChange={e => props.setQuantity(e.target.value)} max={20} valueLabelDisplay="auto" sx={{
        width: "80%"
      }} />
      <Autocomplete id="free-solo-demo" value={props.selectedStore} onChange={(event, newValue) => {
        props.setSelectedStore(newValue);
      }} options={stores} renderInput={params => <TextField {...params} label="Stores" />} sx={{
        width: "100%"
      }} />
      <Typography textAlign="center" color="gray" pt={1}>Importance :</Typography>

      <Slider color="error" defaultValue={1} value={props.importance} onChange={e => props.setImportance(e.target.value)} max={10} valueLabelDisplay="auto" sx={{
        width: "80%"
      }} />

      <Box display="flex" justifyContent="space-between" width="100%" mt={4}>
        <Button variant="contained" color="success" onClick={props.handleAddProduct}>
          Add product
        </Button>
        <Button variant="contained" color="error" onClick={props.handleCloseAddProduct}>
          Cancel
        </Button>
      </Box>
    </Stack>
  </Modal>);
}


const GroceryList = () => {

  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [importance, setImportance] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [selectedStore, setSelectedStore] = useState(stores[0]);

  const [rows, setRows] = useState([
    { id: 1, productName: 'Apple', quantity: 10, Store: 'Aldi', importance: 9 },
  ]);

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

  const handleOpenAddProduct = () => setOpenAddProduct(true);
  const handleCloseAddProduct = () => setOpenAddProduct(false);

  const handleDeleteProduct = (id) => {
    setRows(r => r.filter(row => row.id !== id));
  };

  const handleAddProduct = () => {

    const newProduct = {
      id: rows.length + 1,
      productName: selectedProduct,
      quantity: quantity,
      Store: selectedStore,
      importance: importance
    };

    setRows([...rows, newProduct]);

    setQuantity(0);
    setImportance(0);
    setSelectedProduct(products[0]);
    setSelectedStore(stores[0]);
    handleCloseAddProduct();

  };

  return (
    <Box display="flex" justifyContent="center" sx={{width:{md:'50%', xs:"80%"}}}>
      <Box py={2} width='100%'>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Grocery List
            </Typography>
            <IconButton color="inherit" onClick={handleOpenAddProduct}>
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
      <AddProductModal openAddProduct={openAddProduct} quantity={quantity} setQuantity={setQuantity} 
      importance={importance} setImportance={setImportance} selectedProduct={selectedProduct} 
      setSelectedProduct={setSelectedProduct} selectedStore={selectedStore} setSelectedStore={setSelectedStore} 
      handleCloseAddProduct={handleCloseAddProduct} handleAddProduct={handleAddProduct}></AddProductModal>
    </Box>
  );
}


const stores = [
  'Aldi',
  'Colruyt',
  'Lidl',
  'Carrefour',
  'Cora',
  'Picard',
  'Action',
  'Kruidvat',
  'Delhaize',
  'Primark',
];

const products = [
  'Apple',
  'Banana',
  'Peer',
  'Cherry',
  'Chair',
  'Table',
  'Paper',
  'Glass',
  'Water',
  'Juice',
];
export default GroceryList;