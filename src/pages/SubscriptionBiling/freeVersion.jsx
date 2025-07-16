import { Box, Divider, Paper, Typography } from "@mui/material";
import ButtonComponent from "components/button";
import React from "react";
import Plan from "./index";
import { useNavigate } from "react-router-dom";

export default function FreeVersion() {
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
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          {/* <Typography variant="h4" fontWeight={"bold"}>
            Subscription and Billing
          </Typography>
          <Divider sx={{ my: 1, borderColor: "transparent" }} /> */}

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
          color={"primary"}
          callback={handleClick}
        />
      </Box>
    </Paper>
  );
}
