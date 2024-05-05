import { Stack } from "@mui/material"
import Navbar from "./Navbar"
import LeftBar from "./LeftBar"
import GroceryList from "./GroceryList"
import RightBar from "./RightBar"
import AddComponent from "./AddComponent"

function App() {
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
        <GroceryList />
        <RightBar />
      </Stack>
      <AddComponent/>
    </>
  )
}

export default App
