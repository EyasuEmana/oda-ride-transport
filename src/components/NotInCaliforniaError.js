import React from "react";
import { Stack, Box } from "@mui/material";
import { MdLocationOff } from "react-icons/md";
import RSTypography from "./RSTypography";

const NotInCaliforniaError = () => {
  return (
    <Box
      sx={{ backgroundColor: "#EEE", margin: { md: 10, xs: 2 }, padding: 5 }}
    >
      <Stack
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        spacing={3}
      >
        <Box>
          <MdLocationOff color="red" size={50} sx={{ color: "red" }} />
        </Box>
        <Box>
          <RSTypography fontsize={"20px"}>
            We don't provide service around this location!
          </RSTypography>
        </Box>
      </Stack>
    </Box>
  );
};

export default NotInCaliforniaError;
