import {
  Box,
  Typography,
  Button,
  Chip,
  Stack,
  Alert,
  Grid,
  TextField,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import ResetPwdLayout from "layouts/resetPwdLayout";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function OnboardingThankyou() {
  const navigate = useNavigate();
  const labelWidth = 140;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const selectedTags = ["Motivation", "Rewards"];
  const heardFrom = "LinkedIn";
  const poisumName = "TeamHero";
  const handleSubmitFinal = () => {
    // Final API call or redirect
 navigate("/onboarding")
  };

  return (
    <ResetPwdLayout>
<Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        px: 2,
        bgcolor: "#f9f9f9",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ width: "100%", maxWidth: 600 }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            border: "1px solid tertiary.dark",
            boxShadow: 10,
            // p: 3,
            borderRadius: 4,
            textAlign: "center",
          }}
        >
          <Box p={4} textAlign={"center"}>
            <Typography variant="h5" gutterBottom>
              🎉 Thank You!
            </Typography>

            <Typography variant="body1" color="text.secondary" mb={2}>
              You've successfully completed the onboarding.
              <br />
              We'll send a confirmation and next steps to your email shortly.
            </Typography>

            <Divider sx={{ my: 2 }} />
<Typography variant="subtitle1" gutterBottom textAlign="left">
  🔍 Summary of Your Info
</Typography>

<Box sx={{ textAlign: "left", width: "100%" }}>
  <Box
    display="flex"
    flexDirection={isMobile ? "column" : "row"}
    alignItems={isMobile ? "flex-start" : "center"}
    mb={1}
    ml={4}
  >
    <Typography
      // pr={isMobile ? 0 : 4}
      pb={isMobile ? 1 : 0}
      sx={{ minWidth: isMobile ? "auto" : labelWidth, fontWeight: "600" }}
    >
      Selected Tags:
    </Typography>
    <Typography variant="body2">{selectedTags.join(", ")}</Typography>
  </Box>

  <Box
    display="flex"
    flexDirection={isMobile ? "column" : "row"}
    alignItems={isMobile ? "flex-start" : "center"}
     mb={1}
    ml={4}
  >
    <Typography
      // pr={isMobile ? 0 : 4}
      pb={isMobile ? 1 : 0}
      sx={{ minWidth: isMobile ? "auto" : labelWidth, fontWeight: "600" }}
    >
      Heard About Us:
    </Typography>
    <Typography variant="body2">{heardFrom}</Typography>
  </Box>

  <Box
    display="flex"
    flexDirection={isMobile ? "column" : "row"}
    alignItems={isMobile ? "flex-start" : "center"}
     mb={1}
    ml={4}
  >
    <Typography
      // pr={isMobile ? 0 : 4}
      pb={isMobile ? 1 : 0}
      sx={{ minWidth: isMobile ? "auto" : labelWidth, fontWeight: "600" }}
    >
      Poisum Name:
    </Typography>
    <Typography variant="body2">{poisumName}</Typography>
  </Box>
</Box>

            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 4 }}
              onClick={handleSubmitFinal}
            >
              Finish
            </Button>
          </Box>
        </Box>
      </motion.div>
    </Box>
    </ResetPwdLayout>
  );
}
