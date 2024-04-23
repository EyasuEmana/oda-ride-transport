import React from "react";
import { Box, Stack, Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import RSTypography from "../../../../components/RSTypography";
import logoUrl from "../../../../assets/images/Odaa Transportation - Logo-01.svg";
import { useSelector } from "react-redux";
function Index() {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.up("1030"));
  const { aboutUsDescription } = useSelector((state) => state.footerReducer);

  return (
    <Grid
      item
      container
      xs={11}
      justifyContent={"center"}
      sx={{
        borderTop: "2px solid #CCC",
        borderBottom: "2px solid #CCC",
        paddingY: 5,
        my: 6,
      }}
      id="aboutus"
    >
      <Grid item xs={12} justifyItems={"center"}></Grid>
      {isMatch && (
        <Grid item md={4}>
          <img src={logoUrl} alt="oda logo" style={{ width: 300 }} />
        </Grid>
      )}

      <Grid item xs={8}>
        <RSTypography txtcolor={theme.palette.info.light} fontsize={"25px"}>
          About Us
        </RSTypography>
        <RSTypography>{aboutUsDescription}</RSTypography>
      </Grid>
    </Grid>
  );
}

export default Index;
