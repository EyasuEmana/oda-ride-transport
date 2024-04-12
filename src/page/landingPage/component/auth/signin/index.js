import React from "react";
import { useTheme } from "@emotion/react";
import { Box, TextField, Grid, Stack, InputAdornment } from "@mui/material";
import axios from "axios";
import RSButton from "../../../../../components/RSButton";
import RSTextField from "../../../../../components/RSTextField";
import RSTypography from "../../../../../components/RSTypography";
function Index() {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <RSTextField label="Email" color="info" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <RSTextField
            label="Password"
            type="password"
            color="info"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="flex-end">
            <RSButton
              sx={{ width: 200 }}
              backgroundcolor={"#FF0013"}
              txtcolor={"#FFF"}
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
