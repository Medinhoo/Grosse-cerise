import Navbar from "./components/Navbar";
import AddListComponent from "./components/AddListComponent";
import { useState } from "react";
import { MyGroceryListPage } from "./pages/MyGroceryListPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MyListsPage } from "./pages/MyListsPage";
import SignIn from "./components/SignIn";
import AuthProvider from "./components/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  const [lists, setLists] = useState([]);

  const [logged, setLogged] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/login",
      element: (
        <>
          <Navbar />
          <SignIn setLogged={setLogged}/>
        </>
      ),
    },
    {
      path: "/",
      element: (
        <>
        <ProtectedRoute>
          <Navbar />
          <MyGroceryListPage lists={lists} setLists={setLists} />
          <AddListComponent lists={lists} setLists={setLists} />
        </ProtectedRoute>
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
    <AuthProvider isSignedIn={logged}>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
