import { Box, Divider, Typography } from "@mui/material";
import PrivateLayout from "layouts/privateLayout";
import React from "react";
import Listing from "./listing";
import Listing2 from "./listing2";
import Listing3 from "./listing3";
import Listing4 from "./listing4";

export default function Index() {
  return (
    <PrivateLayout>
      <Box sx={{ padding: 5, width: "100%" }}>
        <Typography variant="h4" fontWeight={"bold"}>
          Plan and Pricing
        </Typography>
        <Divider sx={{ my: 3, borderColor: "transparent" }} />
        <Listing />
        <Divider sx={{ my: 10, borderColor: "secondary.main" }} />

        <Listing2 />
        <Divider sx={{ my: 10, borderColor: "secondary.main" }} />

        <Listing3 />
        <Divider sx={{ my: 10, borderColor: "secondary.main" }} />
        <Listing4 />
      </Box>
    </PrivateLayout>
  );
}
