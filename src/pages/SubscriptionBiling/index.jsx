import {
  Box,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import React, { useState, useEffect } from "react";
import PrivateLayout from "../../layouts/privateLayout";
import myImage from "./../../assets/images/coming-soon.jpg"; // adjust the path
import FreeVersion from "./freeVersion";
import CurrentVersion from "./currentVersion";
import BillingOverview from "./billingOverview";
import SubscriptionOverview from "./subscriptionOverview";
import axios from "axios";
import ComponentBackdrop from "components/backdrop";
import { useApiClient } from "context/ApiClientContext";
import { toast } from "react-hot-toast";

export default function Plan() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { dashboardApiUrl } = useApiClient();
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [subscriptionPlan, setSubscriptionPlan] = useState ({
    planId: 0,
    planName: "",
    planDescription: "",
    price: 0.0,
    planExpiryDate: "1970-01-01",
    planFunction: [{featureName: ""}],
    totalUsage: 0,
    totalStorage: 0
  });

  useEffect(() => {
    setOpenBackdrop(true);
    if (subscriptionPlan.planId === 0){
      apiGetUserPlan();
    }
    setOpenBackdrop(false);
  }, [subscriptionPlan]);

  const apiGetUserPlan = async () => {
      try{
        const apiResponse = await axios.get(`${dashboardApiUrl}/Plan/user-plan-details`);
        // console.log(apiResponse);
        if (apiResponse.status === 200){
          setSubscriptionPlan(apiResponse.data.data);
          
        }
        // console.log(subscriptionPlan);
      }
      catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    };

  return (
    <PrivateLayout>
      <Box
        sx={{ paddingX: isMobile ? 2 : 5, py: isMobile ? 4 : 5, width: "100%" }}
      >
        <Typography
          variant="h5"
          textTransform={"uppercase"}
          fontWeight={"bold"}
        >
          Subscription and Billing
        </Typography>
         <Divider sx={{ my: 1, borderColor: "transparent" }} />
         <SubscriptionOverview 
          subscriptionPlan={subscriptionPlan}
         />
        {/* <Divider sx={{ my: 1, borderColor: "transparent" }} />
        <FreeVersion /> */}
        <Divider sx={{ my: 1, borderColor: "transparent" }} />
        <BillingOverview />
      </Box>
      <ComponentBackdrop openBackdrop={openBackdrop} />
    </PrivateLayout>
  );
}
