import React from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { Stack, Grid, Box } from "@mui/material";
import RSTypography from "../../../components/RSTypography";
function Success() {
  return (
    <Box>
      <Stack
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        spacing={2}
        sx={{ backgroundColor: "#EEE", padding: 3, border: "1px solid #DDD" }}
      >
        <FaCircleCheck size={40} color="#03930A" />
        <RSTypography fontsize={"20px"}>
          You've successfully booked for transportation
        </RSTypography>
        <RSTypography txtcolor="#03930A">
          Thank you for choosing us!
        </RSTypography>
      </Stack>
    </Box>
  );
}

export default Success;
