import React from "react";
import { Box, Stack, Grid } from "@mui/material";
import ServiceCard from "./component/serviceCard/index";
import car from "../../assets/images/car.png";
import plane from "../../assets/images/plane.png";
import clock from "../../assets/images/clock.png";
import RSTypography from "../../components/RSTypography";
import RSButton from "../../components/RSButton";
import { MdOutlineSend } from "react-icons/md";
import Auth from "./component/auth";
function Index() {
  const serviceCardData = [
    { id: 1, imgUrl: car, text: "Non-airport service from your deer to thirs" },
    {
      id: 2,
      imgUrl: plane,
      text: "Non-airport service from your deer to thirs",
    },
    {
      id: 3,
      imgUrl: clock,
      text: "Non-airport service from your deer to thirs",
    },
  ];
  return (
    <Box py={10}>
      <Grid
        container
        alignItems={"flex-start"}
        justifyContent={"center"}
        spacing={5}
      >
        <Grid item xs={5}>
          <Stack direction={"column"} spacing={3}>
            <RSTypography fontsize={"25px"} fontweight={"500"}>
              "Discover the safest and most customer-friendly ride system in our
              city!"
            </RSTypography>

            <RSButton
              sx={{ width: 200 }}
              backgroundcolor={"#FF0013"}
              txtcolor={"#FFF"}
            >
              Unlock your ride
              <MdOutlineSend style={{ marginLeft: 5 }} size={20} />
            </RSButton>
          </Stack>
        </Grid>

        <Grid item xs={5}>
          <Stack direction={"column"} spacing={2}>
            {serviceCardData.map((service) => (
              <ServiceCard imgUrl={service.imgUrl} text={service.text} id={service.id}/>
            ))}
          </Stack>
        </Grid>
        <Grid item container xs={10} justifyContent={"center"}>
          <Auth />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Index;
