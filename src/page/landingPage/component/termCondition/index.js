import React from "react";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
const TermAndCondition = () => {
  const { termsAndCondition } = useSelector((state) => state.footerReducer);

  return (
    <Box
      sx={{ margin: { xs: 3, md: 5 } }}
      dangerouslySetInnerHTML={{ __html: termsAndCondition }}
    />
  );
};

export default TermAndCondition;
