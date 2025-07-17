import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import logo from "../assets/images/logo192.png";
import fulllogo from "../assets/images/full-logo-192.png";
import { motion } from "framer-motion";

import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Link,
  styled,
  Toolbar,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import {
  AccountBoxOutlined,
  AccountTreeSharp,
  CreateNewFolder,
  Home,
  HomeMaxOutlined,
  HomeOutlined,
  PlayCircleOutlineOutlined,
} from "@mui/icons-material";
import ButtonEncrypt from "components/encryptButton";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    background: theme.palette.secondary.main,
    color: theme.palette.tertiary.main,
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

const LeftMenuDrawer = ({ open, logoutCallback }) => {
  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        "& .MuiDrawer-paper": {
          borderRight: "none",
          backgroundColor: "secondary .main",
          color: "tertiary.main",
          width: 240, // optional: set drawer width
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow:2
        },
      }}
    >
      {/* Top Content */}
      <Box>
        <Toolbar
          sx={{
            display: "flex",
            justifyItems: "start",
            alignItems: "center",
            justifyContent: "space-between", // changed from flex-end
            // gap: 1.5,
            // px: 2,
            pt: 2,
          }}
        >
          <Box
            component="img"
            src={logo} // replace with your image path
            alt="Logo"
            sx={{ width: 50, height: 50 }}
          />
          <Typography
            variant="h4"
            color="inherit"
            sx={{
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            POISUM
          </Typography>
        </Toolbar>

        <List component="nav">
          <ListItemButton component={Link} to="/homepage" 
          sx={{ 
            py: 2,  
          "&:hover": {backgroundColor: 'primary.main'}, 
          }}>
            <ListItemIcon sx={{ color: "inherit" }}>
              <HomeOutlined />
            </ListItemIcon>
            <ListItemText primary="Homepage" />
          </ListItemButton>

          <ListItemButton component={Link} to="/accountDetail" 
           sx={{ 
            py: 2,  
          "&:hover": {backgroundColor: 'primary.main'}, 
          }}>
            <ListItemIcon sx={{ color: "inherit" }}>
              <AccountBoxOutlined />
            </ListItemIcon>
            <ListItemText primary="Account Setting" />
          </ListItemButton>

          <ListItemButton component={Link} to="/subscription"  sx={{ 
            py: 2,  
          "&:hover": {backgroundColor: 'primary.main'}, 
          "&:active": {backgroundColor: 'primary.main'} 
          }}>
            <ListItemIcon sx={{ color: "inherit" }}>
              <PlayCircleOutlineOutlined />
            </ListItemIcon>
            <ListItemText primary="Plan & Billing" />
          </ListItemButton>
          <ListItemButton component={Link} to="/signin"  sx={{ 
            py: 2,  
          "&:hover": {backgroundColor: 'primary.main'},
          "&:active": {backgroundColor: 'primary.main'} 
          }}>
            <ListItemIcon sx={{ color: "inherit" }}>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Box>

      {/* Bottom Section */}
      <Box my={7}>
        {/* <Divider sx={{ borderColor: "tertiary.main", my:3 }} /> */}
        <Box
          sx={{
            backgroundColor: "tertiary.light",
            borderRadius: 3,
            p: 2,
            textAlign: "center",
            boxShadow: 1,
            mx: 2,
          }}
        >
          <Typography
            variant="subtitle1"
            color="secondary.main"
            fontWeight="bold"
          >
            Get Premium Version!
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            mb={2}
            sx={{}}
            noWrap="false"
          >
            You're currently using <br/>the free version

          </Typography>

          <Button
            variant="contained"
            sx={{
              borderRadius: "999px",
              textTransform: "none",
              px: 3,
            
              boxShadow:5,
              backgroundColor: "primary.main", // blue button
              "&:hover": {
                backgroundColor: "primary.dark",
                // color: "secondary.main"
              },
            }}
          >
            Upgrade Now
          </Button>
          {/* <ButtonEncrypt /> */}
        </Box>
          <Box display={"flex"} justifyContent={"center"}>
                      <Typography variant="overline" fullWidth>
                        V1.0.1
                      </Typography>
                    </Box>
      </Box>
    </Drawer>
  );
};

export default LeftMenuDrawer;
