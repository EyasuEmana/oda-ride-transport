import React from "react";
import { BiSolidMessageRoundedError } from "react-icons/bi";
import { Stack } from "@mui/material";
function Error() {
  return (
    <Stack
      direction="column"
      justifyContent={"center"}
      alignItems={"center"}
      mt={10}
    >
      <div>
        <BiSolidMessageRoundedError color="red" size={50} />
      </div>
      <h2 className="welcome-txt">Unable to find this path!</h2>
    </Stack>
  );
}

export default Error;
