import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import logo from "./../../assets/images/welcome.jpg";
import { useNavigate } from "react-router-dom";

// Dummy image – replace with your actual asset
const onboardingImage = "";

export default function OnboardingWelcome() {
      const navigate = useNavigate();

const handleNext = () => {
 navigate("/step2")
};

  return (
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
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: 6,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Image Section */}
          <Box sx={{ width: "100%", height: 220, overflow: "hidden" }}>
            <img
              src={logo}
              alt="Onboarding"
              style={{ width: "100%", height: "100%", objectFit: "fill"}}
            />
          </Box>

          {/* Content Section */}
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Start Your Journey
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Welcome to Poisum – where missions turn into motivation. Earn points,
              complete team missions, and unlock meaningful rewards as you level up
              your workday.
            </Typography>
          </Box>

          {/* Navigation Buttons */}
          <Box
            sx={{
              px: 3,
              pb: 3,
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            {/* <Button onClick={handleBack} variant="text">
              Back
            </Button> */}
            <Box display="flex" gap={1}>
              {/* <Button onClick={handleSkip} variant="text">
                Skip
              </Button> */}
              <Button onClick={handleNext} variant="contained">
                Next
              </Button>
            </Box>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
}
