import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import logo from "./../../assets/images/welcome.jpg";
import { useNavigate } from "react-router-dom";
import ResetPwdLayout from "layouts/resetPwdLayout";

// Dummy image – replace with your actual asset
const onboardingImage = "";

export default function OnboardingWelcome() {
      const navigate = useNavigate();

const handleNext = () => {
 navigate("/step2")
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
            🎉 Welcome to Poisum – Where Work Meets Wow!          
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Let's turn your everyday achievements into extraordinary rewards
          </Typography>
        </Box>

        {/* Hero Image Section */}
        <Box 
          sx={{ 
            width: "100%", 
            height: { xs: 180, md: 220 },
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "grey.50"
          }}
        >
          <img
            src={logo}
            alt="Welcome to Poisum"
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "cover",
              objectPosition: "center"
            }}
          />
        </Box>

        {/* Content Section */}
        <Box sx={{ p: 4, textAlign: "center" }}>
          <Box>
            <Typography 
              sx={{
                typography: {
                  xs: 'h6',
                  md: 'h5'
                },
                fontWeight: "bold",
                mb: 2
              }}
            >
              Ready to level up your work game? With Poisum, you'll:            
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{
                typography: {
                  xs: 'body2',
                  md: 'body1'
                },
                lineHeight: 1.6
              }}
            >
            ✨ Earn points for crushing goals
            ✨ Team up for epic missions
            ✨ Unlock rewards that actually excite you
            </Typography>
          </Box>
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
            justifyContent: "flex-end",
          }}
        >
          <Button 
            onClick={handleNext} 
            variant="contained"
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
            LET'S ROLL!
          </Button>
        </Box>
      </Box>
    </motion.div>
  </Box>
</ResetPwdLayout>
   
  );
}
