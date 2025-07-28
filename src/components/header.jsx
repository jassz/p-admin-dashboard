import React from "react";
import { Typography, Box, useTheme } from "@mui/material";
// import { tokens } from "../theme";
import Icon from "@mui/icons-material/AccountBox"; // Change to your preferred icon

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  //   const colors = tokens(theme.palette.mode);

  return (
    <Box mt={1} mb={1}>
      <Box display="flex" alignItems="center" gap={1}>
        {/* <Icon sx={{ color: "secondary.main", fontSize:40 }} /> */}
        <Typography
          variant="h5"
          color="secondary.main"
          fontWeight="bold"
          sx={{ textTransform: "uppercase" }}
        >
          {title}
        </Typography>
      </Box>
      <Typography variant="caption" color="secondary.main">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
