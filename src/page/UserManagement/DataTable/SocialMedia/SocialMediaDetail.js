import React, { useEffect, useState } from "react";

import {
  Grid,
  Typography,
  Switch,
  FormControlLabel,
  Stack,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { BACKEND_API } from "../../../../store/utils/API";
import SocialMedia from "./SocialMedia";
import { ToastContainer, toast } from "react-toastify";

function SocialMediaDetail(props) {
  const location = useLocation();

  const { socialMediaId, link, title, status1 } = location.state?.rowData || {};
  const [isUpdated, setIsUpdated] = useState(false);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false); // Initialize status as false initially
  useEffect(() => {
    // Set the status based on the initial value from the API
    setStatus(location.state?.rowData?.status === "Active");
  }, [location.state]);

  const handleToggleStatus = async () => {
    try {
      // Send PUT request to the API endpoint using axios
      const response = await BACKEND_API.put(
        `/api/v1/social-medias/${socialMediaId}/toggle-status`
      );
      if (response.status === 200 || response.status === 201) {
        toast.success(response?.data?.message || `Book Updated successfully!`, {
          autoClose: 6000,
        });
        //  
      }
      
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error...", {
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
      <Grid item container xs={11} lg={8} spacing={2} mt={2}>
        <Field label="socialMediaId" value={socialMediaId} />
        <Field label="link" value={link} />
        <Field label="title" value={title} />

        <Grid container justifyContent={"center"}  xs={11} lg={6} spacing={2} mt={2}>
          <Field label="Status" />
          <FormControlLabel
            control={<Switch checked={status} onChange={handleToggleStatus} />}
            label={status ? "Active" : "Inactive"}
          />
        </Grid>
      </Grid>
      <ToastContainer position="top-center" />

    </Grid>
    
  );
}
export default SocialMediaDetail;
