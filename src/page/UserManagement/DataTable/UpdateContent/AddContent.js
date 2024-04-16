import React, { useState } from "react";
import { TextareaAutosize } from "@mui/material";
import {
  Box,
  Button,
  Stack,
  CircularProgress,
  Alert,
  Grid,
  Typography,
  TextField,
  Select,
} from "@mui/material";
import * as _ from "lodash";
import * as yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import BACKEND_API from "../../../../store/utils/API";
import usePostData from "../../../../store/hooks/usePostData";
import CustomTextarea from "../../../../assets/theme/CustomTextarea";
// import CarImagePreview from "./CarImagePreview";
export default function AddContent() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [createAdminSuccess, setCreateAdminSuccess] = useState({
    createContentLoading: false,
    isCreateContentSuccess: false,
    createContentSuccessMessage: "",
  });

  const [createContentFail, setCreateContentFail] = useState({
    createContentLoading: false,
    isCreateContentFail: false,
    createContentFailMessage: "",
  });
  const contentValidationSchema = yup.object({
    contactEmail: yup.string().required("Contact Email required"),
    contactPhoneNumber: yup.string().required("Phone Number required"),
    addressZipCode: yup.string().required("Address Zip-code"),
    addressState: yup.string().required("State Address required"),
    aboutUsDescription: yup.string().required("About us Description required"),
  });
  const formikContent = useFormik({
    initialValues: {
      contactEmail: "",
      contactPhoneNumber: "",
      addressZipCode: "",
      addressState: "",
      aboutUsDescription: "",
    },
    validationSchema: contentValidationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
      setLoading(true);
    },
  });
  let endpoint = `/api/v1/footer-contents`;

  const { mutate, isLoading, isError, data, isSuccess } = usePostData(endpoint);

  //
  const handleSubmit = async () => {
    try {
      const result = await BACKEND_API.post(
        endpoint,
        formikContent.values // Pass formikContent.values as data
      );
      setMessage("Content created successfully!");
      // formikContent.resetForm();
    } catch (error) {
      setMessage("Failed to create content");
      console.error("Error creating content:", error);
    } finally {
      setLoading(false);
    }
  };
  //   if (!isLoaded) return <>loading</>;
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
  {formikContent.touched.aboutUsDescription && formikContent.errors.aboutUsDescription && (
    <Typography variant="caption" color="error">
      {formikContent.errors.aboutUsDescription}
    </Typography>
  )}
</Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#03930a", // Set background color to #03930a
                color: "white", // Set text color to white or any color you prefer
                "&:hover": {
                  backgroundColor: "#027c08", // Change color on hover if needed
                },
              }}
              // fullWidth
              onClick={formikContent.handleSubmit}
            >
              {createAdminSuccess.createAdminLoading ? (
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
