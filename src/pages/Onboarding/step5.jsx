import { Box, Typography, Button, Divider, useMediaQuery, useTheme, Container } from "@mui/material";
import axios from "axios";
import ComponentBackdrop from "components/backdrop";
import { useApiClient } from "context/ApiClientContext";
import { motion } from "framer-motion";
import getErrorMessage from "helper/getErrorMessage";
import ResetPwdLayout from "layouts/resetPwdLayout";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function OnboardingThankyou() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const labelWidth = 150; // Fixed width for labels
  const { dashboardApiUrl } = useApiClient();
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const selectedTagsComplete = JSON.parse(sessionStorage.getItem("valuetags"));
  const selectedTags = selectedTagsComplete.map(tag => (tag.name));
  const selectedTagIds = selectedTagsComplete.map(tag => (tag.valueTagId.toString()));
  const heardFrom = sessionStorage.getItem("source");
  const poisumName = sessionStorage.getItem("poisumName");

   const handleBack = () => {
    navigate("/step4");
  };

   const handleSubmitFinal = async () => {
    setOpenBackdrop(true);
    try {

      const payload = {
         email: sessionStorage.getItem("email"),
          firstname: sessionStorage.getItem("firstname"),
          lastname: sessionStorage.getItem("lastname"),
          countryId: parseInt(sessionStorage.getItem("country"), 10),
          companyName: sessionStorage.getItem("company"),
          valueTagId: selectedTags,
          password: sessionStorage.getItem("password"),
          whereKnowPoisum: heardFrom,
          poisumName: poisumName
      }

      console.log('payload', payload);
      
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      
      const apiResponse = await axios.post(`${dashboardApiUrl}/User/register`,
      payload
      );

      console.log('api response',apiResponse);
      

      if (apiResponse.status === 200) {
        // sessionStorage.removeItem("valuetags");
        // sessionStorage.removeItem("source");
        // sessionStorage.removeItem("poisumName");
        navigate("/verify");
      }
    }
    catch (error) {
        console.log('error1', error);
        toast.error(getErrorMessage(error));
      // toast.error(error.response.data.message);
    }
    finally {
      setOpenBackdrop(false);
    };

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
        style={{ width: "100%", maxWidth: 900 }}
      >
        <Container
          sx={{
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            boxShadow: 3,
            borderRadius: 4,
             maxHeight: '80vh',
            overflow: "scroll",
            "&::-webkit-scrollbar": {
              display: "none", // Chrome, Safari, Edge
            },
          }}
          
        >
          <Box p={4}>
            <Typography variant="h4"  gutterBottom sx={{ fontWeight: "bold" }}>
              🏆 Onboarding Unlocked!
            </Typography>

            <Typography variant="body1" color="text.secondary" mb={3}>
You're officially ready to roll with Poisum              <br />
              We've sent a confirmation email with next steps to <strong>{sessionStorage.getItem("email")}</strong>.
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom sx={{ textAlign: "left", fontWeight: "medium", mb: 2 }}>
              🔍 Profile Summary
            </Typography>

            <Box sx={{ textAlign: "left", mb: 4 }}>
              {/* Personal Information Section */}
              {/* <Typography variant="subtitle2" sx={{ color: "text.secondary", mb: 1 }}>
                PERSONAL INFORMATION
              </Typography> */}
              
              <InfoRow label="Your Name" value={`${sessionStorage.getItem("firstname")} ${sessionStorage.getItem("lastname")}`} isMobile={isMobile} labelWidth={labelWidth} />
              <InfoRow label="Poisum Name" value={sessionStorage.getItem("poisumName")} isMobile={isMobile} labelWidth={labelWidth} />
              <InfoRow label="Email" value={sessionStorage.getItem("email")} isMobile={isMobile} labelWidth={labelWidth} />
              <InfoRow label="Company" value={sessionStorage.getItem("company")} isMobile={isMobile} labelWidth={labelWidth} />

              {/* Preferences Section */}
              {/* <Typography variant="subtitle2" sx={{ color: "text.secondary", mt: 3, mb: 1 }}>
                PREFERENCES
              </Typography> */}
              
              <InfoRow 
                label="Selected Tags" 
                value={Array.isArray(selectedTags) ? selectedTags.join(", ") : "None selected"} 
                isMobile={isMobile} 
                labelWidth={labelWidth} 
              />              
              <InfoRow label="Heard About Us" value={sessionStorage.getItem("source")} isMobile={isMobile} labelWidth={labelWidth} />
              {/* <InfoRow label="Country" value={sessionStorage.getItem("country")} isMobile={isMobile} labelWidth={labelWidth} /> */}
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
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
                color="primary"
                onClick={handleSubmitFinal}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: "bold",
                  borderRadius: 2,
                  // fontSize: "1rem",
                }}
              >
                Get Started with Poisum
              </Button>
            </Box>

            <Typography variant="caption" display="block" sx={{ mt: 3, color: "text.secondary" }}>
              Need help? Contact our support team at support@poisum.com
            </Typography>
          </Box>
        </Container>
      </motion.div>
    </Box>
    <ComponentBackdrop openBackdrop={openBackdrop} />

    </ResetPwdLayout>
  );
};

// Reusable component for info rows
const InfoRow = ({ label, value, isMobile, labelWidth }) => (
  <Box
    display="flex"
    flexDirection={isMobile ? "column" : "row"}
    alignItems={isMobile ? "flex-start" : "center"}
    mb={1}
  >
    <Typography
      variant="body1"
      sx={{
        minWidth: isMobile ? "auto" : labelWidth,
        fontWeight: "600",
        color: "text.primary",
      }}
    >
      {label}:
    </Typography>
    <Typography variant="body1" sx={{ color: "text.secondary" }}>
      {value || "-"}
    </Typography>
  </Box>
);