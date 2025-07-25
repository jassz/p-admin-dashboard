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

export default function OnboardingPlatform() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/step2");
  };

  const handleSkip = () => {
    // exit or complete onboarding
  };

  const handleNext = () => {
    navigate("/step4");
  };

  const [selectedSource, setSelectedSource] = useState("");
  const [otherSourceText, setOtherSourceText] = useState("");

  const handleSelectSource = (option) => {
    setSelectedSource(option);
    if (option !== "Others") {
      setOtherSourceText(""); // Clear custom input
    }
  };

  const hearOptions = [
    "Facebook",
    "Instagram",
    "LinkedIn",
    "Friend",
    "Email",
    "Google",
    "Online Advertising",
    "Blog or Article",
    "Others"
  ];

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
              How did you hear about us?
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Select where you first heard about Poisum.
            </Typography>

            <Grid container spacing={1} justifyContent="center">
              {hearOptions.map((option) => (
                <Grid item xs={6} sm={4} key={option}>
                  <Box
                    onClick={() => handleSelectSource(option)}
                    sx={{
                      px: 2,
                      py: 1.5,
                      borderRadius: 1,
                      border: "1px solid",
                      borderColor:
                        selectedSource === option ? "primary.main" : "grey.400",
                      bgcolor:
                        selectedSource === option
                          ? "primary.main"
                          : "transparent",
                      color:
                        selectedSource === option ? "white" : "text.primary",
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      "&:hover": {
                        bgcolor:
                          selectedSource === option
                            ? "primary.dark"
                            : "grey.100",
                      },
                    }}
                  >
                    <Typography variant="body2">{option}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            {selectedSource === "Others" && (
              <TextField
                fullWidth
                size="small"
                label="Please specify"
                variant="outlined"
                sx={{ mt: 3 }}
                value={otherSourceText}
                onChange={(e) => setOtherSourceText(e.target.value)}
              />
            )}
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
