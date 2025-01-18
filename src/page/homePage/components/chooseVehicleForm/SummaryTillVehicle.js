import React from "react";
import { Box, Stack, Button } from "@mui/material";
import RSTypography from "../../../../components/RSTypography";
import colors from "../../../../assets/theme/colors";
import { useTheme } from "@emotion/react";
import axios from "axios";
function SummaryTillVehicle({ summaryData, travelType }) {
  const theme = useTheme();
  const createUser = async () => {
    await axios.post("http://localhost:8765/user-manager-service/login", {
      username: "0910169167",
      password: "@eyasu123",
    });
  };
  const Field = ({ field, value }) => (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      padding={0.5}
      backgroundColor={"#EEE"}
    >
      <RSTypography txtcolor={theme.palette.info.light}>{field}</RSTypography>
      <RSTypography>{value}</RSTypography>
    </Stack>
  );

  return (
    <Box>
      <Box sx={{ backgroundColor: "#DDD", padding: 2 }}>
        <RSTypography txtcolor={theme.palette.warning.main}>
          Summary
        </RSTypography>
      </Box>
      <Box padding={1}>
        <Stack direction={"column"} spacing={2}>
          {summaryData.tripType && (
            <Field field={"Trip Type"} value={summaryData.tripType} />
          )}

          {summaryData.pickupPhysicalAddress && (
            <Field
              field={"Pickup addr."}
              value={summaryData.pickupPhysicalAddress}
            />
          )}

          {summaryData.dropoffPhysicalAddress && (
            <Field
              field={"Dropoff addr."}
              value={summaryData.dropoffPhysicalAddress}
            />
          )}

          {summaryData.hour !== 0 && (
            <Field field={"Hours"} value={summaryData.hour} />
          )}

          {summaryData.airPortId && travelType == 1 && (
            <Field field={"Air Port"} value={summaryData.airPortId} />
          )}

          {summaryData.hotel && (
            <Field field={"Hotel"} value={summaryData.hotel} />
          )}
        </Stack>
      </Box>
      {/* <Button variant="contained" onClick={createUser}>
        create
      </Button> */}
    </Box>
  );
}

export default SummaryTillVehicle;
