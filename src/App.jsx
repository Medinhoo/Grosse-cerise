import Navbar from "./components/Navbar";
import AddListComponent from "./components/AddListComponent";
import { useEffect, useState } from "react";
import { MyGroceryListPage } from "./pages/MyGroceryListPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MyListsPage } from "./pages/MyListsPage";
import SignIn from "./components/SignIn";
import AuthProvider from "./components/AuthProvider";
import SignUp from "./components/SignUp";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { darkMode$ } from "./rxjs";

function App() {

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const subscription = darkMode$.subscribe(isDarkMode => {
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
      element: <></>,
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
