import { Box, Button } from "@mui/material";
import React from "react";

export default function ButtonComponent({ value, text, callback, color }) {
  return (
    <Box sx={{ display: "flex", alignItems: "end" }}>
      <Button
        sx={(theme) => ({
            minWidth: 120,
              "&:hover": {
                backgroundColor: theme.palette[color]?.contrastText, // dynamic by color prop
                color: theme.palette[color]?.main, 
                // borderColor: theme.palette[color]?.main, 
                // border:1
            },
         })}
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
