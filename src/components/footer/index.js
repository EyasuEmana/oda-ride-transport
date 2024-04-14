import React from "react";
import {
  Box,
  Grid,
  Button,
  Divider,
  Stack,
  TextField,
  useMediaQuery,
} from "@mui/material";
import RSTypography from "../RSTypography";
import { useTheme } from "@emotion/react";
import twitter from "../../assets/images/twitter.png";
import instagram from "../../assets/images/instagram.png";
import facebook from "../../assets/images/facebook.png";
import slack from "../../assets/images/slack.png";
function Index() {
  const theme = useTheme();
  const white = theme.palette.text.main;
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const SocalMediaIcon = ({ url }) => (
    <img
      src={url}
      alt="social media"
      style={{ width: "24px", height: "24px" }}
    />
  );
  return (
    <Box sx={{ padding: 3, backgroundColor: "info.main", marginTop: 3 }}>
      <Grid
        container
        justifyContent={{ xs: "start", md: "center" }}
        mb={3}
        spacing={2}
      >
        <Grid item md={2} xs={6}>
          <RSTypography txtcolor={white} fontsize={"18px"}>
            About Us
          </RSTypography>
          <RSTypography txtcolor={white} fontsize={"15px"}>
            Trust and safety
          </RSTypography>
          <RSTypography txtcolor={white} fontsize={"15px"}>
            Help and support
          </RSTypography>
          <RSTypography txtcolor={white} fontsize={"15px"}>
            Terms and conditions
          </RSTypography>
          <RSTypography txtcolor={white} fontsize={"15px"}>
            About Us
          </RSTypography>
        </Grid>

        <Grid item md={2} xs={6}>
          <RSTypography txtcolor={white} fontsize={"18px"}>
            Contact Us
          </RSTypography>
          <RSTypography txtcolor={white} fontsize={"15px"}>
            California, USA
          </RSTypography>
          <RSTypography txtcolor={white} fontsize={"15px"}>
            Bemidji
          </RSTypography>
          <RSTypography txtcolor={white} fontsize={"15px"}>
            ZIP: 56146
          </RSTypography>
          <RSTypography txtcolor={white} fontsize={"15px"}>
            powered by Oda Transport
          </RSTypography>
        </Grid>

        <Grid item md={1.5} xs={6}>
          <RSTypography txtcolor={white} fontsize={"18px"}>
            Explore
          </RSTypography>
          <RSTypography txtcolor={white} fontsize={"15px"}>
            What we do
          </RSTypography>
          <RSTypography txtcolor={white} fontsize={"15px"}>
            Oda Transportation
          </RSTypography>
        </Grid>
      </Grid>
      <Box>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Box>
            <Stack direction={"row"} spacing={2}>
              <Box>
                <RSTypography fontsize={"15px"} txtcolor={white}>
                  Get in touch |
                </RSTypography>
              </Box>

              <Stack spacing={1} direction={"row"}>
                <SocalMediaIcon url={twitter} />
                <SocalMediaIcon url={instagram} />
                <SocalMediaIcon url={facebook} />
              </Stack>
            </Stack>
          </Box>
        </Grid>
      </Box>
      <Divider
        sx={{ borderColor: "text.main", borderWidth: "1px", marginY: 2 }}
      />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <RSTypography txtcolor={white}>
          © Oda Transportation service. All rights reserved!
        </RSTypography>
      </Box>
    </Box>
  );
}

export default Index;
