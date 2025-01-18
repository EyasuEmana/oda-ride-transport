import React from "react";
import { Box, Stack, Alert, CircularProgress, Button } from "@mui/material";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import RSTextField from "../../../../components/RSTextField";
import { forgetPassword } from "../../../../store/actions/authAction";
import RSButton from "../../../../components/RSButton";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const {
    forgetPwdLoading,
    isForgetPwdSuccess,
    isForgetPwdFail,
    forgetPwdSuccessMessage,
    forgetPwdFailMessage,
  } = useSelector((state) => state.authReducer);
  const resetPasswordValidationSchema = yup.object({
    email: yup
      .string()
      .email("invalid email format")
      .required("email required"),
  });
  const formikResetPassword = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: resetPasswordValidationSchema,
    onSubmit: (values) => {
      dispatch(forgetPassword({ email: values.email }));
    },
  });
  return (
    <Box
      sx={{
        display: "flex",
        flexDirections: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: { sm: "96%", md: "75%", lg: "50%" },
          height: 400,
          border: "1px solid #DDD",
          p: 3,
          mt: 3,
        }}
      >
        {isForgetPwdSuccess && (
          <Alert severity="success">{forgetPwdSuccessMessage}</Alert>
        )}
        {isForgetPwdFail && (
          <Alert severity="error">{forgetPwdFailMessage}</Alert>
        )}
        <br />
        <RSTextField
          type="email"
          label={"username/email"}
          sx={{ width: "100%" }}
          {...formikResetPassword.getFieldProps("email")}
          error={
            formikResetPassword.touched.email &&
            Boolean(formikResetPassword.errors.email)
          }
          helperText={
            formikResetPassword.touched.email &&
            formikResetPassword.errors.email
          }
        />
        <Button
          onClick={formikResetPassword.handleSubmit}
          sx={{ marginTop: 3 }}
          fullWidth
          borderradius={"5px"}
          variant="contained"
          backgroundcolor={"#03930A"}
        >
          {forgetPwdLoading ? (
            <CircularProgress size={20} sx={{ color: "#FFF" }} />
          ) : (
            "Forget password"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default ForgetPassword;
