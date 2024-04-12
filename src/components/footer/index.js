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
      <Grid container justifyContent={"center"} mb={3}>
        <Grid item xs={1.5}>
          <RSTypography txtcolor={white} fontsize={"18px"}>
            Explore
          </RSTypography>
          <RSTypography txtcolor={white} fontsize={"15px"}>
            What we do
          </RSTypography>
          <RSTypography txtcolor={white} fontsize={"15px"}>
            Ride Transport
          </RSTypography>
        </Grid>

        <Grid item xs={2}>
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
          <RSTypography txtcolor={white} fontsize={"15px"}>
            User Management
          </RSTypography>

        </Grid>

        <Grid item xs={2}>
          <RSTypography txtcolor={white} fontsize={"18px"}>
          Minnesota, USA
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
      </Grid>
      <Box>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Grid item>
            <Box
              sx={{
                boxSizing: "border-box",
                position: "relative",
                width: isMatch ? "325px" : "425px",
                height: "70px",
                border: "3px solid #FFFFFF",
                borderRadius: "35px",
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems={"center"}
              >
                <TextField
                  variant="standard"
                  margin="normal"
                  marginLeft={2}
                  id="email"
                  name="email"
                  fullWidth
                  autoComplete="email"
                  placeholder="Email address"
                  InputProps={{
                    style: {
                      marginLeft: 10,
                      color: "#FFF",
                      fontSize: "20px",
                    },
                    disableUnderline: true,
                  }}
                />
                <Button
                  sx={{
                    boxSizing: "border-box",
                    width: "89px",
                    height: "57px",
                    marginTop: 0.5,
                    marginRight: 0.5,
                    background: "#FFFFFF",
                    border: "4px solid #FFFFFF",
                    color: "info.main",
                    borderRadius: "0px 35px 35px 0px",
                    " &:hover": {
                      borderColor: "#00adef",
                      border: "4px solid #FFFFFF",
                      color: "#FFF",
                    },
                  }}
                >
                  Send
                </Button>
              </Stack>
            </Box>
          </Grid>

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
                <SocalMediaIcon url={slack} />
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
        © Oda Transportation Ride service. All rights reserved!
        </RSTypography>
      </Box>
    </Box>
  );
}

export default Index;
