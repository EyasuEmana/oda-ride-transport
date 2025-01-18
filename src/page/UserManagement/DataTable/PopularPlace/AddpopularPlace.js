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
import PopularPlaceImagePreview from "./PopularImagePreview";
export default function AddPopularPlace() {
  const [createPopularSuccess, setCreatePopularSuccess] = useState({
    createPopularLoading: false,
    isCreatePopularSuccess: false,
    createPopularSuccessMessage: "",
  });

  const [createPopularFail, setCreatePopularFail] = useState({
    createPopularLoading: false,
    isCreatePopularFail: false,
    createPopularFailMessage: "",
  });
  const popularValidationSchema = yup.object({
    title: yup.string().required("popular place name is required"),
    description: yup.string().required("popular place description is required"),
    
  });
  const token = sessionStorage.getItem("access_token");

  // Set the Authorization header with the token
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const formikPopular = useFormik({
    initialValues: {
        title: "",
        description: "",
      
    },
    validationSchema: popularValidationSchema,
    onSubmit: (values) => {
      handleCreatePopular(values);
    },
  });
  const handleCreatePopular = async (popularData) => {
    const newPopularData = _.omit(popularData, "popularPlaceImage");
    setCreatePopularSuccess((prev) => ({
      ...prev,
      createPopularLoading: true,
    }));
    await axios
      .post(`https://api.odatransportation.com/api/v1/popular-places`, newPopularData, config)
      .then((response) => {
        const popularPlaceId = response.data.popularPlaceId;
        uploadPopularPlaceImage(popularPlaceId);
      })
      .catch((error) => {
        const errorText = error?.response
          ? error?.response.data.message
          : "Network Error";

        setCreatePopularSuccess((prev) => ({
          ...prev,
          createPopularLoading: false,
          isCreatePopularSuccess: false,
        }));
        setCreatePopularFail({
          isCreatePopularFail: true,
          createPopularFailMessage: errorText,
        });
      });
  };
  const uploadPopularPlaceImage = async (popularPlaceId) => {
    const popularForm = new FormData();
popularForm.append("image", formikPopular.values.popularPlaceImage);
    await axios
      .put(
        `https://api.odatransportation.com/api/v1/popular-places/${popularPlaceId}/upload-image`,
        popularForm, config)
      .then(() => {
        setCreatePopularFail((prev) => ({ ...prev, isCreateCarFail: false }));
        setCreatePopularSuccess({
          createPopularLoading: false,
          isCreatePopularSuccess: true,
          createPopularSuccessMessage: "Popular place is successfully registered",
        });
        // formikPopular.resetForm();
      })
      .catch((error) => {
        setCreatePopularSuccess((prev) => ({
          ...prev,
          createPopularLoading: false,
          isCreatePopularSuccess: false,
        }));
        setCreatePopularFail({
          isCreatePopularFail: true,
          createPopularFailMessage: "Unable to register Popular place!",
        });

        const errorText = error?.response
          ? error.response.data.message
          : "Network Error";
        console.log("errorText: ", errorText);
      });
  };
  return (
    <Box>
      <Box sx={{ backgroundColor: "#DDD", padding: 2, mb: 2 }}>
        <center>
          <Typography
            sx={{ fontSize: 20, color: "#03930A", fontWeight: "bold" }}
          >
            Add Popular Places
          </Typography>
        </center>
      </Box>
      <Box>
        <Grid
          container
          // justifyContent={"flex-start"}
          alignItems={"center"}
          spacing={2}
        >
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              fullWidth
              label={"Popular place title"}
              {...formikPopular.getFieldProps("title")}
              error={
                formikPopular.touched.title && Boolean(formikPopular.errors.title)
              }
              helperText={formikPopular.touched.title && formikPopular.errors.title}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              fullWidth
              label={"description"}
              {...formikPopular.getFieldProps("description")}
              error={
                Boolean(formikPopular.errors.description) &&
                formikPopular.touched.description
              }
              helperText={
                formikPopular.touched.description &&
                formikPopular.errors.description
              }
            />
          </Grid>
         
          <Grid
            item
            xs={12}
            // sx={{
            //   display: "flex",
            //   flexDirection: "row",
            //   justifyContent: "center",
            //   alignItems: "center",
            //   width: "90%",
            //  }}
          >
            <PopularPlaceImagePreview formik={formikPopular} />
          </Grid>
          <Grid item xs={12} px={2}>
            {createPopularSuccess.isCreatePopularSuccess && (
              <Alert severity={"success"}>
                {createPopularSuccess.createPopularSuccessMessage}
              </Alert>
            )}
            {createPopularFail.isCreatePopularFail && (
              <Alert severity={"error"}>
                {createPopularFail.createPopularFailMessage}
              </Alert>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color={"warning"}
              onClick={() => formikPopular.handleSubmit()}
            >
              {createPopularSuccess.createPopularLoading ? (
                <CircularProgress size={20} sx={{color:"#FFF"}} />
              ) : (
                "Register Popular Place"
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
