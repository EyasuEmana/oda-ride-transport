import React, { useState } from "react";

import {
  Dialog,
  Alert,
  Button,
  DialogContentText,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import RSTextField from "../RSTextField";
import axios from "axios";
import { remote_host } from "../../globalVariable";

export default function ChangePasswordDrawer({
  setOpenChangePasswordPopup,
  openChangePasswordPopup,
}) {
  const [changePasswordData, setChangePasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confNewPassword: "",
  });
  const [changePending, setChangePending] = useState(false);
  const [changePasswordSuccess, setChangePasswordSuccess] = useState({
    ischangePasswordSuccess: false,
    changePasswordSuccessMessage: "",
  });

  const [changePasswordFail, setChangePasswordFail] = useState({
    isChangePasswordFail: false,
    changePasswordFailMessage: "",
  });

  const handleClose = () => {
    setOpenChangePasswordPopup(false);
  };

  const handleChangePassword = (e) => {
    const { name, value } = e.target;
    setChangePasswordData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setChangePending(true);
    const { currentPassword, newPassword, confNewPassword } =
      changePasswordData;
    if (currentPassword == "" || newPassword == "") {
      setChangePasswordFail((prev) => ({
        isChangePasswordFail: true,
        changePasswordFailMessage: "please fill all fields!",
      }));
      setChangePending(false);

      return;
    }
    if (confNewPassword != newPassword) {
      setChangePasswordFail((prev) => ({
        isChangePasswordFail: true,
        changePasswordFailMessage: "password not match!",
      }));
      setChangePending(false);
      return;
    }
    const body = { currentPassword, newPassword };
    await axios
      .post(`${remote_host}/api/v1/auth/change-password`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        if (res?.status == 200) {
          setChangePasswordFail((prev) => ({
            ...prev,
            isChangePasswordFail: false,
          }));
          setChangePasswordSuccess((prev) => ({
            changePasswordSuccessMessage: "Password successfully changed!",
            ischangePasswordSuccess: true,
          }));
        }
        setChangePending(false);
      })
      .catch((error) => {
        setChangePasswordSuccess((prev) => ({
          ...prev,
          ischangePasswordSuccess: false,
        }));
        if (error?.response) {
          setChangePasswordFail({
            isChangePasswordFail: true,
            changePasswordFailMessage: error.response.data.message,
          });
        } else {
          setChangePasswordFail({
            isChangePasswordFail: true,
            changePasswordFailMessage: "Network Error!",
          });
        }
        setChangePending(false);
      });
  };

  return (
    <React.Fragment>
      <Dialog open={openChangePasswordPopup} onClose={handleClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContentText px={2}>
          {changePasswordSuccess.ischangePasswordSuccess && (
            <Alert severity="success">
              {changePasswordSuccess.changePasswordSuccessMessage}
            </Alert>
          )}
          {changePasswordFail.isChangePasswordFail && (
            <Alert severity="error">
              {changePasswordFail.changePasswordFailMessage}
            </Alert>
          )}
        </DialogContentText>
        <DialogContent>
          <RSTextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="currentPassword"
            label="Old password"
            onChange={handleChangePassword}
            type="text"
            fullWidth
            variant="standard"
          />
          <RSTextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="newPassword"
            label="New password"
            onChange={handleChangePassword}
            type="text"
            fullWidth
            variant="standard"
          />
          <RSTextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="confNewPassword"
            label="Confirm new password"
            onChange={handleChangePassword}
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>
            {changePending ? (
              <CircularProgress size={20} color="info" />
            ) : (
              "Change"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* <Snackbar
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
          {changePasswordSuccess?.changePasswordSuccessMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={changePasswordSuccess.}
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
          {changePasswordFail?.changePasswordFailMessage}
        </Alert>
      </Snackbar> */}
    </React.Fragment>
  );
}
