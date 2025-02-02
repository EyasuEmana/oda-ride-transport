import React, { useState, useEffect } from "react";
import {
  AppBar,
  Stack,
  styled,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
  Drawer,
  Box,
  List,
  ListItem,
  Avatar,
  ListItemButton,
  IconButton,
  Menu,
  Typography,
  MenuItem,
  Toolbar,
} from "@mui/material";
import { TiThMenuOutline } from "react-icons/ti";
import logo from "../../assets/images/Odaa Transportation - Logo-01.svg";
import { useDispatch } from "react-redux";
import RSButton from "../RSButton";
import { Link, scroller } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout, setIsAuthenticated } from "../../store/reducers/authReducer";
import ChangePasswordDrawer from "./ChangePassword";
import { useLocation } from "react-router-dom";
import { getUserRole } from "../../util/authUtil";
const publicNavbarMenus = [
  { title: "Home", link: "/", scrollLink: "home" },
  { title: "About Us", link: "/about-us", scrollLink: "aboutus" },
  { title: "Contact Us", link: "/contact-us", scrollLink: "footer" },
  { title: "FAQ", link: "/faq", scrollLink: "faq" },
  { title: "Book now", link: "/home/1", scroll: "nowhere" },
];
const authNavbarMenus = [
  { title: "Book now", link: "/home/1" },
  { title: "My Order", link: "/my-order" },
];

function Header({ handleUsernameFocus }) {
  const [value, setValue] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [openChangePasswordPopup, setOpenChangePasswordPopup] =
    React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { isSigninSuccess, isAuthenticated } = useSelector(
    (state) => state.authReducer
  );

  const dispatch = useDispatch();
  const location = useLocation();
  const theme = useTheme();
  const navigate = useNavigate();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const StyledTabs = styled(Tabs)({
    "& .MuiTabs-indicator": {
      display: "none",
    },
  });

  const StyledTab = styled(Tab)(({ theme }) => ({
    textTransform: "capitalize",
    color: theme.palette.black.main,
    fontWeight: 500,
    fontSize: "15px",
    "&.Mui-selected": {
      color: theme.palette.light.main,
      backgroundColor: theme.palette.info.main,
      borderRadius: 5,
    },
  }));

  const scrollToSection = (sectionId) => {
    navigate("/");
    scroller.scrollTo(sectionId, {
      smooth: true,
      duration: 300,
      offset: -100,
    });
  };

  const getNavbarMenu = () => {
    return isAuthenticated
      ? getUserRole() === "user"
        ? authNavbarMenus
        : []
      : publicNavbarMenus;
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = (e) => {
    handleCloseUserMenu(e);
    dispatch(logout());
    navigate("/");
  };

  const handleClickOpen = () => {
    setOpenChangePasswordPopup(true);
  };

  const handleChangePassword = () => {
    handleClickOpen();
  };
  useEffect(() => {
    dispatch(setIsAuthenticated());
  }, [isSigninSuccess]);

  useEffect(() => {
    switch (location.pathname) {
      case "/home/1":
      case "/home/2":
      case "/home/3":
        setValue(0);
        break;
      case "/my-order":
        setValue(1);
        break;
      default:
        break;
    }
  }, [location]);

  return (
    <AppBar
      sx={{
        backgroundColor: "#FFF",
        height: "auto",
        position: "sticky",
        justifyContent: "center",
        alignItems: "space-between",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          paddingX: "42px",
          marginLeft: 0,
        }}
      >
        <Stack
          spacing={"60px"}
          direction={"row"}
          alignItems={"center"}
          sx={{ flexGrow: 1, display: { xs: "flex" } }}
        >
          <img
            style={{
              width: "100px",
              height: "70px",
              left: "0px",
              cursor: "pointer",
            }}
            alt="logo "
            src={logo}
            onClick={() => navigate("/")}
          />
          {isMatch ? (
            <IconButton onClick={() => setOpen(true)}>
              <TiThMenuOutline color={theme.palette.info.main} />
            </IconButton>
          ) : (
            <StyledTabs
              sx={{ marginLeft: "0px" }}
              value={value}
              onChange={(e, value) => {
                setValue(value);
              }}
            >
              {getNavbarMenu().map((menu, index) => (
                <StyledTab
                  label={menu.title}
                  key={menu.title}
                  onClick={() => {
                    if (isAuthenticated) {
                      navigate(menu.link);
                    } else {
                      if (menu.title === "Book now") navigate(menu.link);
                      else scrollToSection(menu.scrollLink);
                    }
                  }}
                />
              ))}
            </StyledTabs>
          )}
        </Stack>

        <Box sx={{ flexGrow: 0 }}>
          {isAuthenticated ? (
            <Box>
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar
                  alt="Remy Sharp"
                  // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZCldKgmO2Hs0UGk6nRClAjATKoF9x2liYYA&s"
                  sx={{ width: 56, height: 56 }}
                />
              </IconButton>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key={2} onClick={handleChangePassword}>
                  <Typography textAlign="center">Change Password</Typography>
                </MenuItem>
                <MenuItem key={2} onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <RSButton
              borderradius={"5px"}
              variant="contained"
              backgroundcolor={"#4D4C4C"}
              onClick={() => {
                scrollToSection("auth");
                handleUsernameFocus();
              }}
            >
              Login/SignUp
            </RSButton>
          )}
        </Box>
      </Toolbar>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <List>
          {getNavbarMenu().map((menu, key) => (
            <ListItem key={menu.link}>
              <ListItemButton>
                <Link
                  onClick={() => {
                    if (isAuthenticated) {
                      navigate(menu.link);
                    } else {
                      scrollToSection(menu.scrollLink);
                    }
                  }}
                  smooth={true}
                  duration={500}
                  spy={true}
                  offset={-50}
                >
                  <RSButton
                    backgroundcolor={"#171414"}
                    txtcolor={"#FFF"}
                    fontSize={16}
                    fontWeight={700}
                  >
                    {menu.title}
                  </RSButton>
                </Link>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <ChangePasswordDrawer
        setOpenChangePasswordPopup={setOpenChangePasswordPopup}
        openChangePasswordPopup={openChangePasswordPopup}
      />
    </AppBar>
  );
}
export default Header;
