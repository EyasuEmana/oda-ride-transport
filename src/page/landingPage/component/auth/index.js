import React from "react";
import { Box } from "@mui/material";
import CustomTab from "./CustomTab";
function Index({ usernameFocus }) {
  return (
    <Box>
      <CustomTab usernameFocus={usernameFocus} />
    </Box>
  );
}

export default Index;
