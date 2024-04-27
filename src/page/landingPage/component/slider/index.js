import React from "react";
import Carousel from "react-material-ui-carousel";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Box, Stack, Typography } from "@mui/material";
import RSTypography from "../../../../components/RSTypography";
export default function Example(props) {
  var items = [
    {
      imgUrl: "https://watermark.lovepik.com/photo/40194/0673.jpg_wh1200.jpg",
      title: "The Grand Canyon",
      description:
        "Explore the awe-inspiring beauty of one of the world's most iconic natural wonders, The Grand Canyon.",
    },
    {
      imgUrl:
        "https://thumbs.dreamstime.com/b/container-truck-ship-port-freight-cargo-plane-transpo-transport-import-export-commercial-logistic-shipping-business-61432246.jpg",
      title: "Times Square, New York City",
      description:
        "Immerse yourself in the vibrant energy of Times Square, the bustling heart of New York City.",
    },
  ];

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
      {items.map(({ imgUrl, title, description }, i) => (
        <SlideItem
          key={i}
          imgUrl={imgUrl}
          title={title}
          description={description}
        />
      ))}
    </Carousel>
  );
}

function SlideItem({ imgUrl, title, description }) {
  return (
    <Box
      sx={{
        backgroundImage: `url(${imgUrl})`,
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
