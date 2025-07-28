import React from "react";
import { Box, Typography, Container } from "@mui/material";
import PrivateLayout from "../../layouts/privateLayout";

export default function Homepage() {
  return (
    <PrivateLayout>
      <Container maxWidth="lg" sx={{ height: "90vh" }}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems={{ xs: "center", md: "flex-end" }}
          height="100%"
          textAlign={{ xs: "center", md: "right" }}
          px={{ xs: 2, sm: 4 }}
          gap={2}
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
