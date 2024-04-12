import React from "react";
import { Box, Grid, Typography, Stack } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Height } from "@mui/icons-material";
function UserDetail(props) {
  const location = useLocation();
  const {
    userId,
    fullName,
    email,
    phoneNumber,
  } = location.state?.rowData || {};
  const Field = ({ label, value }) => {
    return (
      <Grid item xs={6}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{ backgroundColor: "#EEE", padding: 2, borderRadius: 2 }}>
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
      </Grid>
      <Grid item container xs={11} lg={8} spacing={2} mt={2}>
        <Field label="User Id" value={userId} />
        <Field label="Full Name" value={fullName} />
        <Field label="Email" value={email} />
        <Field label="phone Number" value={phoneNumber} />

      </Grid>
      {/* <Grid item container xs={12} md={6}>
        
      </Grid> */}
    </Grid>
  );
}
export default UserDetail;
