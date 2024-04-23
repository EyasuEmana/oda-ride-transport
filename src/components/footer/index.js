import React, { useEffect, useState } from "react";
import { Box, Grid, Divider, Stack } from "@mui/material";
import RSTypography from "../RSTypography";
import { useTheme } from "@emotion/react";
import twitter from "../../assets/images/twitter.png";
import instagram from "../../assets/images/instagram.png";
import facebook from "../../assets/images/facebook.png";

import axios from "axios";
import { remote_host } from "../../globalVariable";
import { useSelector, useDispatch } from "react-redux";
import { getFooterData } from "../../store/actions/footerAction";
import { useNavigate } from "react-router-dom";
function Index() {
  const theme = useTheme();
  const { contactEmail, contactPhoneNumber, addressZipCode, addressState } =
    useSelector((state) => state.footerReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const white = theme.palette.text.main;
  const SocalMediaIcon = ({ url }) => (
    <img
      src={url}
      alt="social media"
      style={{ width: "24px", height: "24px" }}
    />
  );

  useEffect(() => {
    dispatch(getFooterData());
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
            Useful Links
          </RSTypography>
          <RSTypography
            txtcolor={white}
            fontsize={"15px"}
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/trust-and-safety")}
          >
            Trust and safety
          </RSTypography>
          <RSTypography
            txtcolor={white}
            fontsize={"15px"}
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/terms-and-conditions")}
          >
            Terms and conditions
          </RSTypography>
        </Grid>

        <Grid item md={2} xs={6}>
          <RSTypography txtcolor={white} fontsize={"18px"}>
            Contact Us
          </RSTypography>
          <RSTypography txtcolor={white} fontsize={"15px"}>
            {addressState}
          </RSTypography>
          <RSTypography txtcolor={white} fontsize={"15px"}>
            ZIP: {addressZipCode}
          </RSTypography>
          <RSTypography txtcolor={white} fontsize={"15px"}>
            mail: {contactEmail}
          </RSTypography>
          <RSTypography txtcolor={white} fontsize={"15px"}>
            tel: {contactPhoneNumber}
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
