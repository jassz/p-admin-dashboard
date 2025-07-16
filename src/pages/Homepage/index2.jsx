import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import PrivateLayout from "../../layouts/privateLayout";
import ComingSoon from "components/comingSoon";

export default function Homepage() {
  return (
    <PrivateLayout>
      <ComingSoon title="Poisum Admin Dashboard!" />
    </PrivateLayout>
  );
}
