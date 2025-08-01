import {
  Box,
  Typography,
  Button,
  Alert,
  Grid,
  TextField,
  Chip,
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
  const [selectedTags, setSelectedTags] = useState(() => {
    const storedTags = sessionStorage.getItem("valuetags");
    return storedTags ? JSON.parse(storedTags) : [];
  });  
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherValue, setOtherValue] = useState("");
  const { dashboardApiUrl } = useApiClient();

  const handleBack = () => {
    navigate("/step1");
  };

  const handleNext = () => {
    const allSelectedTags = [...selectedTags];
    sessionStorage.setItem("valuetags", JSON.stringify(allSelectedTags));
    navigate("/step3");
  };

 const toggleTag = (tag) => {
  if (tag.name === "Others") {
    setShowOtherInput(!showOtherInput);
    return;
  }

  const isSelected = selectedTags.some(t => t.valueTagId === tag.valueTagId);

  if (isSelected) {
    setSelectedTags(selectedTags.filter(t => t.valueTagId !== tag.valueTagId));
  } else {
    if (selectedTags.length >= 2) {
      toast.error("You may select 2 value tags only for free version");
      return;
    }
    setSelectedTags([...selectedTags, tag]);
  }
};

const addCustomTag = () => {
  if (!otherValue.trim()) {
    toast.error("Please enter a value");
    return;
  }

  if (selectedTags.length >= 2) {
    toast.error("You may select 2 value tags only for free version");
    return;
  }

  const newTag = {
    valueTagId: `custom-${Date.now()}`,
    name: otherValue.trim(),
    isCustom: true
  };

  // Append to valueTags instead of customTags
  setValueTags([...valueTags, newTag]);
  
  // Also automatically select the new tag
  setSelectedTags([...selectedTags, newTag]);
  
  setOtherValue("");
  setShowOtherInput(false);
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
      setValueTags(response?.data?.data || []);
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
                }}
              >
                Pick Value Tags as Your Power-Ups!
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
                Choose your values that fuel your team's superpowers
              </Typography>
            </Box>

            {/* Content Section */}
            <Box p={4} textAlign={"center"}>
              <Grid container spacing={2} justifyContent="center">
                {valueTags.map((tag) => {
                  const isSelected = selectedTags.some(t => t.valueTagId === tag.valueTagId);

                  return (
                    <Grid key={tag.valueTagId} xs={6} sm={4}>
                      <Box
                        onClick={() => toggleTag(tag)}
                        sx={{
                          px: 2,
                          py: 2,
                          borderRadius: 2,
                          border: "2px solid",
                          borderColor: isSelected ? "secondary.main" : "grey.200",
                          bgcolor: isSelected ? "secondary.light" : "transparent",
                          color: isSelected ? "primary.dark" : "text.primary",
                          textAlign: "center",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            borderColor: "primary.main",
                            bgcolor: isSelected ? "secondary.light" : "grey.50",
                          },
                        }}
                      >
                        <Typography variant="body1" fontWeight={500}>
                          {tag.name}
                        </Typography>
                      </Box>
                    </Grid>
                  );
                })}

                <Grid xs={6} sm={4}>
                  <Box
                    onClick={() => setShowOtherInput(!showOtherInput)}
                    sx={{
                      px: 2,
                      py: 2,
                      borderRadius: 2,
                      border: "2px solid",
                      borderColor: showOtherInput ? "primary.main" : "grey.200",
                      bgcolor: showOtherInput ? "secondary.light" : "transparent",
                      color: showOtherInput ? "primary.dark" : "text.primary",
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        borderColor: "primary.main",
                        bgcolor: showOtherInput ? "secondary.light" : "grey.50",
                      },
                    }}
                  >
                    <Typography variant="body1" fontWeight={500}>
                      Others
                    </Typography>
                  </Box>
                </Grid>

                {showOtherInput && (
                  <Grid xs={12}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <TextField
                        fullWidth
                        size="medium"
                        label="Add custom value"
                        variant="outlined"
                        value={otherValue}
                        onChange={(e) => setOtherValue(e.target.value)}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          }
                        }}
                      />
                      <Button 
                        variant="contained" 
                        onClick={addCustomTag}
                        sx={{
                          borderRadius: 2,
                          px: 3,
                          py: 1.5,
                          whiteSpace: 'nowrap'
                        }}
                      >
                        Add
                      </Button>
                    </Box>
                  </Grid>
                )}
              </Grid>

              {/* Upgrade Suggestion */}
              <Alert 
                severity="info" 
                sx={{ 
                  mt: 4,
                  borderRadius: 2,
                  textAlign: 'left',
                  bgcolor: 'secondary.main'
                }}
              >
                <Typography variant="body2" color="white">
                  Want to add more value tags?{' '}
                  <Link 
                    to="/onboardingPlan" 
                    style={{ 
                      fontWeight: 'bold',
                      color: 'primary.main',
                      textDecoration: 'underline'
                    }}
                  >
                    Upgrade to Poisum Premium
                  </Link>{' '}
                  for unlimited options.
                </Typography>
              </Alert>
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
                disabled={selectedTags.length === 0}
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