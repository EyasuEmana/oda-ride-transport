import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Stack, FormControlLabel, Switch } from "@mui/material";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import BACKEND_API from "../../../../store/utils/API";
function ExtraOptionDetail(props) {
  const location = useLocation();
  const {
    extraOptionId,
    name,
    description,
    pricePerItem,
    currency,
    hasMaxAllowedLimit,
    maxAllowedItems,

  } = location.state?.rowData || {};

  const [loading, setLoading] = useState(false);

  const [status, setStatus1] = useState(false); // Initialize status as false initially
  useEffect(() => {
    // Set the status based on the initial value from the API
    setStatus1(location.state?.rowData?.status === "Active");
  }, [location.state]);

  const handleToggleStatus = async () => {
    try {
      // Send PUT request to the API endpoint using axios
      const response = await BACKEND_API.put(
        `/api/v1/extra-options/${extraOptionId}/toggle-status`
      );
      if (response.status === 200 || response.status === 201) {
        toast.success(response?.data?.message || `Book Updated successfully!`, {
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
        <Field label="Extra Option Id" value={extraOptionId}/>
        <Field label="Name" value={name}/>
        <Field label="Description" value={description}/>
        <Field label="price Per-Item" value={pricePerItem}/>
        <Field label="Currency" value={currency}/>
        <Field label="Has Max Allowed Limit" value={hasMaxAllowedLimit}/>
        <Field label="Max Allowed Items" value={maxAllowedItems}/>
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
export default ExtraOptionDetail;
