import React from "react";
import { Box, Stack, Alert, CircularProgress, Button } from "@mui/material";
import RSTypography from "../../../../components/RSTypography";
import RSTextField from "../../../../components/RSTextField";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { resetPassword } from "../../../../store/actions/authAction";
const ResetPassword = () => {
  const {
    resetPwdLoading,
    isResetPwdSuccess,
    isResetPwdFail,
    resetPwdSuccessMessage,
    resetPwdFailMessage,
  } = useSelector((state) => state.authReducer);
  const params = useParams();
  const dispatch = useDispatch();
  const resetPasswordValidationSchema = yup.object({
    newPassword: yup.string().required("new password required"),
    confNewPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "password must match")
      .required("confirm password required"),
  });
  const formikResetPassword = useFormik({
    initialValues: {
      newPassword: "",
      confNewPassword: "",
    },
    validationSchema: resetPasswordValidationSchema,
    onSubmit: (values) => {
      dispatch(
        resetPassword({ newPassword: values.newPassword, token: params.token })
      );
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
        {isResetPwdSuccess && (
          <Alert severity="success">{resetPwdSuccessMessage}</Alert>
        )}
        {isResetPwdFail && (
          <Alert severity="error">{resetPwdFailMessage}</Alert>
        )}
        <br />
        <RSTypography fontsize={20}>Change Password</RSTypography>
        <Stack direction={{ sm: "column", lg: "row" }} mt={2} spacing={2}>
          <RSTextField
            label={"New password"}
            sx={{ width: "100%" }}
            {...formikResetPassword.getFieldProps("newPassword")}
            error={
              formikResetPassword.touched.newPassword &&
              Boolean(formikResetPassword.errors.newPassword)
            }
            helperText={
              formikResetPassword.touched.newPassword &&
              formikResetPassword.errors.newPassword
            }
          />
          <RSTextField
            type="password"
            label={"Confirm new password"}
            sx={{ width: "100%" }}
            {...formikResetPassword.getFieldProps("confNewPassword")}
            error={
              formikResetPassword.touched.confNewPassword &&
              Boolean(formikResetPassword.errors.confNewPassword)
            }
            helperText={
              formikResetPassword.touched.confNewPassword &&
              formikResetPassword.errors.confNewPassword
            }
          />
        </Stack>
        <Button
          onClick={formikResetPassword.handleSubmit}
          sx={{ marginTop: 3 }}
          fullWidth
          borderradius={"5px"}
          variant="contained"
          backgroundcolor={"#03930A"}
        >
          {resetPwdLoading ? (
            <CircularProgress size={20} sx={{ color: "#FFF" }} />
          ) : (
            "Change"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default ResetPassword;
