import React, { useState } from "react";
import {
  AppBar,
  Stack,
  styled,
  Tabs,
  Tab,
  useMediaQuery,
  Container,
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
import RSButton from "../RSButton";
import { Link, scroller } from "react-scroll";
import { useNavigate } from "react-router-dom";
const publicNavbarMenus = [
  { title: "Home", link: "/" },
  { title: "About Us", link: "/about-us" },
  { title: "Contact Us", link: "/contact-us" },
  { title: "FAQ", link: "/faq" },
];
const authNavbarMenus = [
  { title: "Home", link: "/" },
  { title: "My Order", link: "/my-order" },
];

function Header() {
  const [value, setValue] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const theme = useTheme();
  const navigate = useNavigate();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const isLoggedin = true;
  const StyledAppBar = styled(AppBar)(({ theme }) => ({
    theme,
    backgroundColor: "#FFF",
    height: "auto",
    position: "sticky",
    justifyContent: "center",
    alignItems: "space-between",

    boxShadow: 0,
  }));
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
    scroller.scrollTo(sectionId, {
      smooth: true,
      duration: 500,
      offset: -50,
    });
  };
  const getNavbarMenu = () => {
    return isLoggedin ? authNavbarMenus : publicNavbarMenus;
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
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
              width: "107px",
              height: "74px",
              left: "0px",
            }}
            alt="logo "
            src={logo}
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
                    scrollToSection(`section${index + 1}`);
                    navigate(menu.link);
                  }}
                />
              ))}
            </StyledTabs>
          )}
        </Stack>

        <Box sx={{ flexGrow: 0 }}>
          {isLoggedin ? (
            <Box>
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar
                  alt="Remy Sharp"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZCldKgmO2Hs0UGk6nRClAjATKoF9x2liYYA&s"
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
                {["Setting", "Logout"].map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <RSButton
              borderradius={"5px"}
              variant="contained"
              backgroundcolor={"#4D4C4C"}
            >
              Login / SignUp
            </RSButton>
          )}
        </Box>
      </Toolbar>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <List>
          {getNavbarMenu().map((key) => (
            <ListItem key={key}>
              <ListItemButton>
                <Link
                  to="section1"
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
                    {key}
                  </RSButton>
                </Link>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
}
export default Header;
