import { Box, Typography, Button, Grid, Paper, TextField } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ResetPwdLayout from "layouts/resetPwdLayout";
import { useEffect, useState } from "react";
import ComponentBackdrop from "components/backdrop";
import axios from "axios";
import { useApiClient } from "context/ApiClientContext";
import toast from "react-hot-toast";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import getErrorMessage from "helper/getErrorMessage";
import { startTransition } from "react";

export default function Verification() {
  const [code, setCode] = useState(["", "", "", ""]);
  const navigate = useNavigate();
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const { dashboardApiUrl } = useApiClient();

  const handleChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      // Only allow digits and max length 1
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto focus to next input if a digit was entered
      if (value && index < 3) {
        document.getElementById(`code-input-${index + 1}`)?.focus();
      }
    }
  };

  useEffect(() => {
    setUserEmail(sessionStorage.getItem("email") || "");
  }, []);

  const handleSubmit = async () => {
    const verificationCode = code.join("");
    console.log("Verification code:", verificationCode);

    // Use startTransition for non-urgent state updates
    startTransition(() => {
      setOpenBackdrop(true);
    });

    try {
      // Remove artificial delay or handle differently
      const apiResponse = await axios.post(
        `${dashboardApiUrl}/User/verify-email`,
        {
          email: userEmail, // Consider getting this earlier
          code: verificationCode,
        }
      );

      if (apiResponse.status === 200) {
        sessionStorage.removeItem("valuetags");
        sessionStorage.removeItem("source");
        sessionStorage.removeItem("poisumName");
        navigate("/homepage");
      }
    } catch (error) {
      console.error("Verification error:", error);
      const errorMessage =
        error.response?.data?.errorMesage ||
        error.response?.data?.message?.error?.message ||
        error.response?.data?.message ||
        "Oops! Page or data not found.";
      toast.error(errorMessage);
    } finally {
      startTransition(() => {
        setOpenBackdrop(false);
      });
    }
  };

  //   const handleSubmit = async () => {
  //     const verificationCode = code.join("");
  //     console.log("Verification code:", verificationCode);

  //     setOpenBackdrop(true);
  //     try {
  //       await new Promise((resolve) => setTimeout(resolve, 3000));

  //       const apiResponse = await axios.post(
  //         `${dashboardApiUrl}/User/verify-email`,
  //         {
  //           email: sessionStorage.getItem("email"),
  //           code: verificationCode,
  //         }
  //       );

  //       if (apiResponse.status === 200) {
  //         navigate("/homepage");
  //       }
  //     } catch (error) {
  //       console.log("1", error);
  //       if (error.response.data.success == false) {
  //         if (error.response.data.errorMesage) {
  //           toast.error(error.response.data.errorMesage);
  //         } else if (error.response.data.message.error) {
  //           toast.error(error.response.data.message.error.message);
  //         } else if (error.response.data.message) {
  //           toast.error(error.response.data.message);
  //         } else {
  //           toast.error("Oops! Page or data not found.");
  //         }
  //       }
  //     } finally {
  //       setOpenBackdrop(false);
  //     }
  //   };

  const handleSendAgain = async () => {
    console.log("Resend verification code");
    setOpenBackdrop(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const apiResponse = await axios.post(
        `${dashboardApiUrl}/User/send-verification`,
        {
          email: sessionStorage.getItem("email"),
        }
      );

      if (apiResponse.status === 200) {
        console.log("response", apiResponse.data);
        toast.success(apiResponse.data.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setOpenBackdrop(false);
    }
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
          style={{ width: "100%", maxWidth: 500 }}
        >
          <Box
            sx={{
              bgcolor: "background.paper",
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: 6,
              display: "flex",
              flexDirection: "column",
              p: 4,
            }}
          >
            <Box
              sx={{
                width: "100%",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 5,
              }}
            >
              <VerifiedUserIcon
                sx={{ fontSize: 80, color: "secondary.main" }}
              />
            </Box>
            {/* Content Section */}
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h5"
                component="h1"
                gutterBottom
                sx={{ fontWeight: "bold", mb: 2 }}
              >
                Verification Code
              </Typography>

              <Typography variant="body1" sx={{ mb: 4 }}>
                We have sent the verification code to your email{" "}
                {sessionStorage.getItem("email")}
              </Typography>
            </Box>

            <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
              {[0, 1, 2, 3].map((index) => (
                <Grid item key={index}>
                  <TextField
                    id={`code-input-${index}`}
                    variant="outlined"
                    value={code[index]}
                    onChange={(e) => handleChange(index, e.target.value)}
                    slotProps={{
                      input: {
                        maxLength: 1,
                        style: { textAlign: "right", fontSize: "1.6rem" },
                      },
                    }}
                    sx={{
                      width: 60,
                      "& .MuiOutlinedInput-root": {
                        height: 60,
                        padding: 0, // Remove default padding
                        justifyContent: "center", // Center horizontally
                      },
                      "& input": {
                        textAlign: "center", // Additional center alignment
                      },
                    }}
                  />
                </Grid>
              ))}
            </Grid>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                // mt: 2,
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                size="small"
                sx={{ py: 1.5, maxWidth: 300 }}
                onClick={handleSubmit}
              >
                Verify
              </Button>
              <Typography variant="caption">
                {" "}
                Don't receive any code?
              </Typography>
              <Button
                variant="text"
                color="primary"
                fullWidth
                size="small"
                sx={{ maxWidth: 300 }}
                onClick={handleSendAgain}
              >
                Send Again
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Box>
      <ComponentBackdrop openBackdrop={openBackdrop} />
    </ResetPwdLayout>
  );
}
