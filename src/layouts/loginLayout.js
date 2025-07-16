import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
// import logo from "../assets/images/Logo-250/3.png";
import { CssBaseline, Typography } from "@mui/material";
// import bg from "../assets/images/bg4.png";
import { Box, textAlign } from "@mui/system";
import logo from "../assets/images/full_logo-transparent.png";

const PublicLayout = ({ children }) => {
  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        width: "100%",
        position: "relative", // Needed for layering
        backgroundColor: "tertiary.main",
        overflow: "hidden",
      }}
    >
      <CssBaseline />

      {/* Orange background layer */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: { xs: "0%", md: "51%" }, // Responsive
          backgroundColor: "primary.main", // Or your theme color
          borderTopRightRadius: 50,
          borderBottomRightRadius: 50,
          zIndex: 0,
        }}
      />

      {/* Green foreground layer */}
      <Grid
        item
        size={6}
        sx={{
          position: "relative",
          backgroundColor: "secondary.main",
          color: "#fff",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderTopRightRadius: 50,
          borderBottomRightRadius: 50,
          // p: 4,
          zIndex: 1,
        }}
      >
        <Box px={3} textAlign="center">
        {/* <Box
            component="img"
            src={logo} // replace with your image path
            alt="Logo"
            // sx={{ width: 50, height: 50 }}
          /> */}
          <Typography variant="h1" fontWeight="bold" color="tertiary.main">
            POI'SUM
          </Typography>
        </Box>
      </Grid>

      <Grid
        item
        size={6}
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
          backgroundColor: "tertiary.main",
        }}
      >
        {children}
      </Grid>
    </Grid>
  );
};


export default PublicLayout;
