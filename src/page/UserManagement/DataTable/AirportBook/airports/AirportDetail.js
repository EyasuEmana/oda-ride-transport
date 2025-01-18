import React, { useEffect, useState } from "react";
import { Box, FormControlLabel, Switch,Grid, Typography,Button, Stack } from "@mui/material";
import { useLocation } from "react-router-dom";
import { BACKEND_API } from "../../../../../store/utils/API";
import { ToastContainer, toast } from "react-toastify";
function AirportDetail(props) {
  const location = useLocation();
  const {
    airportId,
    airportName,
    airportAddress,
    airportAddressLongitude,
    airportAddressLatitude,
 
  } = location.state?.rowData || {};
  const [status, setStatus] = useState(false); 
  const [isUpdated, setIsUpdated] = useState(false);

  const [loading, setLoading] = useState(false);// Initialize status as false initially
  useEffect(() => {
    // Set the status based on the initial value from the API
    setStatus(location.state?.rowData?.status === "Active");
  }, [location.state]);

  const handleToggleStatus = async () => {
    try {
      // Send PUT request to the API endpoint using axios
      const response = await BACKEND_API.put(
        `/api/v1/airports/${airportId}/toggle-status`
      );
      if (response.status === 200 || response.status === 201) {
        toast.success(response?.data?.message || `Book Updated successfully!`, {
          autoClose: 6000,
        });
        //  
      }
      
    } catch (error) {
      toast.error(error?.response?.data?.message || " Network error...", {
      });
    } finally {
      setLoading(false);
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
    <Grid container justifyContent={"center"} alignItems={"center"}>
      <Grid item xs={11} lg={8}>
        {/* <center>
          <img
            src={`${carImageUrl}`}
            style={{
              objectFit: "fill",
              width: "100%",
              borderRadius: "100%",
              border: "5px solid #999",
            }}
          />
        </center> */}
      </Grid>
      <Grid item container xs={11} lg={8} spacing={2} mt={2}>
        <Field label="Airport Id" value={airportId}/>
        <Field label="Airport Name" value={airportName}/>
        <Field label="Airport Address" value={airportAddress}/>
        <Field label="Airport Address Longitude" value={airportAddressLongitude}/>
        <Field label="Airport Address Latitude" value={airportAddressLatitude}/>
        <Field label="status" value={status}/>

      </Grid>
      <Grid item container xs={6} md={5} mt={2}>
        <FormControlLabel
          control={<Switch checked={status} onChange={handleToggleStatus} />}
          label={status ? "Active" : "Inactive"}
        />
      </Grid>
      <ToastContainer position="top-center" />
    </Grid>
  );
}
export default AirportDetail;
