import React from "react";
import { Box, Stack, Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
// import RSTypography from "../../../../components/RSTypography";

import RSTypography from "../../../../components/RTSABOUT";


import logoUrl from "../../../../assets/images/newLogo.jpg";
import logoUrlLowOpacity from "../../../../assets/images/grayLogo-transparent.png";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
function Index() {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.up("1030"));
  const { aboutUsDescription } = useSelector((state) => state.footerReducer);
  const backgroundStyle = {
    backgroundImage: `url(${logoUrlLowOpacity})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  }; 
  return (
    <Grid
      item
      container
      xs={11}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{
        borderTop: "2px solid #CCC",
        borderBottom: "2px solid #CCC",
        padding: 5,
        my: 6,
        backgroundColor: "#EEE",
      }}
      id="aboutus"
    >
      <Grid item xs={12} justifyItems={"center"}></Grid>
      {isMatch && (
        <Grid item md={4}>
          <img src={logoUrl} alt="oda logo" style={{ width: 300 }} />
        </Grid>
      )}

      <Grid item xs={10} md={8} sx={!isMatch ? backgroundStyle : null}>
        <RSTypography txtcolor={theme.palette.info.light} fontsize={"25px"}>
          About Us
        </RSTypography>
        <Box>
          <RSTypography sx={{ textAlign: "justify" }}>
            {aboutUsDescription}
          </RSTypography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Index;
