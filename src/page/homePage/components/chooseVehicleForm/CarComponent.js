import React from "react";
import {
  Box,
  Grid,
  Stack,
  useTheme,
  Badge,
  useMediaQuery,
} from "@mui/material";
import RSTypography from "../../../../components/RSTypography";
import RSButton from "../../../../components/RSButton";
import { BsPeople } from "react-icons/bs";
import { PiSuitcaseDuotone } from "react-icons/pi";
import { useLocation } from "react-router-dom";

function CarComponent({ carDetail, formik, handleCarSelect }) {
  const {
    carName,
    carImageUrl,
    pricePerMile,
    pricePerHour,
    maxPassengers,
    maxSuitcases,
    isSelected,
  } = carDetail;
  const theme = useTheme();
  const location = useLocation();
  var travelType = location.pathname.split("/").pop();
  const matchSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const CarImg = () => {
    return (
      <img
        style={{ width: "100%", height: "auto", objectFit: "contain" }}
        src={carImageUrl}
      />
    );
  };
  const handleSelect = () => {
    formik.setFieldValue("vehicle", carDetail.carId);
    formik.setFieldValue("vehicleName", carDetail.carName);
    if (travelType == "1" || travelType == "2") {
      formik.setFieldValue("vehicleFee", parseFloat(carDetail.pricePerMile));
    } else if (travelType == "3") {
      formik.setFieldValue("vehicleFee", parseFloat(carDetail.pricePerHour));
    }
    handleCarSelect(carDetail.carId);
  };
  return (
    <Box
      sx={{
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        padding: 1,
        paddingBottom: matchSmallScreen && 4,
      }}
    >
      <Grid container justifyContent={"space-between"}>
        <Grid item md={5.5} xs={12}>
          <CarImg />
        </Grid>

        <Grid item md={6} xs={12}>
          <Stack
            direction="column"
            justifyContent="space-between"
            alignItems="stretch"
            spacing={2}
            sx={{ height: "100%", margin: matchSmallScreen && 2 }}
          >
            <Grid container justifyContent={"space-between"}>
              <Grid item xs={6}>
                <RSTypography
                  fontweight={700}
                  fontsize={"25px"}
                  txtcolor={theme.palette.warning.main}
                >
                  {carName}
                </RSTypography>
              </Grid>
              <Grid item xs={5}>
                <Box>
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Stack direction={"row"} justifyContent={"flex-start"}>
                      <Badge
                        color={theme.palette.info.main}
                        badgeContent={maxPassengers}
                      >
                        <BsPeople size={30} />
                      </Badge>
                    </Stack>
                    <Stack direction={"row"} justifyContent={"flex-end"}>
                      <Badge
                        color={theme.palette.info.main}
                        badgeContent={maxSuitcases}
                      >
                        <PiSuitcaseDuotone size={30} />
                      </Badge>
                    </Stack>
                  </Stack>
                </Box>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={6}>
                <RSTypography fontsize={"25px"}>
                  {travelType == "3" && pricePerHour + "/hr"}
                  {(travelType == "1" || travelType == "2") &&
                    pricePerMile + "/mile"}
                </RSTypography>
              </Grid>
              <Grid item xs={6}>
                {isSelected ? (
                  <RSButton
                    backgroundcolor={"#FF0013"}
                    txtcolor={"#FFF"}
                    sx={{ width: 200 }}
                  >
                    Selected
                  </RSButton>
                ) : (
                  <RSButton
                    sx={{ width: 200 }}
                    variant="outlined"
                    txtcolor={theme.palette.warning.main}
                    bordercolor={theme.palette.warning.main}
                    onClick={handleSelect}
                  >
                    Select
                  </RSButton>
                )}
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CarComponent;
