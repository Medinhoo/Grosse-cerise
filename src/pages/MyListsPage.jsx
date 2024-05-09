import { Stack } from "@mui/material";
import LeftBar from "../LeftBar";
import MyLists from "../MyLists";
import RightBar from "../RightBar";

export function MyListsPage(props) {
    return (
      <Stack
        direction="row"
        justifyContent={"center"}
        pt={2}
        gap={2}
        width="100%"
      >
        <LeftBar />
        <MyLists lists={props.lists} />
        <RightBar />
      </Stack>
    );
  }