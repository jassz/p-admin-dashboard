import {
  Box,
  Divider,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ContactDetails from "./contactDetails";
import CurrentVersion from "./currentVersion";
import PaymentDetails from "./paymentDetails";
import ButtonComponent from "components/button";

export default function SubscriptionOverview({subscriptionPlan}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate(); // initialize navigate

  const openPlan = () => {
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
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box>
          <Typography variant="subtitle1">Subscription Overview</Typography>
          <Typography variant="caption">
            Summarize all your subscription for the purchased plan.
          </Typography>
        </Box>
        <ButtonComponent
          text={"Upgrade Plan"}
          value={"contained"}
          callback={openPlan}
          color={"secondary"}
        />
      </Box>

      <Divider sx={{ my: 2, borderColor: "primary.main" }} />
      <CurrentVersion
        planId={subscriptionPlan.planId}
        planName={subscriptionPlan.planName}
        planDescription={subscriptionPlan.planDescription}
        planExpiryDate={subscriptionPlan.planExpiryDate}
        price={subscriptionPlan.price}
        planFunction={subscriptionPlan.planFunction}
        totalUsage={subscriptionPlan.totalUsage}
        totalStorage={subscriptionPlan.totalStorage} />
      <Divider sx={{ my: 2, borderColor: "primary.main" }} />
    </Paper>
  );
}
