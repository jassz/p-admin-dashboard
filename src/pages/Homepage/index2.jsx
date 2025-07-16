import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import PrivateLayout from "../../layouts/privateLayout";
import ComingSoon from "components/comingSoon";

export default function Homepage() {
  return (
    <PrivateLayout>
      {/* <ComingSoon title="Poisum Admin Dashboard!" /> */}
       <Box
    display="flex"
    flexDirection="column"
    alignItems="end"
    justifyContent="center"
    height="90vh"
    p={4}
    gap={2}
     sx={{
    // backgroundColor: 'tertiary.main', 
    // backgroundImage: `url(${myImage})`,
    // backgroundSize: 'cover',        // Optional: covers entire box
    // backgroundRepeat: 'no-repeat',  // Optional: prevents tiling
    // backgroundPosition: 'center',   // Optional: centers image
  }}
  >
    <Typography variant="h2" textTransform={"uppercase"} fontWeight={700}  >
      {'Poisum Admin Dashboard!'}
    </Typography>
    <Typography variant="body1" fontWeight='light'  >
      Stay tuned for more updates and details.
    </Typography>
  </Box>
    </PrivateLayout>
  );
}
