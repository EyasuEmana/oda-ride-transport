import React from "react";
import { useTheme } from "@emotion/react";
import { Box, TextField, Grid, Stack, InputAdornment } from "@mui/material";
import { BsCreditCard2BackFill } from "react-icons/bs";
import { BiBarcodeReader } from "react-icons/bi";
import { MdOutlineDateRange } from "react-icons/md";

import axios from "axios";
import RSButton from "../../../../../components/RSButton";
import RSTextField from "../../../../../components/RSTextField";
import RSTypography from "../../../../../components/RSTypography";
function Index() {
  const theme = useTheme();
  // const register = async () => {
  //   const response = axios.post(
  //     "http://localhost:8765/user-manager-service/api/users/register",
  //     {
  //       username: "0947736471",
  //       password: "@eyasu123",
  //       fullName: "Tola A",
  //       roleName: "FARMER",
  //     }
  //   );
  // };
  const styleTextField = {
    ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
      border: "2px solid #4CB051",
      "&:focus": {
        border: "none",
        boxShadow: "0 0 0 0.2rem rgba(0, 200, 0, 0.2)",
      },
    },
  };
  return (
    <Box>
      <Grid container item spacing={2}>
        {/* <Grid item xs={12} > */}
        <RSTypography>Personal Details</RSTypography>
        {/* </Grid> */}
        <Grid item container spacing={2}>
          <Grid item xs={6}>
            <RSTextField label="first name" color={"info"} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <RSTextField label="last name" color={"info"} fullWidth />
          </Grid>
        </Grid>

        <Grid item container spacing={2}>
          <Grid item xs={6}>
            <RSTextField label="phone" color={"info"} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <RSTextField label="email" color={"info"} fullWidth />
          </Grid>
        </Grid>

        <Grid item container spacing={2}>
          <Grid item xs={6}>
            <RSTextField
              label="password"
              type="password"
              color={"info"}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <RSTextField
              label="confirm password"
              type="password"
              color={"info"}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="flex-end">
            <RSButton
              sx={{ width: 200 }}
              backgroundcolor={"#FF0013"}
              txtcolor={"#FFF"}
            >
              Register
            </RSButton>
          </Stack>
        </Grid>
      </Grid>

      {/* <RSButton onClick={() => register()} variant="outlined">Register</RSButton> */}
    </Box>
  );
}

export default Index;
