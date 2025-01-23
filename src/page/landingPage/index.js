import React, { useEffect, useRef, useState } from "react";
import { Box, Stack, Grid, Container } from "@mui/material";
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
import { motion } from "framer-motion";
import Slider from "./component/slider/index";
function Index({ usernameFocus, handleUsernameFocus, setUsernameFocus }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const serviceCardData = [
    {
      id: 1,
      imgUrl: plane,
      delay: 0,
      text: "Airport pickup & drop off Service",
    },
    {
      id: 2,
      imgUrl: car,
      delay: 0.3,
      text: "Ponit to Point Service ",
    },
    {
      id: 3,
      imgUrl: clock,
      delay: 0.6,
      text: "Hourly Charter Service",
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
    <Box paddingBottom={10} id="home">
      <Slider />
        <Grid
          container
          alignItems={"center"}
          justifyContent={"center"}
          spacing={{ xs: 2, sm: 3, md: 5 }}
          sx={{
            mt: { 
              xs: -4,
              sm: -1,  // Changed from -1 to -8 for better positioning on tablets
              md: -25
            },
            position: 'relative',
            zIndex: 1
          }}
        >
          <Grid 
            item 
            xs={12}
            sm={10}
            md={6}
            lg={5}
            xl={4}
            sx={{
              maxHeight: { 
                xs: '50vh', 
                sm: '55vh',  // Adjusted for tablets
                md: '60vh' 
              },
              minHeight: {  // Added minimum height
                xs: '300px',
                sm: '400px',
                md: '500px'
              },
              overflow: 'auto',
              mb: { 
                xs: 4, 
                sm: 5,  // Adjusted spacing
                md: 8 
              },
              position: 'relative',
              backdropFilter: 'blur(5px)',  // Added for better visibility
              backgroundColor: 'rgba(255, 255, 255, 0.8)',  // Semi-transparent background
              borderRadius: 2,
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -20,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60%',
                height: '4px',
                background: 'linear-gradient(90deg, transparent, #888, transparent)',
                borderRadius: '2px',
              },
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-track': {
                background: '#f1f1f1',
                borderRadius: '10px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#888',
                borderRadius: '10px',
                '&:hover': {
                  background: '#555',
                },
              },
            }}
          >
            <Stack 
              direction={"column"} 
              spacing={{ xs: 2, sm: 2.5, md: 4 }}  // Adjusted spacing
              alignItems={"center"}
              sx={{ 
                px: { xs: 1, sm: 2, md: 3 },
                py: { xs: 2, sm: 3, md: 3 },  // Added responsive padding
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)',
                  borderRadius: 2,
                  zIndex: -1,
                },
              }}
            >
              {serviceCardData.map((service) => (
                <ServiceCard
                  key={service.id}
                  imgUrl={service.imgUrl}
                  text={service.text}
                  id={service.id}
                  delay={service.delay}
                />
              ))}
            </Stack>
          </Grid>
          <Grid item container xs={10} justifyContent={"center"} id="auth">
            <Auth usernameFocus={usernameFocus} />
          </Grid>
          <AboutUs />
          <Grid item container xs={11} justifyContent={"center"}>
            <Faq />
          </Grid>
        </Grid>
    </Box>
  );
}

export default Index;
