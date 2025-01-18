import React from "react";
import { Stack } from "@mui/material";
import { FaHouseFlag } from "react-icons/fa6";
function Welcome() {
  return (
    <Stack
      direction="column"
      justifyContent={"center"}
      alignItems={"center"}
      mt={10}
    >
      <h2 className="welcome-txt">Welcome to Ethio-Rental system</h2>
      <div>
        <FaHouseFlag color="white" size={50} />
      </div>
    </Stack>
  );
}

export default Welcome;
