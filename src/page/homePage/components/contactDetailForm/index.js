import React, { useState } from "react";
import {
  Box,
  Stack,
  Grid,
  TextField,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Checkbox,
} from "@mui/material";
import RSButton from "../../../../components/RSButton";
import RSTypography from "../../../../components/RSTypography";
import RSTextField from "../../../../components/RSTextField";
import RSRadio from "../../../../components/RSRadio";
function Index() {
  const [stopOnWay, setStopOnWay] = useState(true);

  return (
    <Box>
      <Grid container direction={{ xs: "column-reverse", lg: "row" }}>
        <Grid item xs={3}>
          summary
        </Grid>
        <Grid container item xs={8} spacing={2}>
          <Grid item xs={6}>
            <RSTextField label="First Name" color={"info"} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <RSTextField label="Last Name" color={"info"} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <RSTextField label="Email" color={"info"} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <RSTextField label="Confirm Email" color={"info"} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <RSTextField label="Your Cell Phone" color={"info"} fullWidth />
          </Grid>
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="info"
                    checked={stopOnWay}
                    onChange={(e) => setStopOnWay(e.target.checked)}
                  />
                }
                label="I'm not the passenger. I'm booking this for someone else."
              />
            </Grid>
            {stopOnWay && (
              <>
                <Grid item xs={6}>
                  <RSTextField
                    label="Passenger First Name"
                    color={"info"}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <RSTextField
                    label="Passenger Last Name"
                    color={"info"}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <RSTextField
                    label="Passenger Cell Phone"
                    color={"info"}
                    fullWidth
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Index;
