import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import logo from "../assets/images/Logo-250/3.png";
import { CssBaseline, Typography } from "@mui/material";
// import bg from "../assets/images/bg4.png";
import { Box, textAlign } from "@mui/system";

const PublicLayout = ({ children }) => {
  return (
    <Grid container component="main" sx={{ height: "100vh", width: "100%" }}>
      <CssBaseline />
      <Grid
        size={7}
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
        }}
      >
        {children}
      </Grid>
      <Grid
        size={5}
        sx={{
          backgroundColor: "#F15B2B",
          color: "#fff",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderTopLeftRadius: 50,
          borderBottomLeftRadius: 50,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          p: 4,
        }}
      >
        <Box px={3} textAlign="center">
          {/* <Typography variant="h3" fontWeight="bold" gutterBottom>
            Welcome Back to
          </Typography> */}
          <Typography variant="h3" fontWeight="bold">
            POISUM
          </Typography>
        </Box>
      </Grid>

      
    </Grid>
  );
};

export default PublicLayout;
