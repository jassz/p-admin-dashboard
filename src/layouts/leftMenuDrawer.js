import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import logo from "../assets/images/logo192.png";
import fulllogo from "../assets/images/full-logo-192.png";

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

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
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
          backgroundColor: "primary.main",
          color: "white",
          width: 240, // optional: set drawer width
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
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
          <ListItemButton component={Link} to="/homepage" sx={{ py: 2 }}>
            <ListItemIcon sx={{ color: "inherit" }}>
              <HomeOutlined />
            </ListItemIcon>
            <ListItemText primary="Homepage" />
          </ListItemButton>

          <ListItemButton component={Link} to="/accountDetail" sx={{ py: 2 }}>
            <ListItemIcon sx={{ color: "inherit" }}>
              <AccountBoxOutlined />
            </ListItemIcon>
            <ListItemText primary="Account Setting" />
          </ListItemButton>

          <ListItemButton component={Link} to="/plan" sx={{ py: 2 }}>
            <ListItemIcon sx={{ color: "inherit" }}>
              <PlayCircleOutlineOutlined />
            </ListItemIcon>
            <ListItemText primary="Plan & Billing" />
          </ListItemButton>
          <ListItemButton component={Link} to="/signin" sx={{ py: 2 }}>
            <ListItemIcon sx={{ color: "inherit" }}>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Box>

      {/* Bottom Section */}
      <Box my={3}>
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
              py: 1,
              backgroundColor: "#1a73e8", // blue button
              "&:hover": {
                backgroundColor: "#1765cc",
              },
            }}
          >
            Upgrade Now
          </Button>
        </Box>
        {/* <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={1}
          sx={{ pb: 2 }} // padding below
        >
          <Button
            variant="contained"
            color="secondary"
            size="small"
            sx={{
              borderRadius: "999px",
              textTransform: "none",
              px: 2,
              py: 0.5,
              fontSize: "0.75rem",
            }}
          >
            Upgrade
          </Button>

          <Typography variant="caption" color="tertiary.dark">
            v1.1.3
          </Typography>
        </Box> */}
        {/* <List>
          <ListItemButton component={Link} to="/" sx={{ py: 3 }}>
            <ListItemIcon sx={{ color: "inherit" }}>
              <CreateNewFolder />
            </ListItemIcon>
            <ListItemText primary="Upgrade Now" />
          </ListItemButton>
        </List> */}
        {/* <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      py={2}
    >
      <Typography variant="caption" color="tertiary.dark">
        v1.1.3
      </Typography>
    </Box> */}
      </Box>
    </Drawer>
  );
};

export default LeftMenuDrawer;
