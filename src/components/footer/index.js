import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { remote_host } from "../../globalVariable";
function Index() {
  const [footerData, setFooterData] = useState();
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
  const getFooterData = async () => {
    await axios
      .get(`${remote_host}/api/v1/footer-contents`)
      .then((response) => {
        setFooterData(response.data);
      });
  };
  useEffect(() => {
    getFooterData();
  }, []);
  return (
    <Box
      sx={{ padding: 3, backgroundColor: "info.main", marginTop: 3 }}
      id="footer"
    >
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

        <Grid item md={3} xs={12}>
          <RSTypography txtcolor={white} fontsize={"18px"}>
            Contact Us
          </RSTypography>
          <RSTypography txtcolor={white} fontsize={"15px"}>
            {footerData?.addressState}
            {/* California, USA */}
          </RSTypography>

          <RSTypography txtcolor={white} fontsize={"15px"}>
            ZIP: {footerData?.addressZipCode}
            {/* ZIP: 96162 */}
          </RSTypography>
          <RSTypography txtcolor={white} fontsize={"15px"}>
            mail: {footerData?.contactEmail}
            {/* mail: info@odatransportation.com */}
          </RSTypography>
          <RSTypography txtcolor={white} fontsize={"15px"}>
            tel: {footerData?.contactPhoneNumber}
            {/* tel: 714-313-4269 or 1-800-714-4992 */}
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
