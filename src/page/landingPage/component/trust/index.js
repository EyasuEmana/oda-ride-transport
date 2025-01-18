import React from "react";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
const Trust = () => {
  const { safetyandTrust } = useSelector((state) => state.footerReducer);

  return (
    <Box
      sx={{ margin: { xs: 3, md: 5 } }}
      dangerouslySetInnerHTML={{ __html: safetyandTrust }}
    />
  );
};

export default Trust;
