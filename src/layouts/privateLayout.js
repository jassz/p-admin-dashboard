import { useState, useCallback } from "react";
import { styled, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CustomTheme from "./../theme/customTheme";
import { useNavigate } from "react-router-dom";
import LeftMenuDrawer from "./leftMenuDrawer";
import { yellow } from "@mui/material/colors";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/images/logo192.png";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const PrivateLayout = ({ children }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(!isMobile);
  const [openNoti, setOpenNoti] = useState(false);
  const [badgeCount, setBadgeCount] = useState();

  const toggleDrawer = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  const toggleDrawerNoti = useCallback(() => {
    setOpenNoti((prevOpenNoti) => {
      if (!prevOpenNoti) {
        setBadgeCount(0); // Reset badge count to 0 when opening notification drawer
      }
      return !prevOpenNoti;
    });
  }, []);

  const navigation = useNavigate();

  const logout = async () => {
    try {
      navigation("/signin");
    } catch (error) {
      console.error("An error occurred:", error.response);
    }
  };

  return (
    <ThemeProvider theme={CustomTheme}>
      <Box sx={{ display: "flex", overflow: "hidden" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} sx={{ boxShadow: "none" }}>
          <Toolbar
            disableGutters
            sx={{
              minHeight: 0,
              paddingTop: "10px",
              paddingBottom: 0,
              paddingRight: "16px",
              paddingLeft: "10px",
            }}
          >
            {/* <img src={logo} alt="image" width="30%" /> */}
            <Box
              component="img"
              src={logo} // replace with your image path
              alt="Logo"
              sx={{ width: 50, height: 50, ...(open && { display: "none" }) }}
            />
            <IconButton
              // edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                // marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>

            <Box sx={{ flexGrow: 1 }} />
            <Avatar sx={{ bgcolor: yellow[100], color: "black" }}>N</Avatar>
          </Toolbar>
        </AppBar>
        <LeftMenuDrawer
          open={open}
          toggleDrawerCallback={toggleDrawer}
          logoutCallback={logout}
        />
        <Box
          // component="main"
          sx={{
            backgroundColor: (theme) => theme.palette.tertiary.main,
            flexGrow: 1,
            height: "100vh",
            overflowY: "scroll",
          }}
        >
          <Toolbar />
          <Box sx={{ height: "80vh" }}>{children}</Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default PrivateLayout;
