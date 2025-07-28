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
    planExpiryDate: "",
    planFunction: [{featureName: ""}],
    totalUsage: 0,
    totalStorage: 0
  });
  const [cardInfo, setCardInfo] = useState({
    cardName: "",
    cardNumber: "",
    cardType: "",
    cardExpiryDate: ""
  })

  useEffect(() => {
    setOpenBackdrop(true);
    if (subscriptionPlan.planId === 0){
      apiGetUserPlan();
    }
    setOpenBackdrop(false);
  }, []);

  useEffect(() => {
    setOpenBackdrop(true)
    if (cardInfo.cardName === ""){
      apiGetCardInfo();
    }
    setOpenBackdrop(false);
  }, [cardInfo]);

  const apiGetUserPlan = async () => {
    try{
      const apiResponse = await axios.get(`${dashboardApiUrl}/Plan/user-plan-details`);
      if (apiResponse.status === 200){
        setSubscriptionPlan(apiResponse.data.data);
        
      }
    }
    catch (error) {
      toast.error(error.message);
    }
  };

  const apiGetCardInfo = async () => {
    try{
      const apiResponse = await axios.get(`${dashboardApiUrl}/Billing/card-info`);
      if (apiResponse.status === 200){
        setCardInfo(apiResponse.data.data);
      }
    }
    catch (error) {
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
        <BillingOverview
          cardInfo={cardInfo} />
      </Box>
      <ComponentBackdrop openBackdrop={openBackdrop} />
    </PrivateLayout>
  );
}
