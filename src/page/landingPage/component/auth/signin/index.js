import React from "react";
import { useTheme } from "@emotion/react";
import { Box, TextField, Grid, Stack, InputAdornment } from "@mui/material";
import axios from "axios";
import RSButton from "../../../../../components/RSButton";
import RSTextField from "../../../../../components/RSTextField";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { signIn } from "../../../../../store/actions/authAction";
function Index() {
  const dispatch = useDispatch();
  // const signIn = async () => {
  //   const response = await axios.get(
  //     "http://localhost:8765/user-manager-service/api/education-level"
  //   );

  //   console.log("response", response);
  // };
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
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <RSTextField
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
          <Stack direction="row" justifyContent="flex-end">
            <RSButton
              sx={{ width: 200 }}
              backgroundcolor={"#FF0013"}
              txtcolor={"#FFF"}
              onClick={formikSignIn.handleSubmit}
            >
              Signin
            </RSButton>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Index;
