import React, { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Box, Stack } from "@mui/material";
import RSTypography from "../../../../components/RSTypography";
import axios from "axios";
import { remote_host } from "../../../../globalVariable";
import { authHeader } from "../../../../util/authUtil";

export default function Example(props) {
  const [popularPlaces, setPopularPlaces] = useState();

  const getPopularPlaces = async () => {
    try {
      await axios
        .get(`${remote_host}/api/v1/popular-places/all`, authHeader())
        .then((res) => {
          setPopularPlaces(res.data);
        });
    } catch (e) {}
  };

  useEffect(() => {
    getPopularPlaces();
  }, []);
  return (
    <Carousel
      animation="fade"
      swippe={true}
      duration={1000}
      stopAutoPlayOnHover={true}
      interval={5000}
      indicatorIconButtonProps={{
        color: "#678",
      }}
      sx={{
        height: "100vh",
        indicators: {
          width: "100%",
          marginTop: "3px",
          textAlign: "center",
        },
        indicator: {
          cursor: "pointer",
          transition: "200ms",
          padding: 0,
          color: "#0A2",
          "&:hover": {
            color: "#678",
          },
          "&:active": {
            color: "#324",
          },
        },
        indicatorIcon: {
          fontSize: "15px",
        },
        active: {
          color: "#2378a1",
        },
      }}
    >
      {popularPlaces?.map(({ image, title, description }, i) => (
        <SlideItem
          key={i}
          image={image}
          title={title}
          description={description}
        />
      ))}
    </Carousel>
  );
}

function SlideItem({ image, title, description }) {
  return (
    <Box
      sx={{
        backgroundImage: `url(${image})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "75vh",
      }}
    >
      <Stack
        direction={"column"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        sx={{ height: "100%" }}
      >
        <Box
          sx={{
            backgroundColor: "#000",
            opacity: 0.7,
            width: "100%",
            paddingY: 4,
            paddingX: 2,
          }}
        >
          <center>
            <RSTypography
              fontsize={"35px"}
              fontweight={"500"}
              txtcolor={"#FFF"}
            >
              {title}
            </RSTypography>
            <RSTypography
              fontsize={"20px"}
              fontweight={"300"}
              txtcolor={"#DDD"}
            >
              {description}
            </RSTypography>
          </center>
        </Box>
      </Stack>
    </Box>
  );
}
