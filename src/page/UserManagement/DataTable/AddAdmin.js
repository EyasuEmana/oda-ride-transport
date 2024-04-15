import React, { useState } from "react";
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
// import CarImagePreview from "./CarImagePreview";
import usePostData from "../../../store/hooks/usePostData";
import BACKEND_API from "../../../store/utils/API";
export default function AddAdmin() {

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
  const [createAdminSuccess, setCreateAdminSuccess] = useState({
    createAdminLoading: false,
    isCreateAdminSuccess: false,
    createAdminSuccessMessage: "",
  });

  const [createAdminFail, setCreateAdminFail] = useState({
    createAdminLoading: false,
    isCreateAdminFail: false,
    createAdminFailMessage: "",
  });
  const adminValidationSchema = yup.object({
    fullName: yup.string().required("Full name required"),
    email: yup.string().required("Email required"),
    phoneNumber: yup.string().required("Phone Number required"),
    password: yup.string().required("Password required"),
  });
  const formikAdmin = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
    validationSchema: adminValidationSchema,
    onSubmit: (values) => {
        handleSubmit(values);
        setLoading(true);

    },
  });
  let endpoint = `/api/v1/users/admin`;

  const { mutate, isLoading, isError, data, isSuccess } = usePostData(endpoint);

  //
  const handleSubmit = async () => {
    try {
      const result = await BACKEND_API.post(
       `/api/v1/users/admin`,
        formikAdmin.values // Pass formikAdmin.values as data
      );
      setMessage("Admin created successfully!");
      formikAdmin.resetForm();
        } catch (error) {
            setMessage("Failed to create admin");
            console.error("Error creating admin:", error);
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
            Create Admin
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
              label={"full name"}
              {...formikAdmin.getFieldProps("fullName")}
              error={
                formikAdmin.touched.fullName &&
                Boolean(formikAdmin.errors.fullName)
              }
              helperText={
                formikAdmin.touched.fullName && formikAdmin.errors.fullName
              }
            />
          </Grid>
          <Grid item xs={12} md={4} lg={5}>
            <TextField
              type="email"
              fullWidth
              label={"email"}
              {...formikAdmin.getFieldProps("email")}
              error={
                Boolean(formikAdmin.errors.email) && formikAdmin.touched.email
              }
              helperText={formikAdmin.touched.email && formikAdmin.errors.email}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={5}>
            <TextField
              fullWidth
              label={"phone number"}
              {...formikAdmin.getFieldProps("phoneNumber")}
              error={
                Boolean(formikAdmin.errors.phoneNumber) &&
                formikAdmin.touched.phoneNumber
              }
              helperText={
                formikAdmin.touched.phoneNumber &&
                formikAdmin.errors.phoneNumber
              }
            />
          </Grid>
          <Grid item xs={12} md={4} lg={5}>
            <TextField
              fullWidth
              label={"password"}
              {...formikAdmin.getFieldProps("password")}
              error={
                Boolean(formikAdmin.errors.password) &&
                formikAdmin.touched.password
              }
              helperText={
                formikAdmin.touched.password && formikAdmin.errors.password
              }
            />
          </Grid>
          <Grid item xs={12}>
          <Button   variant="contained"
            sx={{
              backgroundColor: "#03930a", // Set background color to #03930a
              color: "white", // Set text color to white or any color you prefer
              "&:hover": {
                backgroundColor: "#027c08", // Change color on hover if needed
              },
            }}
            // fullWidth
              onClick={formikAdmin.handleSubmit}
            >
              {createAdminSuccess.createAdminLoading ? (
                <CircularProgress size={20} sx={{ color: "#FFF" }} />
              ) : (
                "Create Admin"
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
