import React from "react";
import { Box, useMediaQuery, Stack } from "@mui/material";
import RSTypography from "../../../../components/RSTypography";
import RSButton from "../../../../components/RSButton";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link, scroller } from "react-scroll";
function Index({ imgUrl, text, id, handleUsernameFocus }) {
  const theme = useTheme();
  const { isAuthenticated } = useSelector((state) => state.authReducer);

  const navigate = useNavigate();
  const Logo = () => (
    <img
      style={{
        width: "76px",
        height: "70px",
      }}
      alt="logo "
      src={imgUrl}
    />
  );
  const matchBelowMd = useMediaQuery(theme.breakpoints.down("1239"));
  return (
    <Box>
      <Stack direction={"row"} alignItems={"center"}>
        {
          <Box
            sx={{
              backgroundColor: "#B2AAAA",
              padding: 1,
              display: matchBelowMd && "none",
            }}
          >
            <Logo />
          </Box>
        }
        <Box sx={{ backgroundColor: "#D9D9D9", padding: 2 }}>
          <Stack direction={"row"} justifyContent={"center"} spacing={1}>
            <RSTypography>{text}</RSTypography>
            <RSButton
              backgroundcolor={theme.palette.info.main}
              radius={5}
              onClick={() => {
                navigate(`/home/${id}`);
                // if (isAuthenticated) navigate(`/home/${id}`);
                // else {
                //   scroller.scrollTo("auth", {
                //     smooth: true,
                //     duration: 300,
                //     offset: -50,
                //   });
                //   handleUsernameFocus();
                // }
              }}
              //
            >
              Book
            </RSButton>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default Index;
