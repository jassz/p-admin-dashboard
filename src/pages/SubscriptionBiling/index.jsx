import { Box, Divider, Typography } from "@mui/material";

import PrivateLayout from "../../layouts/privateLayout";
import myImage from './../../assets/images/coming-soon.jpg'; // adjust the path
import FreeVersion from "./freeVersion";

export default function Plan() {

  return (
  <PrivateLayout>
          <Box sx={{ padding: 5, width: "100%" }}>
            <Typography variant="h4" fontWeight={"bold"}>
            Subscription and Billing
          </Typography>
           <Divider sx={{ my: 1, borderColor: "transparent" }} />
            <FreeVersion />
            </Box>
</PrivateLayout>
  );
}
