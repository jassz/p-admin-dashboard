import ExitToAppIcon from "@mui/icons-material/ExitToApp";

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
  Button,
  IconButton,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import {
  AccountBoxOutlined,
  HomeOutlined,
  PlayCircleOutlineOutlined,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import AppsIcon from "@mui/icons-material/Apps";
import UpgradeIcon from "@mui/icons-material/WorkspacePremium"; // or use a crown/star icon
import Tooltip from "@mui/material/Tooltip";
import WhatshotIcon from "@mui/icons-material/Whatshot"
const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    background: theme.palette.primary.main,
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


const menuItems = [
  {
    label: "Dashboard",
    to: "/homepage",
    icon: <HomeOutlined />,
    hoverBg: "primary.main",
  },
  {
    label: "Account Setting",
    to: "/accountDetail",
    icon: <AccountBoxOutlined />,
    hoverBg: "primary.main",
  },
  {
    label: "Plan & Billing",
    to: "/subscription",
    icon: <PlayCircleOutlineOutlined />,
    hoverBg: "secondary.main",
  },
  {
    label: "Logout",
    to: "/signin",
    icon: <ExitToAppIcon />,
    hoverBg: "secondary.main",
  },
];

const LeftMenuDrawer = ({ open, toggleDrawerCallback, logoutCallback }) => {
  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        "& .MuiDrawer-paper": {
          borderRight: "none",
        },
      }}
    >
      <Box>
        <Toolbar
          sx={{
           display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            px: [1],
            paddingTop:'20px'
            }}
        >
          <IconButton onClick={toggleDrawerCallback}  color="inherit">
            <MenuIcon sx={{ color: "tertiary.main" }} />
          </IconButton>

          <Typography
            variant="h4"
            color="inherit"
            pl={3}
            sx={{
              fontWeight: "bold",
              textTransform: "uppercase",
              
            }}
          >
            POISUM
          </Typography>
        </Toolbar>


       <List component="nav">
      {menuItems.map((item, index) => (
        <ListItemButton
          key={index}
          component={Link}
          to={item.to}
          sx={{
            py: 2,
            "&:hover": { backgroundColor: 'secondary.main' },
            "&:active": { backgroundColor: 'secondary.main' },
          }}
        >
          <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItemButton>
      ))}
    </List>
      </Box>

      {/* Bottom Section */}
      <Box my={7}>
         {open ? (
        <Box
          sx={{
            backgroundColor: "tertiary.light",
            borderRadius: 3,
            p: 2,
            textAlign: "center",
            boxShadow: 1,
            mx: 2,
            border: "1px solid",
            borderColor: "secondary.main"
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
            You're currently using <br />
            the free version
          </Typography>

          <Button
            variant="contained"
            sx={{
              borderRadius: "999px",
              textTransform: "none",
              px: 3,

              boxShadow: 5,
              backgroundColor: "secondary.main", // blue button
              "&:hover": {
                backgroundColor: "secondary.dark",
                // color: "secondary.main"
              },
            }}
          >
            Upgrade Now
          </Button>
          {/* <ButtonEncrypt /> */}
        </Box>
         ): (
    <Box display="flex" justifyContent="start" alignItems="end" ml={1}>
        <Tooltip title="Upgrade to Premium" placement="right">
          <Box
            sx={{
              // p: 1.5,
              borderRadius: 5,
              border: "1px solid",
              borderColor: "secondary.main",
              backgroundColor: "tertiary.main",
              boxShadow: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton>
              <WhatshotIcon sx={{ color: "secondary.main" }} />
            </IconButton>
          </Box>
        </Tooltip>
      </Box>
  )}
      
       </Box>
    </Drawer>
  );
};

export default LeftMenuDrawer;
