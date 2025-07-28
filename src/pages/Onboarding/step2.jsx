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
import axios from "axios";
import { useApiClient } from "context/ApiClientContext";
import { motion } from "framer-motion";
import ResetPwdLayout from "layouts/resetPwdLayout";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function OnboardingValueTags() {
  const navigate = useNavigate();
  const [valueTags, setValueTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherValue, setOtherValue] = useState("");
  const { dashboardApiUrl, accountMgtApiUrl } = useApiClient();

  const handleBack = () => {
    navigate("/step1");
  };

  const handleNext = () => {
    navigate("/step3");
  };


  const toggleTag = (tag) => {
    if (tag === "Others") {
      setShowOtherInput(!showOtherInput);
      return;
    }

    const isSelected = selectedTags.includes(tag);

    if (isSelected) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      if (selectedTags.length >= 2) {
        toast.error("You may select 2 value tags only for free version");
        return; // ❗ Prevent selecting more than 2
      }
      setSelectedTags([...selectedTags, tag]);
    }
  };

 const getValueTags = async () => {
  try {
    const response = await axios.get(
      `${dashboardApiUrl}/ValueTag/value-tag-option`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      }
    );
    // console.log('response', response);
    
    setValueTags(response?.data?.data || []); // Ensure we always set an array
  } catch (error) {
    console.error("Error fetching value tags:", error);
  }
};

  
  useEffect(() => {
    getValueTags();
  }, []);

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
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: 6,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Select Value Tags
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Choose values that matter to your team. These help define your
                reward criteria and mission alignment.
              </Typography>

              <Grid container spacing={1} justifyContent="center">
                {valueTags.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  const isOthers = tag === "Others";

                  return (
                    <Grid item key={tag.valueTagId}>
                      <Box
                        onClick={() => toggleTag(tag)}
                        sx={{
                          px: 2,
                          py: 1,
                          minWidth: 100,
                          textAlign: "center",
                          borderRadius: 1,
                          border: "1px solid",
                          borderColor: isSelected ? "primary.main" : "grey.400",
                          bgcolor: isSelected ? "primary.main" : "transparent",
                          color: isSelected ? "white" : "text.primary",
                          cursor: "pointer",
                          transition: "all 0.2s",
                          "&:hover": {
                            bgcolor: isSelected ? "primary.dark" : "grey.100",
                          },
                        }}
                      >
                        <Typography variant="body2">{tag.name}</Typography>
                      </Box>
                    </Grid>
                  );
                })}

                {showOtherInput && (
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Enter your custom value"
                      size="small"
                      variant="outlined"
                      value={otherValue}
                      onChange={(e) => setOtherValue(e.target.value)}
                    />
                  </Grid>
                )}
              </Grid>

              {/* Upgrade Suggestion */}
              <Alert severity="info" sx={{ mt: 4 }}>
                Want to add more value tags for your organization?{" "}
                <strong>
                  <Link to="/onboardingPlan">Upgrade to Poisum Premium</Link>
                </strong>{" "}
                for full customization.
              </Alert>
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
    </ResetPwdLayout>
  );
}
