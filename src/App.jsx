import Navbar from "./components/Navbar";
import AddListComponent from "./components/AddListComponent";
import { useState } from "react";
import { MyGroceryListPage } from "./pages/MyGroceryListPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MyListsPage } from "./pages/MyListsPage";
import SignIn from "./components/SignIn";
import AuthProvider from "./components/AuthProvider";

function App() {

  const router = createBrowserRouter([
    {
      path: "/login",
      element: (
        <>
          <Navbar />
          <SignIn/>
        </>
      ),
    },
    {
      path: "/grocery/:listName",
      element: (
        <>
          <Navbar />
          <MyGroceryListPage/>
          <AddListComponent />
        </>
      ),
    },
    {
      path: "/lists",
      element: (
        <>
          <Navbar />
          <MyListsPage/>
          <AddListComponent/>
        </>
      ),
    },
    {
      path: "/profile",
      element: (
      <></>
      ),
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
