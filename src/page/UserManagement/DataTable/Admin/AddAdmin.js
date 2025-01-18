import React, { useState } from "react";
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

export default function AddAdmin() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const result = await BACKEND_API.post(`/api/v1/users/admin`, values);
        setSuccessMessage(result.data.message || "Admin created successfully!");
        formikAdmin.resetForm();
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Failed to create admin");
        }
        console.error("Error creating admin:", error);
      } finally {
        setLoading(false);
      }
    },
  });

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
            {successMessage && (
              <Alert severity="success">{successMessage}</Alert>
            )}
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
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
              onClick={formikAdmin.handleSubmit}
              disabled={loading}
            >
              {loading ? (
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
