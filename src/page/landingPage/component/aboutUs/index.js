import React from "react";
import Box from "@mui/material/Box";

const AboutUs = () => {
  return (
    <Box>
      <Grid container justifyContent={"center"} alignItems={"center"}>
        <Grid item xs={3}>
          logo
        </Grid>
        <Grid item xs={5}>
          text
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutUs;
