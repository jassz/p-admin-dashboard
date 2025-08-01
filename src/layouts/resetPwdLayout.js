import CustomTheme from "theme/customTheme";
import logo from "../assets/images/full_logo-transparent.png";
import { AppBar, CssBaseline, IconButton, ThemeProvider, Toolbar, Typography, useMediaQuery } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import ContactSupportIcon from "@mui/icons-material/ContactSupport"

const ResetPwdLayout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
          <Box sx={{ display: "flex", overflow: "hidden" }}>
            <CssBaseline />
            <AppBar position="absolute" sx={{ boxShadow: "none" }}>
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
                  sx={{ width: 150,  }}
                />
                {/* <IconButton
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
                </IconButton> */}
    
                <Box sx={{ flexGrow: 1, alignItems: "center" }} />
                {/* <ContactSupportIcon /> */}
                <Typography variant="body2" sx={{fontWeight: '500'}}>Help</Typography>
                <ContactSupportIcon />

                {/* <Avatar sx={{ bgcolor: yellow[100], color: "black" }}>N</Avatar> */}
              </Toolbar>
            </AppBar>

              <Box
                      sx={{
                        backgroundColor: (theme) => theme.palette.tertiary.main,
                        flexGrow: 1,
                        height: "100vh",
                        overflowY: "scroll",
                      }}
                    >
                      <Box sx={{ height: "80vh", justifyContent:"center" }}>{children}</Box>
                    </Box>
            </Box>
    // <Grid
    //   container
    //   component="main"
    //   sx={{
    //     height: "100vh",
    //     width: "100%",
    //     position: "relative", // Needed for layering
    //     backgroundColor: "tertiary.main",
    //     overflow: "hidden",
    //   }}
    // >
    //   <CssBaseline />

    //   <Grid
    //     size={12}
    //     sx={{
    //       height: "100vh",
    //       display: "flex",
    //       flexDirection: "column",
    //       justifyContent: "center",
    //       alignItems: "center",
    //       p: 4,
    //       backgroundColor: "tertiary.main",
    //     }}
    //   >
    //     {children}
    //   </Grid>
    // </Grid>
  );
};

export default ResetPwdLayout;
