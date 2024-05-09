import Navbar from "./Navbar";
import AddListComponent from "./AddListComponent";
import { useState } from "react";
import { MyGroceryListPage } from "./pages/MyGroceryListPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MyListsPage } from "./pages/MyListsPage";
import SignIn from "./SignIn";

function App() {
  const [lists, setLists] = useState([]);

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
      path: "/grocery",
      element: (
        <>
          <Navbar />
          <MyGroceryListPage lists={lists} setLists={setLists} />
          <AddListComponent lists={lists} setLists={setLists} />
        </>
      ),
    },
    {
      path: "/lists",
      element: (
        <>
          <Navbar />
          <MyListsPage lists={lists} />
          <AddListComponent lists={lists} setLists={setLists} />
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
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
