import React, { useEffect, useState } from "react";
import { Box, Grid, Divider, Stack, IconButton } from "@mui/material";
import RSTypography from "../RSTypography";
import { useTheme } from "@emotion/react";
import { FaTelegram } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import axios from "axios";
import { remote_host } from "../../globalVariable";
import { useSelector, useDispatch } from "react-redux";
import { getFooterData } from "../../store/actions/footerAction";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="white"
      align="center"
      {...props}
    >


      {new Date().getFullYear()}
         
    </Typography>
  );
}



function Index() {
  const theme = useTheme();
  const [socialMedias, setSocialMedias] = useState();
  const { contactEmail, contactPhoneNumber, addressZipCode, addressState } =
    useSelector((state) => state.footerReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const white = theme.palette.text.main;


  const getSocialMediaLinks = async () => {
    await axios
      .get(`${remote_host}/api/v1/social-medias`)
      .then((res) => setSocialMedias(res.data));
  };
  useEffect(() => {
    getSocialMediaLinks();
    dispatch(getFooterData());
  }, []);

  const isSocialMedia = (title, titleName) => {
    return title.toLowerCase().includes(titleName);
  };

  const getIcon = (title) => {
    if (isSocialMedia(title, "facebook")) {
      return <FiFacebook color="white" size={18} />;
    } else if (isSocialMedia(title, "twitter")) {
      return <RiTwitterXLine color="white" size={18} />;
    } else if (isSocialMedia(title, "telegram")) {
      return <FaTelegram color="white" size={18} />;
    } else if (isSocialMedia(title, "instagram")) {
      return <FaInstagram color="white" size={18} />;
    } else if (isSocialMedia(title, "pinterest")) {
      return <FaPinterest color="white" size={18} />;
    }
  };

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
            onClick={() => navigate("/privacy-policy")}
          >
            Privacy Policy
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

        <Grid item md={3} xs={6}>
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

        <Grid item md={3} xs={6}>
          <RSTypography txtcolor={white} fontsize={"18px"}>
            Our Partners
          </RSTypography>
          <RSTypography
            txtcolor={white}
            fontsize={"15px"}
            style={{ cursor: "pointer" }}
            onClick={() => window.open("https://www.olittech.com", "_blank")}>
            Olit Technologies
          </RSTypography>
        </Grid>
      </Grid>
      <Box>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Box>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <Box>
                <RSTypography fontsize={"15px"} txtcolor={white}>
                  Get in touch |
                </RSTypography>
              </Box>

              <Stack spacing={1} direction={"row"} alignItems={"center"}>
                {socialMedias?.map(({ link, title }) => {
                  return (
                    <IconButton
                      key={title}
                      component="a"
                      href={link}
                      target="_blank"
                      sx={{
                        border: "1px solid #FFF",
                        "&:hover": { border: "1px solid #CCC" },
                      }}
                    >
                      {getIcon(title)}
                    </IconButton>
                  );
                })}
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
          Copyright © {new Date().getFullYear()} Oda Transportation service. All rights reserved!
        </RSTypography>
      </Box>
    </Box >
  );
}

export default Index;
