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
  screenType,
}) {
  const theme = useTheme();
  const location = useLocation();
  const tripType = rideSummaryData.tripType;
  var travelType = location.pathname.split("/").pop();
  const isPointToPointTravel = travelType == "2";
  const isAirportTravel = travelType == "1";
  const isHourlyTravel = travelType == "3";
  const { fee, totalFee } = useSelector((state) => state.bookReducer);

  const isRoundTrip = () => {
    return (
      tripType == "Round-Trip" ||
      tripType == "Ride to the airport(round trip)" ||
      tripType == "Ride from the airport(round trip)"
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
      case "2":
      case "3":
        pickupAddr = rideSummaryData.pickupPhysicalAddress;
        break;
      case "1":
        const isFromAirport =
          tripType == "Ride from the airport(round trip)" ||
          "Ride from the airport(one way)";
        const isToAirport =
          tripType == "Ride to the airport(round trip)" ||
          "Ride to the airport(one way)";
        pickupAddr = isFromAirport
          ? rideSummaryData.airPortId
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
      case "2":
      case "3":
        dropoffAddr = rideSummaryData.dropoffPhysicalAddress;
        break;
      case "1":
        const isFromAirport =
          tripType == "Ride from the airport(round trip)" ||
          "Ride from the airport(one way)";
        const isToAirport =
          tripType == "Ride to the airport(round trip)" ||
          "Ride to the airport(one way)";
        dropoffAddr = isFromAirport
          ? rideSummaryData.hotel
          : isToAirport
            ? rideSummaryData.airPortId
            : null;
      default:
        break;
    }
    return dropoffAddr;
  };

  const generateSummaryData = () => {
    const summaryDataTemp = [
      { label: "Trip type- ", value: tripType, isVisible: !isHourlyTravel },
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
        value: rideSummaryData?.airPortId,
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
        {screenType == "large" ? (
          <Grid container spacing={2}>
            {[
              // ...generateSummaryData(),
              ...vehicleSummaryData,
              ...tripSummaryData,
              ...contactSummaryData,
            ].map(
              (field, index) =>
                field?.isVisible && (
                  <Grid item xs={12} md={6}>
                    <Field
                      key={field.value}
                      label={field.label}
                      value={field.value}
                    />
                  </Grid>
                )
            )}
          </Grid>
        ) : (
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
            <Field
              key={"fee"}
              label={"Service Fee"}
              value={"$" + totalFee.toFixed(2)}
            />
          </Stack>
        )}
      </Box>
    </Box>
  );
}

StepSummary.defaultProperty = {
  screenType: "small",
};
export default StepSummary;
