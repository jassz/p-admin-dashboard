import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

export default function ButtonComponent({ value, text, callback, color }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box>
      <Button
        sx={(theme) => ({
          minWidth: 120,
          "&:hover": {
            backgroundColor: theme.palette[color]?.contrastText,
            color: theme.palette[color]?.main,
          },
          borderRadius: 2,
        })}
        size={isMobile ? "small" : "normal"}
        variant={value}
        onClick={callback}
        color={color}
      >
        {text}
      </Button>
    </Box>
  );
}
