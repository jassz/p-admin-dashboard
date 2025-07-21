import {
  Box,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import PrivateLayout from "../../layouts/privateLayout";
import myImage from "./../../assets/images/coming-soon.jpg"; // adjust the path
import FreeVersion from "./freeVersion";
import CurrentVersion from "./currentVersion";
import BillingOverview from "./billingOverview";
import SubscriptionOverview from "./subscriptionOverview";

export default function Plan() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
         <SubscriptionOverview />
        {/* <Divider sx={{ my: 1, borderColor: "transparent" }} />
        <FreeVersion /> */}
        <Divider sx={{ my: 1, borderColor: "transparent" }} />
        <BillingOverview />
      </Box>
    </PrivateLayout>
  );
}
