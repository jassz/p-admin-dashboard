import { Box, Button } from "@mui/material";
import React from "react";

export default function ButtonComponent({ value, text, callback, color }) {
  return (
    <Box sx={{ display: "flex", alignItems: "end" }}>
      <Button
        sx={{ minWidth: 120 }}
        size="normal"
        variant={value}
        onClick={callback}
        color={color}
      >
        {text}
      </Button>
    </Box>
  );
}
