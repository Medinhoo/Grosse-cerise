import { Stack } from "@mui/material"
import Navbar from "./Navbar"
import LeftBar from "./LeftBar"
import GroceryList from "./GroceryList"
import RightBar from "./RightBar"
import AddListComponent from "./AddListComponent"
import { useState } from "react"

function App() {

  const [lists, setLists] = useState([]);

  return (
    <>
      <Navbar />
      <Stack
        direction="row"
        justifyContent={"center"}
        pt={2}
        gap={2}
        width="100%"
      >
        <LeftBar />
        {lists.length !== 0 ? <GroceryList lists={lists} setLists={setLists} /> : <div style={{ width: '50%', height: '100%' }} />}
        <RightBar />
      </Stack>
      <AddListComponent lists={lists} setLists={setLists}/>
    </>
  )
}

export default App
