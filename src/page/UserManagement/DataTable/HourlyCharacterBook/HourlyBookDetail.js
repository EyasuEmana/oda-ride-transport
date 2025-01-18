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
import { ToastContainer, toast } from "react-toastify";
import useGetData from "../../../../store/hooks/useGetData";

function ViewHourlyBookDetail(props) {
  const location = useLocation();
  const {
    pickupPhysicalAddress,
    pickupLongitude,
    pickupLatitude,
    dropoffPhysicalAddress,
    dropoffLongitude,
    dropoffLatitude,
    pickupDateTime,
    selectedHours,
    occasion,
    specialInstructions,
    isGuestBooking,
    bookingFor,
    passengerFullName,
    passengerCellPhone,
    passengerEmail,
    numberOfPassengers,
    numberOfSuitcases,
    totalTripFeeInDollars,
    paymentStatus,
    bookingStatus,
    paymentDetailId,
    userId,
    carId,
    AdditionalStopOnTheWay,
  } = location.state?.rowData || {};

  const hourlyCharterBookId = location.state?.rowData?.hourlyCharterBookId;

  const [open, setOpen] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const [loading, setLoading] = useState(false);
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
  const paymentendpoint = `/api/v1/admin/bookings/update-payment-status`;

  const detailendpoint = `/api/v1/airport-books/${hourlyCharterBookId}`;

  const {
    data: response,
    isLoading: isLoadingGet,
    isError: isErrorGet,
    isFetching: isFetchingTax,
    error: errorGet,
  } = useGetData(detailendpoint);

  console.log("object", response?.PaymentDetail?.creditCardNumber);

  const handleAcceptBook = async () => {
    try {
      const response = await BACKEND_API.post(endpoint, {
        bookingId: hourlyCharterBookId,
        bookingType: "HOURLY_CHARTER",
        action: "ACCEPTED",
      });

      if (response.status === 200 || response.status === 201) {
        toast.success(response?.data?.message || `Book Updated successfully!`, {
          autoClose: 6000,
          // position: toast.POSITION.TOP_CENTER
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || " Network error...", {});
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptPayment = async () => {
    try {
      const response = await BACKEND_API.post(paymentendpoint, {
        bookingId: hourlyCharterBookId,
        bookingType: "HOURLY_CHARTER",
      });

      if (response.status === 200 || response.status === 201) {
        toast.success(
          response?.data?.message || `Payment Taken successfully!`,
          {
            autoClose: 6000,
          }
        );
        //
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || " Network error...", {});
    } finally {
      setLoading(false);
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
          <Field label="pickup Date Time" value={pickupDateTime} />
          <Field label="Is GuestBooking" value={isGuestBooking} />
          <Field label="Passenger full name" value={passengerFullName} />
          <Field label="Passenger cell Phone" value={passengerCellPhone} />
          <Field label="Passenger Email" value={passengerEmail} />
          <Field label="Number Of Passengers" value={numberOfPassengers} />
          <Field label="Number Of Suitcases" value={numberOfSuitcases} />
          <Field
            label="Total Trip Fee In Dollars"
            value={totalTripFeeInDollars}
          />
          <Field label="Payment Detail Id" value={paymentDetailId} />
          <Field label="User Id" value={userId} />
          <Field label="Car Id" value={carId} />

          <Field
            label="Credit Car-Number"
            value={response?.PaymentDetail?.creditCardNumber}
          />
          <Field
            label="Expiration date"
            value={response?.PaymentDetail?.expirationDate}
          />
          <Field
            label="Security code"
            value={response?.PaymentDetail?.securityCode}
          />
          <Field
            label="Zip  code"
            value={response?.PaymentDetail?.zipCode}
          />
          <Field
            label="Additional Stop On the Way "
            value={AdditionalStopOnTheWay}
          />
          <Field label="Car Id" value={response?.Car?.carId} />
          <Field label="Car Name" value={response?.Car?.carName} />
          <Field label="Price Per-Mile" value={response?.Car?.pricePerMile} />
          <Field label="Price Per-Hour" value={response?.Car?.pricePerHour} />
        </Grid>

        <Grid item container lg={8} spacing={2} mt={2}>
          <Typography variant="h6"> Extra Options:</Typography>
        </Grid>

        {/* Check if ExtraOptions is available */}
        {response?.ExtraOptions && response.ExtraOptions.length > 0 && (
          <>
            {/* Render Extra Options in a Grid */}
            {/* <Grid item xs={12}>
              <Typography variant="h6">Extra Options:</Typography>
            </Grid> */}
            {response.ExtraOptions.map((option, index) => (
              <Grid container item xs={10} spacing={2} key={index}>
                {/* <Grid item xs={6}> */}
                <Field label="Extra Option Id" value={option.extraOptionId} />
                <Field label="Description" value={option.description} />
                {/* </Grid> */}
                {/* <Grid item xs={6}> */}
                <Field label="Name" value={option.name} />
                <Field label="Price" value={option.pricePerItem} />
                {/* </Grid> */}
              </Grid>
            ))}
          </>
        )}

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

        {/* <Grid item sx={5}>
          <Button
            variant="contained"
            color="warning"
            fullWidth
            onClick={() => handleClickOpen("EDIT_PAYMENT_STATUS")}
          >
            EDIT PAYMENT STATUS
          </Button>
        </Grid> */}

        <Grid item sx={5}>
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
            onClick={handleAcceptPayment}
          >
            TAKE PAYMENT
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

      <ToastContainer position="top-center" />

      {/* <Snackbar
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
      </Snackbar> */}
    </>
  );
}
export default ViewHourlyBookDetail;
