import Grid from "@mui/material/Grid";
import logo from "../assets/images/full_logo-transparent.png";
import { CssBaseline, Typography, useMediaQuery, useTheme  } from "@mui/material";
import { Box } from "@mui/system";

const PublicLayout = ({ children }) => {
      const theme = useTheme();
  
      const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

      <Grid
        size={{xs:12, md:6}}
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
          backgroundColor: "tertiary.main",
            ...(isMobile && {
            backgroundImage: `linear-gradient(142deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }),
        }}
      >
        {children}
      </Grid>

  {!isMobile && (
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          width: { xs: "0%", md: "51%" }, // Responsive
          backgroundColor: "secondary.main", // Or your theme color
          borderTopLeftRadius: 50,
          borderBottomLeftRadius: 50,
          zIndex: 0,
          boxShadow: 12,
        }}
      />
  )}
      {/* Green foreground layer */}
      <Grid
        item
        size={6}
        sx={(theme) =>({
        position: "relative",
        backgroundImage: `linear-gradient(142deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
        color: "#fff",
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        // p: 4,
        zIndex: 1,
        })}
      >
        <Box px={3} textAlign="center">
          {/* <Box
            component="img"
            src={logo} // replace with your image path
            alt="Logo"
            // sx={{ width: 50, height: 50 }}
          /> */}
          <Typography variant="h1" fontWeight="bold" color="tertiary.light">
            POI'SUM
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default PublicLayout;
