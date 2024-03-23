import React from "react";
import { Box, Grid } from "@mui/material";
import OrderCard from "./OrderCard";
function Order() {
  return (
    <Box p={5}>
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        spacing={2}
      >
        {[1, 2, 3, 4].map((order) => (
          <Grid item xs={12} md={6} lg={3}>
            <OrderCard />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Order;
