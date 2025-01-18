import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import {
  Alert,
  Grid,
  Typography,
  Stack,
  Button,
  Snackbar,
} from "@mui/material";
import ReasonPopup from "../ReasonPopup";
import PaymentStatusPopup from "../PaymentStatus";
import BookingStatusPoup from "../BookingStatus";
import { BACKEND_API } from "../../../../store/utils/API";
import { ToastContainer, toast } from "react-toastify";
import useGetData from "../../../../store/hooks/useGetData";
function P2pBookDetail(props) {
  const location = useLocation();
  // const [pointToPointBookId, setPointToPointBookId] = React.useState(null);
  const {
    tripType,
    pickupPhysicalAddress,
    pickupLongitude,
    pickupLatitude,
    dropoffPhysicalAddress,
    dropoffLongitude,
    dropoffLatitude,
    pickupDateTime,
    returnPickupDateTime,
    distanceInMiles,
    specialInstructions,
    additionalStopOnTheWayDescription,
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
    additionalStopId,
    AdditionalStopOnTheWay,
  } = location.state?.rowData || {};

  const pointToPointBookId = location.state?.rowData?.pointToPointBookId; // Provide a default value if Car is undefined

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
  const detailendpoint = `/api/v1/point-to-point-books/${pointToPointBookId}`;

  const {
    data: response,
    isLoading: isLoadingGet,
    isError: isErrorGet,
    isFetching: isFetchingTax,
    error: errorGet,
  } = useGetData(detailendpoint);

  // console.log("object", response?.PaymentDetail?.creditCardNumber);

  const handleAcceptBook = async () => {
    try {
      const response = await BACKEND_API.post(endpoint, {
        bookingId: pointToPointBookId,
        bookingType: "P2P",
        action: "ACCEPTED",
      });

      if (response.status === 200 || response.status === 201) {
        toast.success(response?.data?.message || `Book Updated successfully!`, {
          autoClose: 6000,
        });
        //
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
        bookingId: pointToPointBookId,
        bookingType: "P2P",
      });

      if (response.status === 200 || response.status === 201) {
        toast.success(response?.data?.message || `Payment Taken successfully!`, {
          autoClose: 6000,
        });
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
          <Field
            label="pickup Physical Address"
            value={pickupPhysicalAddress}
          />
          <Field
            label="dropoff Physical Address"
            value={dropoffPhysicalAddress}
          />
          <Field label="Distance In Miles" value={distanceInMiles} />
          <Field label="Number Of Passengers" value={numberOfPassengers} />
          <Field label="Special Instructions" value={numberOfSuitcases} />
          <Field label="Return Pickup DateTime" value={returnPickupDateTime} />
          <Field label="Special Instructions" value={specialInstructions} />
          <Field label="Booking For" value={bookingFor} />
          <Field label="Passenger FullName" value={passengerFullName} />
          <Field label="Passenger CellPhone" value={passengerCellPhone} />
          <Field label="Pickup Date Time" value={pickupDateTime} />
          <Field label="TotaTripFee In Dollars" value={totalTripFeeInDollars} />

          <Field
            label="Additional Stop On The Way Description"
            value={additionalStopOnTheWayDescription}
          />
          <Field label="Is GuestBooking" value={isGuestBooking} />
          <Field label="Passenger Email" value={passengerEmail} />
          <Field label="Payment DetailId" value={paymentDetailId} />
          <Field label="User Id" value={userId} />
          <Field label="Car Id" value={carId} />
          <Field label="Additional Stop Id" value={additionalStopId} />
          <Field
            label="Additional Stop On the Way"
            value={AdditionalStopOnTheWay}
          />
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
            value={response?.PaymentDetail?.securityCode}/>

          <Field
            label="Zip code"
            value={response?.PaymentDetail?.zipCode}/>
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
          bookingId={pointToPointBookId}
          bookingType="P2P"
          open={open}
          handleClose={handleClose}
        />
      )}

      {popupType === "EDIT_BOOKING_STATUS" && (
        <BookingStatusPoup
          bookingId={pointToPointBookId}
          bookingType="pointToPoint"
          open={open}
          handleClose={handleClose}
        />
      )}

      {popupType === "EDIT_PAYMENT_STATUS" && (
        <PaymentStatusPopup
          bookingId={pointToPointBookId}
          bookingType="pointToPoint"
          open={open}
          handleClose={handleClose}
        />
      )}

      <ToastContainer position="top-center" />
    </>
  );
}
export default P2pBookDetail;
