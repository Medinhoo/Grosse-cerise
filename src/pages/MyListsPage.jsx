import { Stack } from "@mui/material";
import LeftBar from "../components/LeftBar";
import MyLists from "../components/MyLists";
import RightBar from "../components/RightBar";

export function MyListsPage() {
    return (
      <Stack
        direction="row"
        justifyContent={"center"}
        pt={2}
        gap={2}
        width="100%"
      >
        <LeftBar />
        <MyLists />
        <RightBar />
      </Stack>
    );
  }