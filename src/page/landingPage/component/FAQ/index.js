import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import FaqAccordion from "./Accordion";

function Index() {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Box sx={{ position: "relative" }} id="faq" >
      <Box
        sx={{
          position: "absolute",
          background: `linear-gradient(180deg, #E8E8E8 0%, rgba(217, 217, 217, 0) 100%)`,
          width: "90vw",
          height: "500px",
        }}
      ></Box>
      <Grid container justifyContent={"center"} alignItems={"center"}>
        {!isMatch && (
          <Grid item lg={2}>
            <Typography
              sx={{
                fontFamily: "Inter",
                fontStyle: "normal",
                fontWeight: " 400",
                fontSize: "378px",
                lineHeight: "457px",
                color: "#161F36",
              }}
            >
              ?
            </Typography>
          </Grid>
        )}
        <Grid item lg={10} xs={11} sx={{ marginTop: "86px", paddingRight: 4 }}>

          <FaqAccordion />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Index;
