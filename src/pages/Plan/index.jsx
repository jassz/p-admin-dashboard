import { Box, Divider, Typography, useTheme, useMediaQuery } from "@mui/material";
import PrivateLayout from "layouts/privateLayout";
import React from "react";
import Listing from "./listing";
import Listing2 from "./listing2";
import Listing3 from "./listing3";
import Listing4 from "./listing4";

export default function Index() {
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <PrivateLayout>
      <Box sx={{ paddingX: isMobile ? 2 : 5, py: isMobile ? 4 : 5, width: "100%", borderRadius: '30' }}>
        {/* <Typography variant="h5" fontWeight={"bold"} textTransform={'uppercase'}>
          Plan and Pricing
        </Typography> */}
        {/* <Divider sx={{ my: 1, borderColor: "transparent" }} /> */}
        {/* <Listing />
        <Divider sx={{ my: 10, borderColor: "secondary.main" }} /> */}

        <Listing2 />
        {/* <Divider sx={{ my: 10, borderColor: "secondary.main" }} />

        <Listing3 />
        <Divider sx={{ my: 10, borderColor: "secondary.main" }} />
        <Listing4 /> */}
      </Box>
    </PrivateLayout>
  );
}
