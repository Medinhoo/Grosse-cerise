import { Stack, Typography } from "@mui/material";
import LeftBar from "../components/LeftBar";
import GroceryList from "../components/GroceryList";
import RightBar from "../components/RightBar";

export function MyGroceryListPage(props) {
  return (
    <Stack
      direction="row"
      justifyContent={"center"}
      pt={2}
      gap={2}
      width="100%"
    >
      <LeftBar />
      {props.lists.length !== 0 ? (
        <GroceryList lists={props.lists} setLists={props.setLists} />
      ) : (
        <div
          style={{
            width: "50%",
            height: "100%",
          }}
        >
          <Typography
            height="100%"
            marginTop={25}
            textAlign="center"
            variant="h4"
          >
            {" "}
            No grocery list selected
          </Typography>
        </div>
      )}
      <RightBar />
    </Stack>
  );
}
