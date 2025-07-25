import {
  Box,
  Typography,
  Button,
  Chip,
  Stack,
  Alert,
  Grid,
  TextField,
} from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function OnboardingName() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/step3");
  };

  const handleSkip = () => {
    // exit or complete onboarding
  };

  const handleNext = () => {
    navigate("/step5");
  };
const [poisumName, setPoisumName] = useState("");

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
            border: "1px solid tertiary.dark",
            boxShadow: 10,
            // p: 3,
            borderRadius: 4,
            textAlign: "center",
          }}
        >
          <Box p={4} textAlign={"center"}>
            <Typography variant="h6" mb={1}>
    What would you like to name your Poisum user?
  </Typography>
  <Typography variant="body2" color="text.secondary" mb={3}>
    This name will represent you in the system when you complete missions or receive recognition.
  </Typography>

  <TextField
    fullWidth
    label="Your Poisum Name"
    variant="outlined"
    size="medium"
    value={poisumName}
    onChange={(e) => setPoisumName(e.target.value)}
  />
          </Box>
          {/* Navigation */}
          <Box
            sx={{
              px: 3,
              pb: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button onClick={handleBack} variant="text">
              Back
            </Button>
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
