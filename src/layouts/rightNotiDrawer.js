import { useState } from "react";
import {
  Box,
  List,
  Divider,
  styled,
  Toolbar,
  IconButton,
  Typography,
  Paper,
  Button,
  Grid,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MuiDrawer from "@mui/material/Drawer";


const drawerWidth = 440;

// const StyledBadge = styled(Badge)(({ theme }) => ({
//   "& .MuiBadge-badge": {
//     right: -3,
//     top: 15,
//     padding: "3px 3px",
//   },
// }));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "openNoti",
})(({ theme, openNoti }) => ({
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  "& .MuiList-root": {
    paddingBottom: 0,
  },
  "& .MuiTypography-root": {
    lineHeight: 1,
  },
  "& .MuiPaper-root": {
    borderRadius: 0,
  },
}));

const RightNotiDrawer = ({ openNoti, toggleDrawerNotiCallback }) => {
  const [notiArray, setNotiArray] = useState([]);

  return (
    <Drawer
      anchor="right"
      open={openNoti}
      onClose={toggleDrawerNotiCallback}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawerNotiCallback}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List p={2} backgroundColor="primary">
        <Box display="flex" m={2} justifyContent="space-between">
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ textTransform: "uppercase" }}
          >
            Notifications
          </Typography>
        </Box>

       
          <>
            {notiArray.map((row) => (
              <Grid container
                key={row.id}
                sort="desc"
                sx={{
                  fontWeight: row.read ? "normal" : "bold",
                  backgroundColor: row.read
                    ? "whitesmoke"
                    : "white",
                  transition: "background-color 0.3s",
                  "&:hover": {
                    backgroundColor: row.read
                      ? "rgba(211, 211, 211, 0.7)"
                      : "whitesmoke",
                    cursor: "pointer",
                  },
                }}
               
              >
                <Grid item xs={2} p={2}>
                  {(row.invoiceStatus)}
                </Grid>
                <Grid item xs={7} py={2}>
                  <Typography
                    variant="subtitle1"
                    fontSize="145x"
                    fontWeight="bold"
                    pb={1}
                  >
                    {/* {row.notificationId} */}
                    {row.title}
                  </Typography>
                  <Typography variant="body1" fontSize="12px">
                    {row.message}
                  </Typography>
                </Grid>
                <Grid item xs={2} py={2} display="flex" textAlign="right">
                  <Typography fontSize="10px">{row.date}</Typography>
                </Grid>
              </Grid>
            ))}
            <Paper>
              <Box display="flex" justifyContent="center">
                <Button
                  sx={{
                    width: "100%",
                  }}
                  variant="text"
                >
                  Load More
                </Button>
              </Box>
            </Paper>
          </>
      
      </List>
    </Drawer>
  );
};

export default RightNotiDrawer;
