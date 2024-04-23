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

export default function MinimumFees() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Define your initial form data state
 
  const contentValidationSchema = yup.object({
    fee: yup.string().required("Minimum Fee required"),
  });

  const formikContent = useFormik({
    initialValues: {
      fee: 0,
    }, // Set initial values from local state
    validationSchema: contentValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const result = await BACKEND_API.post(
          `/api/v1/minimum-start-fee`,
          values
        );
        setSuccessMessage(
          result.data.message || "Minimum fee Updated successfully!"
        );
        // Update local state with form data
        // setFormData(values);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Failed to Update fees");
        }
        console.error("Error updating fee:", error);
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
        const response = await BACKEND_API.get(`/api/v1/minimum-start-fee`);
        const existingData = response.data; // Assuming the response contains existing data
        formikContent.setFieldValue("fee", existingData.fee);
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
            Update Minimum Fees
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
              label={"Minimum Fees"}
              {...formikContent.getFieldProps("fee")}
              error={
                formikContent.touched.fee && Boolean(formikContent.errors.fee)
              }
              helperText={formikContent.touched.fee && formikContent.errors.fee}
            />
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
                "Update fee"
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
