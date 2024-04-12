import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItems from "../../page/UserManagement/DataTable/listItems";
import { Outlet, useLocation } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import logoutIcon  from "../../assets/images/logoutIcon.png";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));
const defaultTheme = createTheme();
const drawerStyle = {
  ".MuiDrawer-paper": {
    backgroundColor: "#F2F2F2",
    marginTop: "5px",
    paddingX: 2,
  },
};
export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const LogoutIcon = () => (
    <img
      src={logoutIcon}
      alg={"profile icon"}
      style={{
        width: "11px",
        marginRight: 4,
      }}
    />
  );
  const logoutIconStyle = {
    backgroundColor: "#FFF",
    color: "#CA0F0D",
    borderRadius: "44px",
    textTransform: "capitalize",
    "&:hover": {
      color: "#CA0F0D",
      backgroundColor: "#FFF",
    },
  };

  const location = useLocation();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <Drawer variant="permanent" open={open} sx={drawerStyle}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [0],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon
                sx={{
                  rotate: open ? "180deg" : "0deg",
                  transition: "0.4s ease-in-out",
                }}
              />
            </IconButton>
          </Toolbar>
          <Divider sx={{ border: "2px solid #FFF" }} />
          <List component="nav" sx={{ height: "100%" }}>
            <Stack
              sx={{ height: "100%", paddingBottom: "24px" }}
              direction="column"
              justifyContent="space-between"
              alignItems="stretch"
            >
              <Box>
                {/* Pass userRoles as a prop to ListItems */}
                <ListItems />
              </Box>
              <Button variant="contained" sx={logoutIconStyle}>
                <LogoutIcon />
                <Link href="/">logout</Link>
              </Button>
            </Stack>
          </List>
        </Drawer>

        <Box
          sx={{
            backgroundColor: "#FFF",
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Container maxWidth="100" sx={{ mt: 2, mb: 4 }}>
            {/* <Grid container spacing={3}>
              <Grid item xs={12}> */}
                {/* Render nested routes */}
                <Outlet />
              {/* </Grid>
            </Grid> */}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
