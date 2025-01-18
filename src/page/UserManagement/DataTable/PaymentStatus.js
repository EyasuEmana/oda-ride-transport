import React, { useState } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import { BACKEND_API } from "../../../store/utils/API";
import { ToastContainer, toast } from "react-toastify";

export default function PaymentStatusPopup({
  open,
  handleClose,
  bookingId,
  bookingType,
}) {
  const [status, setStatus] = useState("NOT_PAID"); // Default value
  const [isUpdated, setIsUpdated] = useState(false);
  const [loading, setLoading] = useState(false);

  const paymentStatusOptions = [
    "NOT_PAID",
    "AWAITING_PAYMENT",
    "PARTIALLY_PAID",
    "PAID",
    "PENDING_REFUND",
    "REFUNDED",
    "CANCELLED",
  ];
  const endpoint = `/api/v1/`;
  const handleBook = async () => {
    try {
      // Make PUT request using the BACKEND_API instance
      const response = await BACKEND_API.put(
        `${endpoint}${getEndpoint()}/payment-status`,
        {
          status: status,
        }
      );

      // Handle response
      if (response.status === 200 || response.status === 201) {
        toast.success(
          response?.data?.message || `Payment Updated successfully!`,
          {
            autoClose: 6000,
            // position: toast.POSITION.TOP_CENTER
          }
        );
        //    handleClose();
        // setIsUpdated(true);
        // return response.data;
      }
      // Handle navigation if needed
      // navigate("/dashboard/airportbook")
    } catch (error) {
      toast.error(error?.response?.data?.message ||" Network error...", {
        // position: toast.POSITION.TOP_CENTER
      });
      // handleClose();
      // setIsUpdated(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setIsUpdated(false);
  };

  const getEndpoint = () => {
    switch (bookingType) {
      case "hourlyCharter":
        return `hourly-charter-books/${bookingId}`;
      case "airport":
        return `airport-books/${bookingId}`;
      case "pointToPoint":
        return `point-to-point-books/${bookingId}`;
      default:
        return ""; // Default case
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            handleClose();
          },
        }}
      >
        <DialogTitle>Change Payment Status</DialogTitle>
        <DialogContent>
          <DialogContentText>Please, Select Payment status</DialogContentText>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            autoFocus
            required
            fullWidth
          >
            {paymentStatusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </DialogContent>
        <DialogActions>
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
            onClick={handleClose}
          >
            Cancel
          </Button>
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
            onClick={handleBook}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer position="top-center" />
    </React.Fragment>
  );
}
