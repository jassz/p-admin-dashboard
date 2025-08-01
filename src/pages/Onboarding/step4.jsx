import {
  Box,
  Typography,
  Button,
  Chip,
  Stack,
  Alert,
  Grid,
  TextField,
  Container,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import ResetPwdLayout from "layouts/resetPwdLayout";
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
    sessionStorage.setItem("poisumName", poisumName);
    navigate("/step5");
  };
  const [poisumName, setPoisumName] = useState(() => {
    const storedName = sessionStorage.getItem("poisumName");
    return storedName || "";
  });

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
            py: 2, 
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
              fontWeight: "bold"
            }}
          >
            What should your hero name be?
          </Typography>
          <Typography 
                variant="body1" 
                sx={{
                  typography: {
                    xs: 'body2',
                    md: 'body1'
                  }
                }}
              >
            Create your Poisum identity
          </Typography>
        </Box>

        {/* Content Section */}
        <Box p={4}>
          <Stack spacing={2}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'medium',
                color: 'text.primary'
              }}
            >
              What should we call you?
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'text.secondary',
                lineHeight: 1.6
              }}
            >
              This name will represent you across the Poisum platform and be visible to your team members.
            </Typography>
            
            <TextField
              fullWidth
              size="medium"
              variant="outlined"
              placeholder="Enter your display name"
              value={poisumName}
              onChange={(e) => setPoisumName(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
                mt: 2
              }}
              inputProps={{
                maxLength: 50
              }}
            />
            
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'text.secondary',
                display: 'block',
                textAlign: 'right'
              }}
            >
              {poisumName.length}/50 characters
            </Typography>
          </Stack>
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
            variant="contained"
            onClick={handleNext}
            disabled={!poisumName.trim()}
            sx={{
              borderRadius: 2,
              px: 4,
              py: 1,
              boxShadow: "none",
              "&:hover": {
                boxShadow: "none",
                bgcolor: "primary.dark"
              },
              "&:disabled": {
                bgcolor: "action.disabledBackground",
                color: "action.disabled"
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
