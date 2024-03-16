import React from "react";
import { Box, Stack, useTheme, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import RSTypography from "../../../components/RSTypography";
function StepSummary({
  rideSummaryData,
  vehicleSummaryData,
  tripSummaryData,
  contactSummaryData,
}) {
  const theme = useTheme();
  const location = useLocation();
  const tripType = rideSummaryData.tripType;
  var travelType = location.pathname.split("/").pop();
  const isPointToPointTravel = travelType === "1";
  const isAirportTravel = travelType === "2";
  const isHourlyTravel = travelType === "3";
  const { cost } = useSelector((state) => state.bookReducer);
  const isRoundTrip = () => {
    return (
      tripType == "Round-Trip" ||
      tripType == "Ride to the airport(round trip)" ||
      tripType == "Ride from the airport(round trip)" ||
      tripType ==
        "Ride from the airport(round trips with two different airports)"
    );
  };

  const isReturnAddrVisible = () => {
    const isVisible =
      (isPointToPointTravel || isAirportTravel) && isRoundTrip();
    return isVisible;
  };

  const getPickupAddr = () => {
    var pickupAddr = null;
    switch (travelType) {
      case "1":
      case "3":
        pickupAddr = rideSummaryData.pickupPhysicalAddress;
        break;
      case "2":
        const isFromAirport =
          tripType == "Ride from the airport(round trip)" ||
          "Ride from the airport(one way)";
        const isToAirport =
          tripType == "Ride to the airport(round trip)" ||
          "Ride to the airport(one way)";
        pickupAddr = isFromAirport
          ? rideSummaryData.airPort
          : isToAirport
          ? rideSummaryData.hotel
          : null;
      default:
        break;
    }
    return pickupAddr;
  };

  const getDropoffAddr = () => {
    var dropoffAddr = null;
    switch (travelType) {
      case "1":
      case "3":
        dropoffAddr = rideSummaryData.dropoffPhysicalAddress;
        break;
      case "2":
        const isFromAirport =
          tripType == "Ride from the airport(round trip)" ||
          "Ride from the airport(one way)";
        const isToAirport =
          tripType == "Ride to the airport(round trip)" ||
          "Ride to the airport(one way)";
        dropoffAddr = isFromAirport
          ? rideSummaryData.hotel
          : isToAirport
          ? rideSummaryData.airPort
          : null;
      default:
        break;
    }
    return dropoffAddr;
  };

  const generateSummaryData = () => {
    const summaryDataTemp = [
      { label: "Trip type- ", value: tripType, isVisible: true },
      {
        label: "Pickup addr.",
        value: getPickupAddr(),
        isVisible: true,
      },
      {
        label: "Dropoff addr.",
        value: getDropoffAddr(),
        isVisible: true,
      },
      {
        label: "Return Pickup addr.",
        value: getDropoffAddr(),
        isVisible: isReturnAddrVisible(),
      },
      {
        label: "Return Dropoff addr.",
        value: getPickupAddr(),
        isVisible: isReturnAddrVisible(),
      },
      {
        label: "Hour",
        value: rideSummaryData?.hour,
        isVisible: isHourlyTravel,
      },
      {
        label: "Airport",
        value: rideSummaryData?.airPort,
        isVisible: isAirportTravel,
      },
      {
        label: "Hotel",
        value: rideSummaryData?.hotel,
        isVisible: isAirportTravel,
      },
    ];
    return summaryDataTemp;
  };
  const Field = ({ label, value }) => (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      padding={0.5}
      backgroundColor={"#EEE"}
    >
      <RSTypography txtcolor={theme.palette.info.light}>{label}</RSTypography>
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
        <Grid container spacing={2}>
          <Grid item xs={12}></Grid>
        </Grid>
        <Stack direction={"column"} spacing={2}>
          {[
            ...generateSummaryData(),
            ...vehicleSummaryData,
            ...tripSummaryData,
            ...contactSummaryData,
          ].map(
            (field, index) =>
              field?.isVisible && (
                <Field key={index} label={field.label} value={field.value} />
              )
          )}
          <Field key={12121} label={"Money"} value={cost} />
        </Stack>
      </Box>
    </Box>
  );
}

export default StepSummary;
