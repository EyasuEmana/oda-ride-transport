import React, { useEffect } from "react";
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
import Auth from "./component/auth";
import { setIsAuthenticated } from "../../store/reducers/authReducer";

function Index() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.authReducer);
  const serviceCardData = [
    { id: 1, imgUrl: car, text: "Transport Description will fall here ..." },
    {
      id: 2,
      imgUrl: plane,
      text: "Transport Description will fall here ...",
    },
    {
      id: 3,
      imgUrl: clock,
      text: "Transport Description will fall here ...",
    },
  ];

  useEffect(() => {
    dispatch(setIsAuthenticated());
  }, []);
  if (isAuthenticated) {
    navigate("/home/1");
  }
  const checkSessionExpiration = () => {
    const sessionExpiration = sessionStorage.getItem("session_expiration");
    const currentTime = new Date().getTime();
    // console.log("sessionExpiration:", sessionExpiration);
    // console.log("Parsed sessionExpiration:", parseInt(sessionExpiration, 10));
    // console.log("Current time:", currentTime);

    if (
      sessionExpiration &&
      parseInt(currentTime, 10) > parseInt(sessionExpiration, 10)
    ) {
      // sessionStorage.removeItem("access_token");
      // sessionStorage.removeItem("session_expiration");
      // navigate("/");
    }
  };
  useEffect(() => {
    checkSessionExpiration();
  }, [location]);
  return (
    <Box py={10}>
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
              />
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
