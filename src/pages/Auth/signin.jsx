import React, { useState } from "react";
import {
  Box,
  Avatar,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import {
  LockOutlined as LockOutlinedIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { red } from "@mui/material/colors";
import { Link, useNavigate } from "react-router-dom";
import { Container, createTheme } from "@mui/system";
import PublicLayout from "../../layouts/loginLayout";
import logo from "./../../assets/images/logo192.png";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export default function Signin() {
  const passwordRules = [
    {
      label: "Minimum 8 characters",
      test: (pwd) => pwd.length >= 8,
    },
    {
      label: "At least 1 uppercase letter",
      test: (pwd) => /[A-Z]/.test(pwd),
    },
    {
      label: "At least 1 lowercase letter",
      test: (pwd) => /[a-z]/.test(pwd),
    },
    {
      label: "At least 1 number",
      test: (pwd) => /\d/.test(pwd),
    },
    {
      label: "At least 1 special character (!@#$...)",
      test: (pwd) => /[^A-Za-z0-9]/.test(pwd),
    },
  ];

  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
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
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
        navigate("/homepage");
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
        if (!value.trim()) return "Email is required";
        if (!/^[\w-.]+@gosumgroup\.com$/.test(value)) {
          return "Email must be a @gosumgroup.com address.";
        }
        return "";
      case "password":
        if (!value) return "Password is required";
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
      default:
        return "";
    }
  };

  const validateEmail = (email) => {
    if (!email) return "Email is required.";
    if (!/^[\w-.]+@gosumgroup\.com$/.test(email)) {
      return "Email must be a @gosumgroup.com address.";
    }
    return "";
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
          }}
        >
          <Avatar sx={{ bgcolor: "primary.main", mb: 2 }}>
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
            <Box mt={2}>
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
            </Box>

            <Button type="submit" variant="contained" fullWidth>
              Sign In
            </Button>
            <Box display={"flex"} justifyContent={"center"}>
              <Typography variant="overline" fullWidth>
                V1.0.1
              </Typography>
            </Box>
          </Box>
        </Container>
      </Container>
    </PublicLayout>
  );
}
