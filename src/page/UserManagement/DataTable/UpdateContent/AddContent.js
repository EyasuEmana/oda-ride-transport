import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Alert,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import BACKEND_API from "../../../../store/utils/API";
import CustomTextarea from './../../../../assets/theme/CustomTextarea';

export default function AddContent() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Define your initial form data state
  const [formData, setFormData] = useState({
    contactEmail: "",
    contactPhoneNumber: "",
    addressZipCode: "",
    addressState: "",
    aboutUsDescription: "",
  });

  const contentValidationSchema = yup.object({
    contactEmail: yup.string().required("Contact Email required"),
    contactPhoneNumber: yup.string().required("Phone Number required"),
    addressZipCode: yup.string().required("Address Zip-code"),
    addressState: yup.string().required("State Address required"),
    aboutUsDescription: yup.string().required("About us Description required"),
  });

  const formikContent = useFormik({
    initialValues: formData, // Set initial values from local state
    validationSchema: contentValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const result = await BACKEND_API.post(
          `/api/v1/footer-contents`,
          values
        );
        setSuccessMessage(
          result.data.message || "Content created successfully!"
        );
        // Update local state with form data
        setFormData(values);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Failed to create content");
        }
        console.error("Error creating content:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    // Load form data from backend when component mounts
    const loadFormData = async () => {
      try {
        // Make API call to fetch existing data
        const response = await BACKEND_API.get(`/api/v1/footer-contents`);
        console.log("point:", response)
        const existingData = response.data; // Assuming the response contains existing data
        // Update local state with existing data
        setFormData(existingData);
      } catch (error) {
        console.error("Error fetching existing data:", error);
      }
    };

    loadFormData(); // Call the function to load form data when component mounts
  }, []); // Empty dependency array ensures this effect runs only once when component mounts

  return (
    <Box>
      <Box sx={{ backgroundColor: "#DDD", padding: 2, mb: 2 }}>
        <center>
          <Typography
            sx={{ fontSize: 20, color: "#03930A", fontWeight: "bold" }}
          >
            Add Content
          </Typography>
        </center>
      </Box>
      <Box>
        <Grid
          container
          justifyContent={"flex-start"}
          alignItems={"center"}
          spacing={2}
        >
          <Grid item xs={12} md={4} lg={5}>
            <TextField
              fullWidth
              label={"Contact Email"}
              {...formikContent.getFieldProps("contactEmail")}
              error={
                formikContent.touched.contactEmail &&
                Boolean(formikContent.errors.contactEmail)
              }
              helperText={
                formikContent.touched.contactEmail &&
                formikContent.errors.contactEmail
              }
            />
          </Grid>

          <Grid item xs={12} md={4} lg={5}>
            <TextField
              fullWidth
              label={"contact Phone Number"}
              {...formikContent.getFieldProps("contactPhoneNumber")}
              error={
                formikContent.touched.contactPhoneNumber &&
                Boolean(formikContent.errors.contactPhoneNumber)
              }
              helperText={
                formikContent.touched.contactPhoneNumber &&
                formikContent.errors.contactPhoneNumber
              }
            />
          </Grid>
          <Grid item xs={12} md={4} lg={5}>
            <TextField
              fullWidth
              label={"Address Zip-Code"}
              {...formikContent.getFieldProps("addressZipCode")}
              error={
                Boolean(formikContent.errors.addressZipCode) &&
                formikContent.touched.addressZipCode
              }
              helperText={
                formikContent.touched.addressZipCode &&
                formikContent.errors.addressZipCode
              }
            />
          </Grid>
          <Grid item xs={12} md={4} lg={5}>
            <TextField
              fullWidth
              label={"State Address"}
              {...formikContent.getFieldProps("addressState")}
              error={
                Boolean(formikContent.errors.addressState) &&
                formikContent.touched.addressState
              }
              helperText={
                formikContent.touched.addressState &&
                formikContent.errors.addressState
              }
            />
          </Grid>
          <Grid item xs={12} md={4} lg={5}>
            <CustomTextarea
              rows={4} // Set the number of rows to display initially
              placeholder={"About Us Description"} // Placeholder text
              {...formikContent.getFieldProps("aboutUsDescription")}
              error={
                Boolean(formikContent.errors.aboutUsDescription) &&
                formikContent.touched.aboutUsDescription
              }
              sx={{
                width: "100%", // Set the width to 100%
                minHeight: "100px", // Set the minimum height to 100px
                resize: "vertical", // Allow vertical resizing
              }}
            />
            {formikContent.touched.aboutUsDescription &&
              formikContent.errors.aboutUsDescription && (
                <Typography variant="caption" color="error">
                  {formikContent.errors.aboutUsDescription}
                </Typography>
              )}
          </Grid>

          <Grid item xs={12}>
            {successMessage && (
              <Alert severity="success">{successMessage}</Alert>
            )}
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          </Grid>

          {/* Other form fields */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#03930a",
                color: "white",
                "&:hover": {
                  backgroundColor: "#027c08",
                },
              }}
              onClick={formikContent.handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={20} sx={{ color: "#FFF" }} />
              ) : (
                "Add Content"
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
