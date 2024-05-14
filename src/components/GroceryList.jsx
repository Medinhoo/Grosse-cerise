import {
  AppBar,
  Autocomplete,
  Box,
  Button,
  IconButton,
  Modal,
  Slider,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { Delete } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import {fetchUsers, user$ } from "../rxjs";
import { useParams } from "react-router-dom";

const GroceryList = () => {
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [importance, setImportance] = useState(0);
  const [selectedList, setSelectedList] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [rows, setRows] = useState([]);
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);
  const { listName } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupération des produits
        const productResponse = await fetch(
          "https://api-learning-three.vercel.app/products"
        );
        const productData = await productResponse.json();
        const products = productData.map((product) => product.name);

        // Récupération des magasins
        const storeResponse = await fetch(
          "https://api-learning-three.vercel.app/stores"
        );
        const storeData = await storeResponse.json();
        const stores = storeData.map((store) => store.name);

        // Mettre à jour l'état avec les produits et les magasins
        setProducts(products);
        setStores(stores);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [lists, setLists] = useState([]);

  useEffect(() => {
    let subscription;
    if (user$) {
      subscription = user$.subscribe((u) => {
        if (u && u.groceryLists) {
          const foundList = u.groceryLists.find((list) => list.name === listName);
          setSelectedList(foundList);
          setLists(u.groceryLists);
        }
      });
    }
  
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [listName]); // Ajoutez listName comme dépendance pour que useEffect se déclenche lorsque le nom de la liste change
  

  useEffect(() => {
    if (selectedList && selectedList.products) {
      const newRows = selectedList.products.map((product) => ({
        id: product.id,
        productName: product.productName,
        quantity: product.quantity,
        store: product.store,
        importance: product.importance,
      }));
      setRows(newRows);
    }
  }, [selectedList]);

  useEffect(() => {
    fetchUsers();
  }, []); 

  const columns = [
    { field: "productName", headerName: "Product name", flex: 1 },
    { field: "quantity", headerName: "Quantity", type: "number", flex: 1 },
    { field: "store", headerName: "Store name", flex: 1 },
    {
      field: "importance",
      headerName: "Importance /10",
      type: "number",
      flex: 1,
    },
    {
      field: "delete",
      headerName: "",
      width: 80,
      renderCell: (params) => (
        <IconButton onClick={() => handleDeleteProduct(params.row.id)}>
          <Delete color="error" />
        </IconButton>
      ),
    },
  ];

  const handleOpenAddProduct = () => setOpenAddProduct(true);
  const handleCloseAddProduct = () => setOpenAddProduct(false);

  const handleDeleteProduct = async (id) => {
    const newRows = rows.filter((row) => row.id !== id);
    setRows(newRows);
    const productIndex = selectedList.products.findIndex(
      (product) => product.id === id
    );

    if (productIndex !== -1) {
      const updatedProducts = [...selectedList.products];
      updatedProducts.splice(productIndex, 1);

      let updatedUser = { ...user$.getValue() };
      updatedUser.groceryLists = updatedUser.groceryLists.map((list) => {
        if (list.name === selectedList.name) {
          return { ...list, products: updatedProducts };
        }
        return list;
      });

      const userId = updatedUser._id;

      try {
        const response = await fetch(
          `https://api-learning-three.vercel.app/users/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
          }
        );

        updatedUser = await response.json();
      } catch (error) {
        console.error("Erreur update user ", error.message);
      }

      user$.next(updatedUser);
    }
  };

  const uniqueId = () => {
    const timestamp = Date.now()
    const random = Math.floor(Math.random()*1000);
    return timestamp + random;
  };

  const handleAddProduct = async () => {
    const newProduct = {
      id: uniqueId(),
      productName: selectedProduct,
      quantity: quantity,
      store: selectedStore,
      importance: importance,
    };

    const updatedProducts = [...selectedList.products, newProduct];

    let updatedUser = { ...user$.getValue() };
    updatedUser.groceryLists = updatedUser.groceryLists.map((list) => {
      if (list.name === selectedList.name) {
        return { ...list, products: updatedProducts };
      }
      return list;
    });

    const userId = updatedUser._id;

    console.log(updatedUser)

    try {
      const response = await fetch(
        `https://api-learning-three.vercel.app/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      updatedUser = await response.json();
    } catch (error) {
      console.error("Erreur update user ", error.message);
    } 

    user$.next(updatedUser);
    setRows((r) => [...r, newProduct]);

    setQuantity(0);
    setImportance(0);
    setSelectedProduct(null);
    setSelectedStore(null);
    handleCloseAddProduct();
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{ width: { md: "50%", xs: "80%" } }}
    >
      <Box py={2} width="100%">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {lists.length > 0 && selectedList && selectedList.name}{" "}
            </Typography>
            <IconButton color="inherit" onClick={handleOpenAddProduct}>
              <Add />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection
            getRowId={row => row.id}
          />
        </div>
      </Box>
      <Modal
        open={openAddProduct}
        onClose={handleCloseAddProduct}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          width={500}
          height={400}
          bgcolor="white"
          p={3}
          borderRadius={5}
          gap={1}
        >
          <Typography textAlign="center" color="gray">
            Add a product to your list
          </Typography>

          <Autocomplete
            id="free-solo-demo"
            value={selectedProduct}
            onChange={(event, newValue) => {
              setSelectedProduct(newValue);
            }}
            freeSolo
            options={products}
            renderInput={(params) => <TextField {...params} label="Products" />}
            sx={{
              width: "100%",
            }}
          />

          <Typography textAlign="center" color="gray" pt={1}>
            Quantity :
          </Typography>
          <Slider
            defaultValue={1}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            max={20}
            valueLabelDisplay="auto"
            sx={{
              width: "80%",
            }}
          />
          <Autocomplete
            id="free-solo-demo"
            value={selectedStore}
            onChange={(event, newValue) => {
              setSelectedStore(newValue);
            }}
            options={stores}
            renderInput={(params) => <TextField {...params} label="Stores" />}
            sx={{
              width: "100%",
            }}
          />
          <Typography textAlign="center" color="gray" pt={1}>
            Importance :
          </Typography>

          <Slider
            color="error"
            defaultValue={1}
            value={importance}
            onChange={(e) => setImportance(e.target.value)}
            max={10}
            valueLabelDisplay="auto"
            sx={{
              width: "80%",
            }}
          />

          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            mt={4}
          >
            <Button
              variant="contained"
              color="success"
              onClick={handleAddProduct}
            >
              Add product
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleCloseAddProduct}
            >
              Cancel
            </Button>
          </Box>
        </Stack>
      </Modal>
    </Box>
  );
};

export default GroceryList;
