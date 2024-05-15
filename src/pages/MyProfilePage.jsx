import { Stack } from "@mui/material";
import LeftBar from "../components/LeftBar";
import MyProfile  from "../components/MyProfile";
import RightBar from "../components/RightBar";

export function MyProfilePage() {
    return (
      <Stack
        direction="row"
        justifyContent={"center"}
        pt={2}
        gap={2}
        width="100%"
      >
        <LeftBar />
        <MyProfile />
        <RightBar />
      </Stack>
    );
  }