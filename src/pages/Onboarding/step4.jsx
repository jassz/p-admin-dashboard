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
const [poisumName, setPoisumName] = useState("");

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
        {/* <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}> */}
              <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 2 }}>
                <Stack spacing={3}>
                  <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                    Let's get you up and running.
                  </Typography>
                  
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 'medium' }}>
                  Your Poi'sum identity
                  </Typography>
                  
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  What you want to be called in Poi'sum?
                  </Typography>
                  
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                  This name will represent you across the Poi'sum platform.
                  </Typography>
                  
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Enter the name of your site."
                    value={poisumName}
                    onChange={(e) => setPoisumName(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    You can always edit or add details in your Dashboard.
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'end', pt: 2 }}>
                    {/* <Button variant="text" color="inherit">
                      Skip
                    </Button> */}
                    <Button 
                      variant="contained" 
                      color="primary"
                      onClick={handleNext}
                      disabled={!poisumName.trim()}
                    >
                      Continue
                    </Button>
                  </Box>
                </Stack>
              </Paper>
            {/* </Container> */}
 
      </motion.div>
    </Box>
    </ResetPwdLayout>
    
  );
}
