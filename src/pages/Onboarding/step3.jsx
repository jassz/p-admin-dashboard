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
import ResetPwdLayout from "layouts/resetPwdLayout";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function OnboardingPlatform() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/step2");
  };

  const handleNext = () => {
    if (selectedSource === "Others"){
      sessionStorage.setItem("source", otherSourceText);
    }
    else{
      sessionStorage.setItem("source", selectedSource);
    }
    
    navigate("/step4");
  };

  const [selectedSource, setSelectedSource] = useState(() => {
    const storedSource = sessionStorage.getItem("source");
    return storedSource || "";
  });
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
   <ResetPwdLayout>
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      px: 2,
      background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
    }}
  >
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ width: "100%", maxWidth: 800 }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        {/* Header Section */}
        <Box 
          sx={{ 
            bgcolor: "primary.main", 
            p: 2, 
            textAlign: "center",
            color: "white"
          }}
        >
         <Typography  
         sx={{
            typography: {
              xs: 'h6',
              md: 'h5'
            },
            fontWeight: "bold",
            mb: 1
          }}>
              How did you discover Poisum?
            </Typography>
            <Typography variant="body1">
              Your feedback helps us improve our outreach
            </Typography>
        </Box>

        {/* Content Section */}
        <Box p={4} textAlign={"center"}>
          <Box mb={3}>
            
          </Box>

          <Grid container spacing={2} justifyContent="center">
            {hearOptions.map((option) => (
              <Grid item xs={6} sm={4} key={option}>
                <Box
                  onClick={() => handleSelectSource(option)}
                  sx={{
                    px: 2,
                    py: 2,
                    borderRadius: 2,
                    border: "2px solid",
                    borderColor:
                      selectedSource === option ? "orange" : "grey.200",
                    bgcolor:
                      selectedSource === option
                        ? "secondary.light"
                        : "transparent",
                    color:
                      selectedSource === option ? "primary.dark" : "text.primary",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: "secondary.main",
                      bgcolor: selectedSource === option
                        ? "secondary.light"
                        : "grey.50",
                    },
                  }}
                >
                  <Typography variant="body1" fontWeight={500}>
                    {option}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          {selectedSource === "Others" && (
            <Box mt={3}>
              <TextField
                fullWidth
                size="medium"
                label="Tell us where you heard about us"
                variant="outlined"
                value={otherSourceText}
                onChange={(e) => setOtherSourceText(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  }
                }}
              />
            </Box>
          )}
        </Box>

        {/* Navigation Footer */}
        <Box
          sx={{
            px: 4,
            py: 3,
            bgcolor: "grey.50",
            borderTop: "1px solid",
            borderColor: "divider",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button 
            onClick={handleBack} 
            variant="outlined"
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
            }}
          >
            Back
          </Button>
          <Button 
            onClick={handleNext} 
            variant="contained"
            disabled={selectedSource.length === 0}
            sx={{
              borderRadius: 2,
              px: 4,
              py: 1,
              boxShadow: "none",
              "&:hover": {
                boxShadow: "none",
                bgcolor: "primary.dark"
              }
            }}
          >
            Continue
          </Button>
        </Box>
      </Box>
    </motion.div>
  </Box>
</ResetPwdLayout>
  );
}
