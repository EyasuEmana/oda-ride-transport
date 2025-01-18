import React, { useEffect } from "react";
import { Box, Divider, Chip, useMediaQuery, useTheme } from "@mui/material";
import Auth from "../../../landingPage/component/auth";
import Signin from "../../../landingPage/component/auth/signin";

import RSButton from "../../../../components/RSButton";
import { useSelector } from "react-redux";
function Index({ setEntryAsGuestOptionPage, formik }) {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("1212"));
  const { isAuthenticated } = useSelector((state) => state.authReducer);
  useEffect(() => {
    if (isAuthenticated) {
      formik.setFieldValue("isGuestBooking", false);
      formik.setFieldValue("entryOptionSelected", true);
      setEntryAsGuestOptionPage(false);
    }
  }, [isAuthenticated]);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: isMatch ? "column" : "row",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          bgcolor: "background.paper",
          color: "text.secondary",
          p: 2,
          my: 4,
          "& svg": {
            m: 1,
          },
          "& hr": {
            mx: 0.5,
          },
        }}
      >
        <Auth />
        <Divider
          orientation={isMatch ? "horizontal" : "vertical"}
          flexItem
          variant="middle"
          sx={{ marginBottom: isMatch ? 2 : 0 }}
        >
          <Chip label="OR" size="small" />
        </Divider>
        <RSButton
          borderradius={"5px"}
          variant="contained"
          backgroundcolor={"#03930A"}
          onClick={() => {
            formik.setFieldValue("isGuestBooking", true);
            formik.setFieldValue("entryOptionSelected", true);
            setEntryAsGuestOptionPage(false);
          }}
          sx={{ padding: 2 }}
          fontSize={14}
        >
          CONTINUE AS GUEST
        </RSButton>
      </Box>
    </Box>
  );
}

export default Index;
