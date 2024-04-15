import React from "react";
import { Box, Grid, Typography, Stack } from "@mui/material";
import { useLocation } from "react-router-dom";
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
    status,
 
  } = location.state?.rowData || {};
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
      {/* <Grid item container xs={12} md={6}>
        
      </Grid> */}
    </Grid>
  );
}
export default ExtraOptionDetail;
