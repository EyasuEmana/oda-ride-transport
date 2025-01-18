import React, { useState, useEffect } from "react";
import { useTheme } from "@emotion/react";
import {
  Box,
  Grid,
  Stack,
  Button,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import RSTextField from "../../../../../components/RSTextField";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../../../../store/actions/authAction";
import { Link, useNavigate } from "react-router-dom";
import { disableIsSigninSuccess } from "../../../../../store/reducers/authReducer";
import { getUserRole } from "../../../../../util/authUtil";
function Index({ usernameFocus }) {
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openFailSnackbar, setOpenFailSnackbar] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isSigninSuccess,
    signinLoanding,
    signinSuccessMessage,
    signinErrorMessage,
    isSignInFail,
  } = useSelector((state) => state.authReducer);

  const signInValidationSchema = yup.object({
    username: yup.string().required("username required"),
    password: yup.string().required("password required"),
  });
  const formikSignIn = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: signInValidationSchema,
    onSubmit: (values) => {
      dispatch(signIn(values));
    },
  });

  const handleCloseFailSnackbar = () => {
    setOpenFailSnackbar(false);
  };
  const handleCloseSnackbar = () => {
    setOpenSuccessSnackbar(false);
  };
  useEffect(() => {
    if (isSigninSuccess) {
      setOpenSuccessSnackbar(true);
      if (getUserRole() === "user") {
        navigate("/home/1");
      } else if (getUserRole() === "admin") {
        navigate("/dashboard");
      }
    }
    return () => {
      dispatch(disableIsSigninSuccess());
    };
  }, [isSigninSuccess]);

  useEffect(() => {
    if (isSignInFail) {
      setOpenFailSnackbar(true);
    }
  }, [isSignInFail]);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <RSTextField
            focused={usernameFocus}
            label="Email"
            color="info"
            fullWidth
            {...formikSignIn.getFieldProps("username")}
            error={
              formikSignIn.touched.username &&
              Boolean(formikSignIn.errors.username)
            }
            helperText={
              formikSignIn.touched.username && formikSignIn.errors.username
            }
          />
        </Grid>
        <Grid item xs={12}>
          <RSTextField
            label="Password"
            type="password"
            color="info"
            fullWidth
            {...formikSignIn.getFieldProps("password")}
            error={
              formikSignIn.touched.password &&
              Boolean(formikSignIn.errors.password)
            }
            helperText={
              formikSignIn.touched.password && formikSignIn.errors.password
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between">
            <Link to={"/forget-password"}>Forgot password?</Link>

            <Button
              sx={{ backgroundColor: "#FF0013" }}
              variant="contained"
              onClick={formikSignIn.handleSubmit}
            >
              {signinLoanding ? (
                <CircularProgress size={25} sx={{ color: "#FFF" }} />
              ) : (
                <> Signin</>
              )}
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={openSuccessSnackbar}
        onClose={handleCloseSnackbar}
        key={"bottom" + "left"}
        autoHideDuration={3000}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {signinSuccessMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={openFailSnackbar}
        onClose={handleCloseFailSnackbar}
        key={"bottom" + "left"}
        autoHideDuration={3000}
      >
        <Alert
          onClose={handleCloseFailSnackbar}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {signinErrorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Index;
