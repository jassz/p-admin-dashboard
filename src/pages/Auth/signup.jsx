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
  Divider,
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
import PublicLayout from "../../layouts/signupLayout";
import logo from "./../../assets/images/logo192.png";

export default function Signup() {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field, event) => {
    setData({ ...data, [field]: event.target.value });
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
        return "";
      case "password":
        if (!value) return "Password is required";
        return "";
      default:
        return "";
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
          <Avatar sx={{ bgcolor: "primary.main", mb: 2 }}>
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
              autoFocus
            />

            <FormControl
              variant="outlined"
              fullWidth
              margin="dense"
              size="small"
              error={!!errors.password}
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={data.password}
                onChange={(e) => handleChange("password", e)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {errors.password && (
                <FormHelperText sx={{ color: red[700] }}>
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

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
              autoFocus
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
              autoFocus
            />
            <TextField
              label="Country"
              id="country"
              name="country"
              type="text"
              value={data.email}
              onChange={(e) => handleChange("email", e)}
              error={!!errors.email}
              helperText={errors.email}
              margin="dense"
              size="small"
              fullWidth
              autoFocus
            />

            {errors.form && (
              <FormHelperText
                sx={{ color: red[700], textAlign: "center", marginBottom: 2 }}
              >
                {errors.form}
              </FormHelperText>
            )}
            <Box mt={2}>
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
            </Box>

            <Button type="submit" variant="contained" fullWidth>
              Sign Up
            </Button>
            <Box display={"flex"} justifyContent={"center"}>
              <Typography variant="overline" fullWidth>
                V1.0.0
              </Typography>
            </Box>
            {/* <Divider sx={{ borderColor:'transparent'}} /> */}
          </Box>
        </Container>
      </Container>
    </PublicLayout>
  );
}
