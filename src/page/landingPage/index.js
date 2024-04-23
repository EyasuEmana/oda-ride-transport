import React, { useEffect, useRef, useState } from "react";
import { Box, Stack, Grid } from "@mui/material";
import ServiceCard from "./component/serviceCard/index";
import car from "../../assets/images/car.png";
import plane from "../../assets/images/plane.png";
import clock from "../../assets/images/clock.png";
import RSTypography from "../../components/RSTypography";
import RSButton from "../../components/RSButton";
import { MdOutlineSend } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Faq from "./component/FAQ";
import AboutUs from "./component/about_us";
import Auth from "./component/auth";
import { setIsAuthenticated } from "../../store/reducers/authReducer";

function Index({ usernameFocus, handleUsernameFocus, setUsernameFocus }) {
  const { isAuthenticated } = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const serviceCardData = [
    {
      id: 1,
      imgUrl: car,
      text: "From doorstep to destination, we cater to your needs, everywhere and anytime.",
    },
    {
      id: 2,
      imgUrl: plane,
      text: "Reserve transportation to and from the airport in advance for tranquility.",
    },
    {
      id: 3,
      imgUrl: clock,
      text: "We're here for you, for as long as you require. Accessible within your locality.",
    },
  ];

  useEffect(() => {
    dispatch(setIsAuthenticated());
  }, []);

  useEffect(() => {
    return () => {
      setUsernameFocus(false);
    };
  }, []);

  return (
    <Box py={10} id="home">
      <Grid
        container
        alignItems={"flex-start"}
        justifyContent={"center"}
        spacing={5}
      >
        <Grid item md={5} xs={11}>
          <Stack direction={"column"} spacing={3}>
            <RSTypography fontsize={"25px"} fontweight={"500"}>
              "Discover the safest and most customer-friendly ride system in our
              city!"
            </RSTypography>
            <RSButton
              sx={{ width: 200 }}
              backgroundcolor={"#FF0013"}
              txtcolor={"#FFF"}
              onClick={() => {
                navigate(`/home/1`);
              }}
            >
              Unlock your ride
              <MdOutlineSend style={{ marginLeft: 5 }} size={20} />
            </RSButton>
          </Stack>
        </Grid>
        <Grid item md={5} xs={11}>
          <Stack direction={"column"} spacing={2} alignItems={"center"}>
            {serviceCardData.map((service) => (
              <ServiceCard
                imgUrl={service.imgUrl}
                text={service.text}
                id={service.id}
                handleUsernameFocus={handleUsernameFocus}
              />
            ))}
          </Stack>
        </Grid>
        <Grid item container xs={10} justifyContent={"center"} id="auth">
          <Auth usernameFocus={usernameFocus} />
        </Grid>
        {/* <AboutUs /> */}
        <Grid item container xs={11} justifyContent={"center"}>
          <Faq />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Index;
