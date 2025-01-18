import React from "react";
import {
  Box,
  Grid,
  Stack,
  CircularProgress,
  Button,
} from "@mui/material";
import RSTextField from "../../../../../components/RSTextField";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../../../../store/actions/authAction";
function Index() {
  const dispatch = useDispatch();
  const { signupLoanding,  } = useSelector(
    (state) => state.authReducer
  );
  const phoneRegex = /^[0-9]{10,15}$/;
  const signInValidationSchema = yup.object({
    firstname: yup.string().required("first name required"),
    lastname: yup.string().required("last name required"),
    email: yup.string().email("invalid email").required("email required"),
    phone: yup
      .string()
      .matches(phoneRegex, "Invalid phone number format")
      .required("phone num. required"),
    password: yup.string().required("password required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password must match")
      .required("confirm password required"),
  });
  const formikSignup = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signInValidationSchema,
    onSubmit: (values) => {
      dispatch(signup(values));
    },
  });

  return (
    <Box>
      <Grid container item spacing={2}>
        {/* <RSTypography>Personal Details</RSTypography> */}
        <Grid item container spacing={2}>
          <Grid item xs={6}>
            <RSTextField
              label="first name"
              color={"info"}
              fullWidth
              {...formikSignup.getFieldProps("firstname")}
              error={
                formikSignup.touched.firstname &&
                Boolean(formikSignup.errors.firstname)
              }
              helperText={
                formikSignup.touched.firstname && formikSignup.errors.firstname
              }
            />
          </Grid>
          <Grid item xs={6}>
            <RSTextField
              label="last name"
              color={"info"}
              fullWidth
              {...formikSignup.getFieldProps("lastname")}
              error={
                formikSignup.touched.lastname &&
                Boolean(formikSignup.errors.lastname)
              }
              helperText={
                formikSignup.touched.lastname && formikSignup.errors.lastname
              }
            />
          </Grid>
        </Grid>

        <Grid item container spacing={2}>
          <Grid item xs={6}>
            <RSTextField
              label="phone"
              type="tel"
              color={"info"}
              fullWidth
              {...formikSignup.getFieldProps("phone")}
              error={
                formikSignup.touched.phone && Boolean(formikSignup.errors.phone)
              }
              helperText={
                formikSignup.touched.phone && formikSignup.errors.phone
              }
            />
          </Grid>
          <Grid item xs={6}>
            <RSTextField
              label="email"
              type="mail"
              color={"info"}
              fullWidth
              {...formikSignup.getFieldProps("email")}
              error={
                formikSignup.touched.email && Boolean(formikSignup.errors.email)
              }
              helperText={
                formikSignup.touched.email && formikSignup.errors.email
              }
            />
          </Grid>
        </Grid>

        <Grid item container spacing={2}>
          <Grid item xs={6}>
            <RSTextField
              label="password"
              type="password"
              color={"info"}
              fullWidth
              {...formikSignup.getFieldProps("password")}
              error={
                formikSignup.touched.password &&
                Boolean(formikSignup.errors.password)
              }
              helperText={
                formikSignup.touched.password && formikSignup.errors.password
              }
            />
          </Grid>
          <Grid item xs={6}>
            <RSTextField
              label="confirm password"
              type="password"
              color={"info"}
              fullWidth
              {...formikSignup.getFieldProps("confirmPassword")}
              error={
                formikSignup.touched.confirmPassword &&
                Boolean(formikSignup.errors.confirmPassword)
              }
              helperText={
                formikSignup.touched.confirmPassword &&
                formikSignup.errors.confirmPassword
              }
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="flex-end">
            <Button
              sx={{ backgroundColor: "#FF0013" }}
              variant="contained"
              onClick={formikSignup.handleSubmit}
            >
              {signupLoanding ? (
                <CircularProgress size={25} sx={{ color: "#FFF" }} />
              ) : (
                <>Register</>
              )}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Index;
