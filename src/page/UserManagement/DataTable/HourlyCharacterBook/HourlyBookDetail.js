import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  Alert,
  Grid,
  Typography,
  Stack,
  Button,
  Snackbar,
} from "@mui/material";
import BookingStatusPoup from "../BookingStatus";
import PaymentStatusPoup from "../PaymentStatus";
import ReasonPopup from "../ReasonPopup";
import { BACKEND_API } from "../../../../store/utils/API";
import PaymentStatusPopup from "../PaymentStatus";

function ViewHourlyBookDetail(props) {
  const location = useLocation();
  const {
    pickupPhysicalAddress,
    dropoffPhysicalAddress,
    selectedHours,
    occasion,
    specialInstructions,
    bookingFor,
    passengerFullName,
    passengerCellPhone,
    numberOfPassengers,
    numberOfSuitcases,
    totalTripFeeInDollars,
    paymentStatus,
    bookingStatus,
    userId,
    carId,
  } = location.state?.rowData || {};

  const hourlyCharterBookId = location.state?.rowData?.hourlyCharterBookId;

  const [open, setOpen] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [popupType, setPopupType] = useState(null);

  const handleClickOpen = (type) => {
    setOpen(true);
    setPopupType(type);
  };

  const handleSnackbarClose = (event, reason) => {
    setIsAccepted(false);
  };

  const handleClose = () => {
    setOpen(false);
    setPopupType(null);
  };
  const endpoint = `/api/v1/admin/bookings/approve`;
  const handleAcceptBook = async () => {
    try {
      const response = await BACKEND_API.post(endpoint, {
        bookingId: hourlyCharterBookId,
        bookingType: "HOURLY_CHARTER",
        action: "ACCEPTED",
      });

      if (response.status === 200) {
        setIsAccepted(true);
        // navigate("/dashboard/airportbook");
      }
      // console.log("response: ", response);
    } catch (error) {
      console.error("Error occurred while accepting book:", error);
    }
  };

  const getBackgroundColorforpayment = (paymentStatus) => {
    switch (paymentStatus) {
      case "PAID":
        return "green";
      case "CANCELLED":
        return "red";
      default:
        return "orange";
    }
  };

  const getBackgroundColorforbooking = (bookingStatus) => {
    switch (bookingStatus) {
      case "ACCEPTED":
        return "green";
      case "COMPLETED":
        return "green";
      case "CANCELLED":
        return "red";
      case "REJECTED":
        return "red";
      default:
        return "orange";
    }
  };

  const Field = ({ label, value }) => {
    return (
      <Grid item xs={6}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{ backgroundColor: "#EEE", padding: 2, borderRadius: 2 }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
            {label}
          </Typography>
          <Typography sx={{ fontSize: "20px" }}>{value}</Typography>
        </Stack>
      </Grid>
    );
  };
  return (
    <>
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        spacing={3}
      >
        <Grid item container xs={11} lg={10} spacing={2} mt={2}>
          <Grid item xs={6}>
            <Typography
              sx={{
                color: "white",
                backgroundColor: getBackgroundColorforpayment(paymentStatus),
                border: "1px solid",
                paddingX: "3px",
              }}
            >
              Payment Status: {paymentStatus}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              sx={{
                color: "white",
                backgroundColor: getBackgroundColorforbooking(bookingStatus),
                border: "1px solid",
                paddingX: "3px",
              }}
            >
              Booking Status: {bookingStatus}
            </Typography>
          </Grid>
          <Field label="hourly Charter BookId" value={hourlyCharterBookId} />
          <Field
            label="pickup Physical Address"
            value={pickupPhysicalAddress}
          />
          <Field
            label="dropoff Physical Address"
            value={dropoffPhysicalAddress}
          />
          <Field label="selected Hours" value={selectedHours} />
          <Field label="Occasion" value={occasion} />
          <Field label="special Instructions" value={specialInstructions} />
          <Field label="bookingFor" value={bookingFor} />

          {/* <Field label="Length" value={length} />
        <Field label="Interior Color" value={interiorColor} />
        <Field label="Exterior Color" value={exteriorColor} />
        <Field label="Power" value={power} />
        <Field label="Transmission Type" value={transmissionType} />
        <Field label="Fuel Type" value={fuelType} />
        <Field label="Extras" value={extras} /> */}
        </Grid>

        <Grid item lg={5}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#03930a", // Set background color to #03930a
              color: "white", // Set text color to white or any color you prefer
              "&:hover": {
                backgroundColor: "#027c08", // Change color on hover if needed
              },
            }}
            fullWidth
            onClick={handleAcceptBook}
          >
            ACCEPT BOOKING
          </Button>
        </Grid>

        <Grid item sx={5}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "red", // Set background color to #03930a
              color: "white", // Set text color to white or any color you prefer
              "&:hover": {
                backgroundColor: "#027c08", // Change color on hover if needed
              },
            }}
            fullWidth
            onClick={() => handleClickOpen("REJECT")}
          >
            REJECT BOOKING
          </Button>
        </Grid>

        <Grid item sx={5}>
          <Button
            variant="contained"
            color="warning"
            fullWidth
            onClick={() => handleClickOpen("EDIT_BOOKING_STATUS")}
          >
            EDIT BOOKING STATUS
          </Button>
        </Grid>

        <Grid item sx={5}>
          <Button
            variant="contained"
            color="warning"
            fullWidth
            onClick={() => handleClickOpen("EDIT_PAYMENT_STATUS")}
          >
            EDIT PAYMENT STATUS
          </Button>
        </Grid>
      </Grid>

      {popupType === "REJECT" && (
        <ReasonPopup
          bookingId={hourlyCharterBookId}
          bookingType="HOURLY_CHARTER"
          open={open}
          handleClose={handleClose}
        />
      )}

      {popupType === "EDIT_BOOKING_STATUS" && (
        <BookingStatusPoup
          bookingId={hourlyCharterBookId}
          bookingType="hourlyCharter"
          open={open}
          handleClose={handleClose}
        />
      )}

      {popupType === "EDIT_PAYMENT_STATUS" && (
        <PaymentStatusPopup
          bookingId={hourlyCharterBookId}
          bookingType="hourlyCharter"
          open={open}
          handleClose={handleClose}
        />
      )}

      <Snackbar
        open={isAccepted}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Book Accepted Successfully
        </Alert>
      </Snackbar>
    </>
  );
}
export default ViewHourlyBookDetail;
