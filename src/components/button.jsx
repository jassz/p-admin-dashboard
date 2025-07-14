import { Box, Button } from "@mui/material";
import React from "react";

export default function ButtonComponent({value, text, callback, }) {
  return (
    <Box sx={{ display: "flex", alignItems: "end" }}>
      <Button size="small" variant={value} onClick={callback}>{text}</Button>
    </Box>
  );
}
