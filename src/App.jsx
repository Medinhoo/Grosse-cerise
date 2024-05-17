import Navbar from "./components/Navbar";
import AddListComponent from "./components/AddListComponent";
import { useEffect, useState } from "react";
import { MyGroceryListPage } from "./pages/MyGroceryListPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MyListsPage } from "./pages/MyListsPage";
import { MyProfilePage } from "./pages/MyProfilePage";
import SignIn from "./pages/SignIn";
import AuthProvider from "./components/AuthProvider";
import SignUp from "./pages/SignUp";
import { ThemeProvider } from "@emotion/react";
import { Box, createTheme } from "@mui/material";
import { darkMode$ } from "./rxjs";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const subscription = darkMode$.subscribe((isDarkMode) => {
      setDarkMode(isDarkMode);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const router = createBrowserRouter([
    {
      path: "/login",
      element: (
        <>
          <Navbar />
          <SignIn />
        </>
      ),
    },
    {
      path: "/sign",
      element: (
        <>
          <Navbar />
          <SignUp />
        </>
      ),
    },
    {
      path: "/grocery/:listName",
      element: (
        <>
          <Navbar />
          <MyGroceryListPage />
          <AddListComponent />
        </>
      ),
    },
    {
      path: "/lists",
      element: (
        <>
          <Navbar />
          <MyListsPage />
          <AddListComponent />
        </>
      ),
    },
    {
      path: "/profile",
      element: (  
        <>
        <Navbar />
        <MyProfilePage/>
      </>
      ),
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
      <Box bgcolor={theme.palette.background.default} color={theme.palette.text.primary}>
          <RouterProvider router={router} />
        </Box>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
