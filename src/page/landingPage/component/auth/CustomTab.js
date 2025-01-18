import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Box, Alert, Snackbar } from "@mui/material";
import Register from "./register";
import Signin from "./signin";
import { useSelector } from "react-redux";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function FullWidthTabs({ usernameFocus }) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openFailSnackbar, setOpenFailSnackbar] = useState(false);

  const {
    isSignupSuccess,
    signUpSuccessMessage,
    signupErrorMessage,
    isSignUpFail,
  } = useSelector((state) => state.authReducer);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const styleTab = {
    "&.MuiTab-root": {
      border: "1px",
      borderStyle: "solid",
      borderColor: theme.palette.info.main,
      color: theme.palette.info.main,
    },
    "&.Mui-selected": {
      backgroundColor: theme.palette.info.main,
      borderWidth: "none",
      color: "#FFF",
    },
  };
  const handleCloseFailSnackbar = () => {
    setOpenFailSnackbar(false);
  };
  const handleCloseSnackbar = () => {
    setOpenSuccessSnackbar(false);
  };
  useEffect(() => {
    if (isSignupSuccess) {
      setOpenSuccessSnackbar(true);
      setValue(0);
    }
  }, [isSignupSuccess]);

  useEffect(() => {
    if (isSignUpFail) {
      setOpenFailSnackbar(true);
    }
  }, [isSignUpFail]);
  return (
    <Box sx={{ width: { xs: "100%", md: 700 } }} >
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width tabs example"
        sx={{
          ".MuiTabs-indicator": {
            display: "none",
          },
        }}
      >
        <Tab label="Signin" sx={styleTab} />
        <Tab label="Register" sx={styleTab} />
      </Tabs>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Signin usernameFocus={usernameFocus} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Register />
        </TabPanel>
      </SwipeableViews>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={openSuccessSnackbar}
        onClose={handleCloseSnackbar}
        key={"bottom" + "left"}
        autoHideDuration={3000}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {signUpSuccessMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={openFailSnackbar}
        onClose={handleCloseFailSnackbar}
        key={"bottom" + "left"}
        autoHideDuration={3000}
      >
        <Alert
          onClose={handleCloseFailSnackbar}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {signupErrorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
