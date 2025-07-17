import { Box, Divider, Typography } from "@mui/material";
import PrivateLayout from "layouts/privateLayout";
import React from "react";
import ChangePwd from "./changePwd";
import ResetPwdLayout from "layouts/resetPwdLayout";
// import ResetPwdLayout from "layouts/signupLayout";

export default function Index() {
  return (
    <ResetPwdLayout>
      <Box sx={{ padding: 5, width: "100%"}}>
        <ChangePwd />
      </Box>
    </ResetPwdLayout>
  );
}
