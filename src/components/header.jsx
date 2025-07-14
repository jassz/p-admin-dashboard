import React from "react";
import { Typography, Box, useTheme } from "@mui/material";
// import { tokens } from "../theme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

  return (
    <Box mt={1} mb={1}>
      <Typography
        variant="h5"
        color={'#333333'}
        fontWeight="bold"
        sx={{ textTransform: "uppercase" }}
      >
        {title}
      </Typography>
      <Typography variant="h6" color={"#3da58a"}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
