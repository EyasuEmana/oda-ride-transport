import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { getPassengerBooks } from "../../store/actions/bookActions";
function Order() {
  const dispatch = useDispatch();
  const { passengerBooks } = useSelector((state) => state.bookReducer);
  useEffect(() => {
    dispatch(getPassengerBooks());
  }, []);
  useEffect(() => {
    console.log("passengerBooks: ", passengerBooks);
  }, [passengerBooks]);

  return (
    <Box p={5}>
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        spacing={2}
      >

        {passengerBooks?.map((order) => (
          <Grid item xs={12} md={6} lg={3}>
            <OrderCard
              serviceFee={order.serviceFee}
              status={order.status}
              travelType={order.travelType}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Order;
