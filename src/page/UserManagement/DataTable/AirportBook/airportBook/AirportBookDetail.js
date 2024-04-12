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
import ReasonPopup from "../../ReasonPopup";
import PaymentStatusPopup from "../../PaymentStatus";
import BookingStatusPoup from "../../BookingStatus";
import { BACKEND_API } from "../../../../../store/utils/API";
function ViewBookDetail(props) {
  const location = useLocation();
  const {
    tripType,
    airportId,
    numberOfPassengers,
    numberOfSuitcases,
    accommodationAddress,
    bookingStatus,
    paymentStatus,
    airline,
    arrivalFlightNumber,
    specialInstructions,
    pickupDateTime,
    totalTripFeeInDollars,
    distanceInMiles,
    userId,
    additionalStopId,
    additionalStopOnTheWayDescription,
    pickupPreferenceId,
    extraOptions,
    bookingFor,
    passengerFullName,
    passengerCellPhone,
  } = location.state?.rowData || {};

  const airportBookId = location.state?.rowData?.airportBookId;

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
        bookingId: airportBookId,
        bookingType: "AIRPORT",
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
        spacing={2}
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
          <Field label="Trip Type" value={tripType} />
          <Field label="Airport id" value={airportId} />
          <Field label="Num. of Passenger" value={numberOfPassengers} />
          <Field label="Num. of Suitcase" value={numberOfSuitcases} />
          <Field label="Accomodation Addr." value={accommodationAddress} />
          <Field label="Airline" value={airline} />
          <Field label="Flight Num." value={arrivalFlightNumber} />
          <Field label="Accommodation Address" value={accommodationAddress} />
          <Field label="Airline" value={airline} />
          <Field label="Special Instructions" value={specialInstructions} />
          <Field label="Pickup DateTime" value={pickupDateTime} />
          <Field label="Arrival Flight Number" value={arrivalFlightNumber} />
          <Field label="distanceInMiles" value={distanceInMiles} />
          <Field
            label="Additional stop on the way descrption"
            value={additionalStopOnTheWayDescription}
          />
          <Field label="Booking For" value={bookingFor} />
          <Field label="Passenger FullName" value={passengerFullName} />
          <Field
            label="Total trip fee In Dollars"
            value={totalTripFeeInDollars}
          />
          <Field label="userId" value={userId} />
          <Field label="additionalStopId" value={additionalStopId} />
          <Field label="pickupPreferenceId" value={pickupPreferenceId} />
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
          bookingId={airportBookId}
          bookingType="AIRPORT"
          open={open}
          handleClose={handleClose}
        />
      )}

      {popupType === "EDIT_BOOKING_STATUS" && (
        <BookingStatusPoup
          bookingId={airportBookId}
          bookingType="airport"
          open={open}
          handleClose={handleClose}
        />
      )}

      {popupType === "EDIT_PAYMENT_STATUS" && (
        <PaymentStatusPopup
          bookingId={airportBookId}
          bookingType="airport"
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
export default ViewBookDetail;
