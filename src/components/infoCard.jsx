// components/InfoCard.js

import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

export default function InfoCard({ children }) {
      
const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="space-between"
flexDirection={isMobile ? "column" : "row"}
        alignItems={isMobile ? "flex-start" : "center"}      
        border="1px solid"
      borderRadius={2}
      px={isMobile? 1: 3}
      py={2}
      sx={{ borderColor: "primary.light", minHeight: 80 }}
    >
      {children}
    </Box>
  );
}
