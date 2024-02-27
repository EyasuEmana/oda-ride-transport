import React from "react";
import { Box, Stack } from "@mui/material";
import RSTypography from "../../../../components/RSTypography";
import RSButton from "../../../../components/RSButton";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";

function Index({ imgUrl, text, id }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const Logo = () => (
    <img
      style={{
        width: "66px",
        height: "58px",
      }}
      alt="logo "
      src={imgUrl}
    />
  );

  return (
    <Box>
      <Stack direction={"row"} alignItems={"center"}>
        <Box sx={{ backgroundColor: "#B2AAAA", padding: 1 }}>
          <Logo />
        </Box>
        <Box sx={{ backgroundColor: "#D9D9D9", padding: 2 }}>
          <Stack direction={"row"} justifyContent={"center"} spacing={1}>
            <RSTypography>{text}</RSTypography>
            <RSButton
              backgroundcolor={theme.palette.info.main}
              radius={5}
              onClick={() => navigate(`/home/${id}`)}
            >
              Book Now
            </RSButton>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default Index;
