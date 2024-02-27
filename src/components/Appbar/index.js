import React, { useState } from "react";
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
  ListItemButton,
  IconButton,
  Toolbar,
} from "@mui/material";
import { TiThMenuOutline } from "react-icons/ti";
import logo from "../../assets/images/Odaa Transportation - Logo-01.svg";
import RSButton from "../RSButton";
import { Link, scroller } from "react-scroll";

const categories = ["Home", "About Us", "Contact Us", "FAQ"];

function Header() {
  const [value, setValue] = useState(0);
  const [activeButton, setActiveButton] = useState(1);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const handleActiveButton = (active) => {
    setActiveButton(active);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: "#FFF",
    height: "auto",
    position: "sticky",
    justifyContent: "center",
    alignItems: "space-between",
    paddingTop: 8,
    paddingBottom: 8,
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

  return (
    <Box>
      <StyledAppBar>
        <Toolbar
          sx={{
            paddingX: "42px",
            marginLeft: 0,
          }}
        >
          <Stack
            spacing={"60px"}
            direction={"row"}
            alignItems={"center"}
            sx={{ flexGrow: 1 }}
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
                {categories.map((page, index) => (
                  <StyledTab
                    label={page}
                    key={page}
                    onClick={() => scrollToSection(`section${index + 1}`)}
                  />
                ))}
              </StyledTabs>
            )}
          </Stack>
          <Stack
            direction="row"
            justifyContent={"center"}
            alignItems={"center"}
            spacing={"15px"}
          >
            <RSButton
              borderradius={"5px"}
              variant="contained"
              backgroundcolor={"#4D4C4C"}
            >
              Login / SignUp
            </RSButton>
          </Stack>
        </Toolbar>
      </StyledAppBar>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <List>
          {["Home", "About Us", "Contact Us", "FAQ"].map((key) => (
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
    </Box>
  );
}
export default Header;
