import React, { useEffect } from "react";
import { Box, Grid, CircularProgress, Alert } from "@mui/material";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { getPassengerBooks } from "../../store/actions/bookActions";
function Order() {
  const dispatch = useDispatch();
  const {
    passengerBooks,
    isGetPassengerBookLoading,
    isGetPassengerBookError,
    getPassengerBookErrorMessage,
  } = useSelector((state) => state.bookReducer);
  useEffect(() => {
    dispatch(getPassengerBooks());
  }, []);
  return (
    <Box p={5}>
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        spacing={2}
      >
        <Grid item xs={10} justifyItems={"center"}>
          {isGetPassengerBookError && (
            <Alert severity="error">{getPassengerBookErrorMessage}</Alert>
          )}
          <center>
            {isGetPassengerBookLoading && (
              <CircularProgress sx={{ color: "#F58022" }} />
            )}
          </center>
        </Grid>

        {passengerBooks?.map((order) => (
          <Grid
            key={order.bookId}
            item
            xs={12}
            md={6}
            lg={3}
            justifyItems={"center"}
          >
            <center>
              <OrderCard order={order} />
            </center>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Order;
