import { Box, Divider, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import ButtonComponent from "components/button";
import React from "react";
import Plan from "./index";
import { useNavigate } from "react-router-dom";

export default function FreeVersion() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate(); // initialize navigate

   const handleClick = () => {
    navigate("/plan"); // or "/plans" — whatever your route is
  };

  return (
    <Paper
      sx={{
        borderRadius: 4,
        border: "1px solid tertiary.main",
        boxShadow: 5,
        padding: 3,
      }}
    >
      <Box 
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        justifyContent="space-between"
        alignItems={isMobile ? "flex-start" : "center"}
        gap={isMobile ? 2 : 0}
      >
        <Box>
          <Typography variant="body1">
            You currently don't have an active subscription.
          </Typography>
          <Divider sx={{ my: 1, borderColor: "transparent" }} />
          <Typography variant="body2">
            Subscribe to get access to all features and content
          </Typography>
        </Box>

        <ButtonComponent
          value={"contained"}
          text={"View Plans"}
          color={"secondary"}
          callback={handleClick}
        />
      </Box>
    </Paper>
  );
}
