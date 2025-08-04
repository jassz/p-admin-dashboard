import React, { useState } from "react";
import {
  Box,
  Avatar,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  FormHelperText,
  Typography,
  Paper,
  Stack,
  Modal,
  Divider,
} from "@mui/material";
import {
  LockOutlined as LockOutlinedIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { red } from "@mui/material/colors";
import { Link, useNavigate } from "react-router-dom";
import { Container, createTheme, useMediaQuery, useTheme } from "@mui/system";
import PublicLayout from "../../layouts/loginLayout";
import logo from "./../../assets/images/logo192.png";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ComponentBackdrop from "components/backdrop";
import { bannedDomains } from "data/bannedDomains";
import { passwordRules } from "data/passwordRules";
import Details from "pages/Terms/details";
import PrivacyPolicyModal from "pages/Policy/details";
import { useApiClient } from "context/ApiClientContext";
import axios from "axios";
import toast from "react-hot-toast";
import getErrorMessage from "helper/getErrorMessage";

export default function Signin() {
  const theme = useTheme();
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openTnc, setOpenTnc] = useState(false);
  const [openPolicy, setOpenPolicy] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({ username: "", password: "", client_id: "poisum-admin-portal" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  // const isVerified = true;
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { dashboardApiUrl, accountMgtApiUrl } = useApiClient();

  const handleChange = (field, event) => {
    const value = event.target.value;

    setData({ ...data, [field]: value });
    if (field === "username") {
      const error = validateEmail(value);
      setErrors((data) => ({ ...data, username: error }));
    }

    if (field === "password") {
      const error = validatePassword(value);
      setErrors((data) => ({ ...data, password: error }));
    }
  };

  const checkEmailVerified = async (email) => {
    // var verified = false;
    try {
      const apiResponse = await axios.post(`${dashboardApiUrl}/User/check-email-verified`,
        {
          email
        }
      );
      return apiResponse;
      if (apiResponse.status === 200) {
        const { success, message, data } = apiResponse.data;

        if (success) {
          if (data.isVerify) {
            toast.success(message);
            return true;
          } else {
            toast.error(message);
            return false;
          }
        } 
      }
    }
    catch (error) {
      toast.error(getErrorMessage('12'+error));
      return apiResponse;
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setOpenBackdrop(true);

      if ((errors && Object.keys(errors).length > 0) && (errors.username !== '' || errors.password !== '')) {
        const errorMessage = Object.entries(errors)
          .map(([key, value]) => `${value}`)
          .join("\n");

        toast.error(
          <div style={{ whiteSpace: "pre-line" }}>
            {errorMessage}
          </div>
        );
        return;
      }

      const newErrors = {};
      Object.entries(data).forEach(([key, value]) => {
        const error = validate(key, value);
        if (error) newErrors[key] = error;
      });

      setErrors(newErrors);
      if (Object.keys(newErrors).length > 0 || errors.length > 0) return;

      await new Promise((resolve) => setTimeout(resolve, 3000));

      const verified = await checkEmailVerified(data.username);
      console.log(`Verified: ${verified}`);
      if (verified){
        const result = await axios.post(`${accountMgtApiUrl}/SourceUser/SourceUserLogin`, data);
        const resultPath = result?.data?.data;
        const token = resultPath?.access_token;
        const refreshtoken = resultPath?.access_token;

        localStorage.setItem("token", token);
        localStorage.setItem("refreshtoken", refreshtoken);
        localStorage.setItem("loggedInID", resultPath?.user?.linked_user_id);
        localStorage.setItem("tenantCode", resultPath?.user?.tenant_code);
        localStorage.setItem("mobileApiUrl", resultPath?.user?.tenant_mobile_api_url || "");

        if (result) {
          navigate("/homepage");
        } else {
          setErrors({ form: "Invalid email or password" });
        }
      }
      else{
        navigate("/verify");
      }
      setOpenBackdrop(false);

    } catch (error) {
      if (error.status == 404) {
        if (error.response.data.errorMesage) {
          toast.error(error.response.data.errorMesage);
        } else if (error.response.data.message.error) {
          toast.error(error.response.data.message.error.message);

        } else {
          toast.error('Oops! Page or data not found.');
        }
      } else if (error.status == 400) {
        toast.error('Oops! Looks like your form contains errors. Please review and try again.');
      }
    } finally {
      setOpenBackdrop(false);
    }
  };

  const validate = (name, value) => {
    switch (name) {
      case "username":
        validateEmail(value);
      case "password":
        validatePassword(value);
      default:
        return "";
    }
  };

  const validateEmail = (value) => {
    if (!value) return "Email is required.";

    const domain = value.split("@")[1];

    // if (!/^[\w-.]+@gosumgroup\.com$/.test(value)) {
    //   return "Email must be a @gosumgroup.com address.";
    // }

    if (bannedDomains.includes(domain)) {
      return `Emails from ${domain} are not allowed. Use your work email address.`;
    }

    return ""; // valid
  };

  const validatePassword = (value) => {
    if (!value) return "Password is required.";
    if (value.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(value))
      return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(value))
      return "Password must contain at least one lowercase letter";
    if (!/[0-9]/.test(value))
      return "Password must contain at least one number";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
      return "Password must contain at least one special character";
    return "";
  };

  const handleClose = (type) => {
    if (type === "tnc") {
      setOpenTnc(false);
    } else if (type === "privacy") {
      setOpenPolicy(false);
    }
  };

  const handleOpen = (type) => {
    if (type === "tnc") {
      setOpenTnc(true);
    } else if (type === "privacy") {
      setOpenPolicy(true);
    }
  };

  return (
    <PublicLayout>
      <Container
        maxWidth={false}
        sx={{
          flexDirection: "column",
          width: "100%",
          maxWidth: 720, // Will not exceed 420px, but fills available space
          mx: "auto",
        }}
      >
        <Typography variant="h5">Sign In Now</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {" Don't have an account? "}
          <Link color="inherit" to="/signup">
            Sign up here
          </Link>
        </Typography>
        <Container
          component={Paper}
          elevation={6}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 2,
            backdropFilter: "blur(10px)", // optional for frosted glass look
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            maxHeight: '80vh', // or your desired height
            overflow: 'auto', // enables scrolling
          }}
        >
          <Avatar sx={{ bgcolor: "secondary.main", mb: 2 }}>
            {/* <LockOutlinedIcon /> */}
            <Box
              component="img"
              src={logo} // replace with your image path
              alt="Logo"
              sx={{ width: 50, height: 50 }}
            />
          </Avatar>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ width: "100%" }}
            noValidate
          >
            <TextField
              label="Email"
              id="username"
              name="email"
              type="email"
              value={data.username}
              onChange={(e) => handleChange("username", e)}
              error={!!errors.username}
              helperText={errors.username}
              margin="dense"
              size="small"
              fullWidth
              autoFocus
            />

            <TextField
              label="Password"
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={data.password}
              onChange={(e) => handleChange("password", e)}
              error={errors.password}
              helperText={
                errors.password == "Password is required." ||
                  data.password == ""
                  ? errors.password
                  : ""
              }
              margin="dense"
              size="small"
              fullWidth
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                      >
                        {!showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            {data.password && errors.password && (
              <Stack spacing={0.5} pl={2}>
                {passwordRules.map((rule, idx) => {
                  const passed = rule.test(data.password);
                  return (
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      key={idx}
                    >
                      {passed ? (
                        <CheckCircleIcon
                          fontSize="small"
                          sx={{ color: "green" }}
                        />
                      ) : (
                        <CancelIcon fontSize="small" sx={{ color: "red" }} />
                      )}
                      <Typography
                        variant="caption"
                        sx={{ color: passed ? "green" : "red" }}
                      >
                        {rule.label}
                      </Typography>
                    </Stack>
                  );
                })}
              </Stack>
            )}

            {errors.form && (
              <FormHelperText
                sx={{ color: red[700], textAlign: "center", marginBottom: 2 }}
              >
                {errors.form}
              </FormHelperText>
            )}
            {/* <Box mt={2}>
              <Typography variant="caption">
                By signing in, you agree to Poisum's{" "}
                <Link
                  to="/tnc"
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                >
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacyPolicy"
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                >
                  Privacy Policy
                </Link>
                .
              </Typography>
            </Box> */}

            {/* <Box mt={2}>
              <Typography variant="caption">
                By signing in, you agree to Poisum's{" "}
                <Typography
                  component="span"
                  variant="caption"
                  onClick={() => handleOpen("tnc")}
                  sx={{
                    textDecoration: "underline",
                    cursor: "pointer",
                    color: "primary.main",
                  }}
                >
                  Terms & Conditions
                </Typography>{" "}
                and{" "}
                <Typography
                  component="span"
                  variant="caption"
                  onClick={() => handleOpen("privacy")}
                  sx={{
                    textDecoration: "underline",
                    cursor: "pointer",
                    color: "primary.main",
                  }}
                >
                  Privacy Policy
                </Typography>
                .
              </Typography>
            </Box> */}

            <Box mt={2}>
              {/* Always visible part */}
              <Typography variant="caption">
                By signing up to POISUM, I hereby consent to the collection,
                processing, and use of my personal data by Gosum Consulting
                Group Sdn. Bhd. in accordance with the{" "}
                <Typography
                  component="span"
                  variant="caption"
                  onClick={() => handleOpen("tnc")}
                  sx={{
                    textDecoration: "underline",
                    cursor: "pointer",
                    color: "primary.main",
                  }}
                >
                  Terms & Conditions
                </Typography>{" "}
                and{" "}
                <Typography
                  component="span"
                  variant="caption"
                  onClick={() => handleOpen("privacy")}
                  sx={{
                    textDecoration: "underline",
                    cursor: "pointer",
                    color: "primary.main",
                  }}
                >
                  Privacy Policy
                </Typography>
                .
              </Typography>

              {(
                <>
                  <Divider sx={{ my: 1, borderColor: "transparent" }} />
                  <Typography variant="caption">
                    I understand that my data will be used for platform
                    functionality, engagement tracking, and performance
                    analytics within my organization.
                  </Typography>
                  <Divider sx={{ my: 1, borderColor: "transparent" }} />
                  <Typography variant="caption">
                    I also acknowledge that I may withdraw my consent or request
                    data access or correction at any time by contacting{" "}
                    <Typography
                      component="span"
                      variant="caption"
                      onClick={() => handleOpen("privacy")}
                      sx={{
                        textDecoration: "underline",
                        cursor: "pointer",
                        color: "primary.main",
                      }}
                    >
                      privacy@poisum.com
                    </Typography>
                    .
                  </Typography>
                </>
              )}

              {/* See more / See less button */}
              {/* <Box mt={1} display={"flex"} justifyContent={"center"}>
                            <Typography
                              variant="caption"
                              onClick={() => setShowMore(!showMore)}
                              sx={{
                                cursor: "pointer",
                                color: "primary.main",
                                textDecoration: "underline",
                              }}
                            >
                              {showMore ? "See less" : "See more"}
                            </Typography>
                          </Box> */}
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ backgroundColor: "secondary.main" }}
            >
              Sign In
            </Button>
            {/* <Box display={"flex"} justifyContent={"center"}>
              <Typography variant="overline" fullWidth>
                V1.0.1
              </Typography>
            </Box> */}
          </Box>
        </Container>
      </Container>
      <ComponentBackdrop openBackdrop={openBackdrop} />
      {openTnc && (
        <Modal open={openTnc} onClose={() => handleClose("tnc")}>
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 2, // space outside modal (padding)
              backgroundColor: "rgba(0, 0, 0, 0.4)", // optional: dimmed background
            }}
          >
            <Box
              sx={{
                maxHeight: "90vh",
                width: "100%",
                maxWidth: 900,
                overflowY: "auto",
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "tertiary.dark",
                boxShadow: 10,
                p: 3,
                borderRadius: 4,
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none", // IE 10+
                "&::-webkit-scrollbar": {
                  display: "none", // Chrome, Safari
                },
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexDirection="row"
              >
                <Typography
                  variant={isMobile ? "h6" : "h4"}
                  fontWeight="bold"
                  textTransform={"uppercase"}
                >
                  POISUM’s Terms & Conditions
                </Typography>
                <CloseIcon onClick={() => handleClose("tnc")} sx={{ cursor: "pointer" }} />
              </Box>

              <Divider sx={{ my: 3, borderColor: "tertiary.main" }} />

              <Details />
            </Box>
          </Box>
        </Modal>
      )}

      {openPolicy && (
        <Modal open={openPolicy} onClose={() => handleClose("privacy")}>
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 2, // space outside modal (padding)
              backgroundColor: "rgba(0, 0, 0, 0.4)", // optional: dimmed background
            }}
          >
            <Box
              sx={{
                maxHeight: "90vh",
                width: { xs: "100%", sm: 900 },
                overflowY: "auto",
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "tertiary.dark",
                boxShadow: 10,
                p: 3,
                borderRadius: 4,
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none", // IE 10+
                "&::-webkit-scrollbar": {
                  display: "none", // Chrome, Safari
                },
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexDirection="row"
              >
                <Typography
                  variant={isMobile ? "h6" : "h4"}
                  fontWeight="bold"
                  textTransform={"uppercase"}
                >
                  POISUM’s Privacy Policy
                </Typography>
                <CloseIcon onClick={() => handleClose("privacy")} sx={{ cursor: "pointer" }} />

              </Box>

              <Divider sx={{ my: 3, borderColor: "tertiary.main" }} />

              <PrivacyPolicyModal />
            </Box>
          </Box>
        </Modal>
      )}
    </PublicLayout>
  );
}
