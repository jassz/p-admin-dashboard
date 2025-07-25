import React, { useState } from "react";
import {
  Modal,
  Divider,
  Box,
  Avatar,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  FormHelperText,
  Typography,
  Paper,
  MenuItem,
} from "@mui/material";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import { Link, useNavigate } from "react-router-dom";
import { Container, Stack, useMediaQuery, useTheme } from "@mui/system";
import PublicLayout from "../../layouts/signupLayout";
import logo from "./../../assets/images/logo192.png";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { bannedDomains } from "data/bannedDomains";
import { passwordRules } from "data/passwordRules";
import { countries } from "data/countries";
import Details from "pages/Terms/details";
import PrivacyPolicyModal from "pages/Policy/details";
import CloseIcon from "@mui/icons-material/Close";

export default function Signup() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openTnc, setOpenTnc] = useState(false);
  const [openPolicy, setOpenPolicy] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
    fullname: "",
    company: "",
    country: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field, event) => {
    const value = event.target.value;

    setData({ ...data, [field]: value });

    if (field === "email") {
      const error = validateEmail(value);
      setErrors((data) => ({ ...data, email: error }));
    }

    if (field === "password") {
      const error = validatePassword(value);
      setErrors((data) => ({ ...data, password: error }));
    }
    if (field === "fullname") {
      const error = validate(field, value);
      setErrors((data) => ({ ...data, fullname: error }));
    }
    if (field === "company") {
      const error = validate(field, value);
      setErrors((data) => ({ ...data, company: error }));
    }
    if (field === "country") {
      const error = validate(field, value);
      setErrors((data) => ({ ...data, country: error }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {};
    Object.entries(data).forEach(([key, value]) => {
      const error = validate(key, value);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const result = true;
      // const result = await axios.post(`${apiClient}/user/login`, data);
      console.log("Login response:", result);

      if (result) {
        // localStorage.setItem("loggedInID", result.data.id);
        navigate("/step1");
      } else {
        setErrors({ form: "Invalid email or password" });
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrors({ form: "Unexpected error occurred. Please try again." });
    }
  };

  const validate = (name, value) => {
    switch (name) {
      case "email":
        validateEmail();
      case "password":
        validatePassword();
      case "fullname":
        if (!value) return "Full name is required";
        return "";
      case "company":
        if (!value) return "Company name is required";
        return "";
      case "country":
        if (!value) return "Country is required";
        return "";
      default:
        return "";
    }
  };

  const validateEmail = (value) => {
    if (!value) return "Email is required.";

    const domain = value.split("@")[1];

    if (!/^[\w-.]+@gosumgroup\.com$/.test(value)) {
      return "Email must be a @gosumgroup.com address.";
    }

    if (bannedDomains.includes(domain)) {
      return `Emails from ${domain} are not allowed. Use your @gosumgroup.com address.`;
    }

    return ""; // valid
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required.";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(password))
      return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(password))
      return "Password must contain at least one lowercase letter";
    if (!/[0-9]/.test(password))
      return "Password must contain at least one number";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
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
        <Typography variant="h4" fontWeight="bold">
          Welcome to Poisum
        </Typography>
        <Typography variant="body2" color="textSecondary" mb={3}>
          {
            "Sign up now with no credit card required. Already have an account? "
          }{" "}
          <Link color="inherit" to="/signin">
            Sign in here
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
          {/* <Typography component="h1" variant="h5" mb={2}>
            Sign Up
          </Typography> */}

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ width: "100%" }}
            noValidate
          >
            <TextField
              label="Email"
              id="email"
              name="email"
              type="email"
              value={data.email}
              onChange={(e) => handleChange("email", e)}
              error={!!errors.email}
              helperText={errors.email}
              margin="dense"
              size="small"
              fullWidth
            />

            <TextField
              label="Password"
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={data.password}
              onChange={(e) => handleChange("password", e)}
              error={!!errors.password}
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
            <TextField
              label="Full Name"
              id="fullname"
              name="fullname"
              type="text"
              value={data.fullname}
              onChange={(e) => handleChange("fullname", e)}
              error={!!errors.fullname}
              helperText={errors.fullname}
              margin="dense"
              size="small"
              fullWidth
            />
            <TextField
              label="Company Name"
              id="company"
              name="company"
              type="text"
              value={data.company}
              onChange={(e) => handleChange("company", e)}
              error={!!errors.company}
              helperText={errors.company}
              margin="dense"
              size="small"
              fullWidth
            />
            <TextField
              select
              label="Country"
              id="country"
              name="country"
              value={data.country}
              onChange={(e) => handleChange("country", e)}
              error={!!errors.country}
              helperText={errors.country}
              margin="dense"
              size="small"
              fullWidth
            >
              {countries.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </TextField>

            {errors.form && (
              <FormHelperText
                sx={{ color: red[700], textAlign: "center", marginBottom: 2 }}
              >
                {errors.form}
              </FormHelperText>
            )}
            {/* <Box mt={2}>
              <Typography variant="caption">
                By signing up, you agree to Poisum's{" "}
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

              {/* Conditionally shown content */}
              {showMore && (
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
              <Box mt={1} display={"flex"} justifyContent={"center"}>
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
              </Box>
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ backgroundColor: "secondary.main" }}
            >
              Sign Up
            </Button>
            {/* <Box display={"flex"} justifyContent={"center"}>
              <Typography variant="overline" fullWidth>
                V1.0.1
              </Typography>
            </Box> */}
            {/* <Divider sx={{ borderColor:'transparent'}} /> */}
          </Box>
        </Container>
      </Container>

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
                <CloseIcon onClick={() => handleClose("tnc")} />
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
                <CloseIcon onClick={() => handleClose("privacy")} />
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
