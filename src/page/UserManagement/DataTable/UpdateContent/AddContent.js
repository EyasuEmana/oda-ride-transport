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
import CustomTextarea from "./../../../../assets/theme/CustomTextarea";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ToastContainer, toast } from "react-toastify";

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
    termsAndCondition: yup.string().required("Terms and Condition"),
    safetyandTrust: yup.string().required("Safety and Trust"),
  });

  const formikContent = useFormik({
    initialValues: formData, // Set initial values from local state
    validationSchema: contentValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await BACKEND_API.post(
          `/api/v1/footer-contents`,
          values
        );
        if (response.status === 200 || response.status === 201) {
          toast.success(
            response?.data?.message || `Content Updated successfully!`,
            {
              // position: toast.POSITION.TOP_CENTER
            }
          );
          // return response.data;
        }
        setSuccessMessage(
          response.data.message || "Content Updated successfully!"
        );
        // Update local state with form data
        setFormData(values);
      } catch (error) {
        toast.error(error?.response?.data?.message || " Network error...", {
          // position: toast.POSITION.TOP_CENTER
        });
        // throw error?.response?.data;
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
        
        const existingData = response.data; 
        // Assuming the response contains existing data
        formikContent.setFieldValue("contactEmail", existingData.contactEmail);
        formikContent.setFieldValue(
          "contactPhoneNumber",
          existingData.contactPhoneNumber
        );
        formikContent.setFieldValue(
          "addressZipCode",
          existingData.addressZipCode
        );
        formikContent.setFieldValue("addressState", existingData.addressState);
        formikContent.setFieldValue(
          "aboutUsDescription",
          existingData.aboutUsDescription
        );
        formikContent.setFieldValue(
          "termsAndCondition",
          existingData.termsAndCondition
        );
        formikContent.setFieldValue(
          "safetyandTrust",
          existingData.safetyandTrust
        );
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
            Update Content
          </Typography>
        </center>
      </Box>
      <Box>
        <Grid
          container
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
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

          {/* //jll; */}
        </Grid>
        <Grid
          mt={2}
          container
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
          spacing={2}
        >
          <Grid item xs={12} md={6}>
            <CKEditor
              editor={ClassicEditor}
              data={formikContent.values.safetyandTrust} // Pass initial data
              onChange={(event, editor) => {
                const data = editor.getData();
                formikContent.setFieldValue("safetyandTrust", data);
              }}
            />
            {formikContent.touched.safetyandTrust &&
              formikContent.errors.safetyandTrust && (
                <Typography variant="caption" color="error">
                  {formikContent.errors.safetyandTrust}
                </Typography>
              )}
          </Grid>

          <Grid item xs={12} md={6}>
            <CKEditor
              editor={ClassicEditor}
              data={formikContent.values.termsAndCondition} // Pass initial data
              onChange={(event, editor) => {
                const data = editor.getData();
                formikContent.setFieldValue("termsAndCondition", data);
              }}
            />
            {formikContent.touched.termsAndCondition &&
              formikContent.errors.termsAndCondition && (
                <Typography variant="caption" color="error">
                  {formikContent.errors.termsAndCondition}
                </Typography>
              )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ backgroundColor: "#DDD", padding: 2, mb: 2 }}>
              <center>
                <Typography
                  sx={{ fontSize: 20, color: "#03930A", fontWeight: "bold" }}
                >
                  About Us
                </Typography>
              </center>
            </Box>
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
                "Update Content"
              )}
            </Button>
            <ToastContainer />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
