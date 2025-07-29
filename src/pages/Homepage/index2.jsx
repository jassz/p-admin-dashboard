import React from "react";
import { Box, Typography, Container } from "@mui/material";
import PrivateLayout from "../../layouts/privateLayout";

export default function Homepage() {
  return (
    <PrivateLayout>
  <Container  sx={{mt:10}}>
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center" // Changed to always center
      justifyContent="center" // Add this to center vertically as well
      textAlign="center" // Add this to ensure text alignment is centered
      height="100%" // Ensure the Box takes full height of its container
    >
      <Typography
        variant="h3"
        textTransform="uppercase"
        fontWeight={700}
        fontSize={{ xs: "2rem", sm: "2.5rem", md: "3rem" }}
      >
        Poisum Admin Dashboard!
      </Typography>

      <Typography
        variant="body1"
        fontWeight="light"
        fontSize={{ xs: "0.9rem", sm: "1rem" }}
        color="text.secondary"
      >
        Stay tuned for more updates and details.
      </Typography>
    </Box>
  </Container>
</PrivateLayout>
  );
}
