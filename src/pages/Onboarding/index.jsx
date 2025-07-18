import { Box, useTheme, useMediaQuery } from "@mui/material";
import ResetPwdLayout from "layouts/resetPwdLayout";
import ChangePwd from "./changePwd";

export default function Index() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ResetPwdLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: isMobile ? 2 : 5,
          py: isMobile ? 4 : 5,
          minHeight: "100vh", // center vertically if needed
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 500, // adjust width here
          }}
        >
          <ChangePwd />
        </Box>
      </Box>
    </ResetPwdLayout>
  );
}
