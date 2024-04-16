import React from "react";
import { Box, Stack, Grid } from "@mui/material";
import { useTheme } from "@emotion/react";
import RSTypography from "../../../../components/RSTypography";
function Index() {
  const theme = useTheme();
  const white = theme.palette.text.main;
  return (
    <Grid item container xs={11} justifyContent={"center"}>
      <Grid item xs={12} justifyItems={"center"}>
        <center>
          <RSTypography txtcolor={white} fontsize={"15px"}>
            About Us
          </RSTypography>
        </center>
      </Grid>
      <Grid item xs={6}>
        left
      </Grid>
      <Grid item xs={6}>
        right
      </Grid>
    </Grid>
  );
}

export default Index;
