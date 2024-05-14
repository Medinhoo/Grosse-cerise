import { Stack, Typography } from "@mui/material";
import LeftBar from "../components/LeftBar";
import GroceryList from "../components/GroceryList";
import RightBar from "../components/RightBar";
import { user$ } from "../rxjs";
import { useEffect, useState } from "react";

export function MyGroceryListPage() {

  const [groceryListsLength, setGroceryListsLength] = useState();

  useEffect(() => {
    const subcription = user$.subscribe(u => {
      if (u && u.groceryLists) {
      setGroceryListsLength(u.groceryLists.length);
      }
    });
  
    return () => subcription.unsubscribe();
  }, []);
  

  return (
    <Stack
      direction="row"
      justifyContent={"center"}
      pt={2}
      gap={2}
      width="100%"
    >
      <LeftBar />
      {groceryListsLength !== 0 ? (
        <GroceryList/>
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
