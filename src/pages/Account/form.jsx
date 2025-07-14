import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  FormControl,
  FormHelperText,
  OutlinedInput,
  InputAdornment,
  IconButton,
  TextField,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useApiClient } from "context/ApiClientContext";
import ErrorAlert from "helper/errorAlert";
import ButtonComponent from "components/button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UserForm({
  inputForm,
  handleInputChange,
  //   roleList,
}) {
  const labelWidth = 170;
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showoldPassword, setShowoldPassword] = useState(false);
  const [showconfPassword, setShowconfPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({});
  const apiClient = useApiClient();
  const [openForm, setOpenForm] = useState(false);
  const handleCloseForm = () => {
    setOpenForm(false);
  };
  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleOpen = () => {
    setChangePassword(!changePassword);
  };
  const handleClose = () => {
    inputForm.oldPassword = "";
    inputForm.password = "";
    inputForm.confPassword = "";
    setData({});
    setErrors({});

    setShowPassword(false);
    setShowoldPassword(false);
    setShowconfPassword(false);

    setChangePassword(false);
  };

  const [changePassword, setChangePassword] = useState();
  const [errors, setErrors] = useState({
    id: "",
    userName: "",
    email: "",
    roleid: "",
    lastcompany: "",
    password: "",
    oldPassword: "",
    confirmPassword: "",
  });

  const validate = (name, value) => {
    switch (name) {
      case "userName":
        if (!value.trim()) return "Username is required";
        return "";
      case "oldPassword":
        if (!value) return "Password is required";
        return "";
      case "password":
        if (!value) return "Password is required";
        return "";
      case "confirmPassword":
        if (!value) return "Confirm Password is required";
        if (value !== inputForm.password)
          return "Confirm password not match with new password";
        return "";
      default:
        return "";
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowoldPassword = () => setShowoldPassword((show) => !show);
  const handleClickShowconfPassword = () =>
    setShowconfPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (property, event) => {
    const dataCopy = { ...data };
    dataCopy[property] =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setData(dataCopy);

    handleInputChange(property, event.target.value);

    const error = validate(property, event.target.value);
    setErrors({ ...errors, [property]: error });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!data.oldPassword) newErrors.oldPassword = "Old Password is required";
    if (!data.password) {
      newErrors.password = "New Password is required";
    }
    if (data.oldPassword && data.oldPassword === data.password) {
      newErrors.password = "Old password cannot be the same as New password";
    }
    if (!data.confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required";
    if (data.confirmPassword !== data.password) {
      newErrors.confirmPassword =
        "Confirm password not match with new password";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async (e) => {
    if (validateForm()) {
      handleOpenForm();

      const toastId = toast.loading("Saving data...", {
        position: "top-right",
      });
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        let response = "";

        const { id, userName, password, oldPassword } = inputForm;

        response = await axios.put(
          `${apiClient}/user/${id}/chgpwd`,
          {
            id: id,
            userName: userName,
            password: password,
            oldPassword: oldPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              Accept: "application/json",
            },
          }
        );

        toast.update(toastId, {
          render: "Profile has been updated.",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });

        // Instead of window.location.reload(), update state or navigate
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } catch (error) {
        // ErrorAlert(error, navigate);
        toast.update(toastId, {
          render: error.response.data || "An error occurred.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      } finally {
        handleCloseForm();
      }
    }
  };

  return (
    <Box width={'100%'}>
      {/* <Box display="flex" justifyContent="end">
        <Button size="small" onClick={handleOpen}>
          Change Password
        </Button>

        {changePassword && (
          <Modal open={changePassword}>
            <Box sx={style}>
              <Box>
                <Box display="flex" justifyContent="end" marginBottom="5px">
                  <CloseIcon
                    onClick={handleClose}
                    style={{ cursor: "pointer" }}
                  />
                </Box>
                <Box display="flex" mb={2}>
                  <Typography
                    display="flex"
                    alignItems="center"
                    pr={4}
                    sx={{ minWidth: labelWidth }}
                  >
                    Old Password
                  </Typography>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    helperText={errors.oldPassword}
                    error={!!errors.oldPassword}
                    value={inputForm.oldPassword}
                    required
                    margin="dense"
                    type="password"
                    size="small"
                    style={{
                      marginBottom: errors.oldPassword ? "-16px" : "10px",
                    }}
                  >
                    <OutlinedInput
                      id="oldPassword"
                      type={showoldPassword ? "text" : "password"}
                      onChange={(e) => handleChange("oldPassword", e)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowoldPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {!showoldPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {errors.oldPassword && (
                      <FormHelperText
                        style={{ color: red[700], fontSize: "0.75rem" }}
                      >
                        {errors.oldPassword}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Box>
                <Box display="flex" mb={2}>
                  <Typography
                    display="flex"
                    alignItems="center"
                    pr={4}
                    sx={{ minWidth: labelWidth }}
                  >
                    New Password
                  </Typography>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    helperText={errors.password}
                    error={!!errors.password}
                    value={inputForm.password}
                    required
                    margin="dense"
                    type="password"
                    size="small"
                    style={{ marginBottom: errors.password ? "-16px" : "10px" }}
                  >
                    <OutlinedInput
                      id="password"
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => handleChange("password", e)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {!showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {errors.password && (
                      <FormHelperText
                        style={{ color: red[700], fontSize: "0.75rem" }}
                      >
                        {errors.password}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Box>
                <Box display="flex" mb={2}>
                  <Typography
                    display="flex"
                    alignItems="center"
                    pr={2}
                    sx={{ minWidth: labelWidth }}
                  >
                    Confirm Password
                  </Typography>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    helperText={errors.confirmPassword}
                    error={!!errors.confirmPassword}
                    value={inputForm.confirmPassword}
                    required
                    margin="dense"
                    type="password"
                    size="small"
                    style={{
                      marginBottom: errors.confirmPassword ? "-16px" : "10px",
                    }}
                  >
                    <OutlinedInput
                      id="confirmPassword"
                      type={showconfPassword ? "text" : "password"}
                      onChange={(e) => handleChange("confirmPassword", e)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowconfPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {!showconfPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {errors.confirmPassword && (
                      <FormHelperText
                        style={{ color: red[700], fontSize: "0.75rem" }}
                      >
                        {errors.confirmPassword}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  style={{ marginTop: "30px" }}
                >
                  <Button
                    variant="contained"
                    size="medium"
                    onClick={handleSubmit}
                  >
                    Update Password
                  </Button>
                </Box>
              </Box>
            </Box>
          </Modal>
        )}
      </Box> */}

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item size={6}>
          <Box display="flex" mb={2}>
            <Typography
              display="flex"
              alignItems="center"
              pr={4}
              sx={{ minWidth: labelWidth }}
            >
              Full Name
            </Typography>
            <TextField
              error={!!errors.userName}
              helperText={errors.userName}
              type="text"
              onChange={(e) => handleChange("userName", e)}
              value={inputForm.userName}
              required
              margin="dense"
              id="userName"
              fullWidth
              size="small"
            />
          </Box>
          <Box display="flex" mb={2}>
            <Typography
              display="flex"
              alignItems="center"
              pr={4}
              sx={{ minWidth: labelWidth }}
            >
              Email
            </Typography>
            <TextField
              error={!!errors.email}
              helperText={errors.email}
              type="text"
              onChange={(e) => handleChange("email", e)}
              value={inputForm.email}
              required
              margin="dense"
              id="email"
              fullWidth
              disabled
              size="small"
            />
          </Box>
        </Grid>
        <Grid item size={6}>
          <Box display="flex" mb={2}>
            <Typography
              display="flex"
              alignItems="center"
              pr={4}
              sx={{ minWidth: labelWidth }}
            >
              Company Name
            </Typography>
            <TextField
              error={!!errors.company}
              helperText={errors.company}
              type="text"
              onChange={(e) => handleChange("company", e)}
              value={inputForm.company}
              required
              margin="dense"
              id="company"
              fullWidth
              disabled
              size="small"
            />

          </Box>

           <Box display="flex" mb={2}>
            <Typography
              display="flex"
              alignItems="center"
              pr={4}
              sx={{ minWidth: labelWidth }}
            >
              Country
            </Typography>
            <TextField
              error={!!errors.country}
              helperText={errors.country}
              type="text"
              onChange={(e) => handleChange("country", e)}
              value={inputForm.country}
              required
              margin="dense"
              id="country"
              fullWidth
              disabled
              size="small"
            />

          </Box>
        </Grid>
      </Grid>
                    <ButtonComponent value="contained" text="Save" alignItems={'end'} callback={handleSubmit} />
      
    </Box>
  );
}
