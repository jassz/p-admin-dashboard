import React, { useState } from "react";
import {
  Box,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  Modal,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import ButtonComponent from "components/button";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import axios from "axios";
import { useApiClient } from "context/ApiClientContext";

export default function ChangePasswordSection() {
  const [changePassword, setChangePassword] = useState();
  const [data, setData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);
  const [showoldPassword, setShowoldPassword] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const apiClient = useApiClient();
  
  const labelWidth = 170;

  const [errors, setErrors] = useState({
    password: "",
    oldPassword: "",
    confirmPassword: "",
  });

    const [inputForm, setInputForm] = useState({
      oldPassword: "",
      password: "",
      confirmPassword: "",
    });

  const handleInputChange = (property, value) => {
    setInputForm((prevState) => ({
      ...prevState,
      [property]: value,
    }));
  };

 const handleCloseForm = () => {
    setOpenForm(false);
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
    setShowconfirmPassword(false);

    setChangePassword(false);
  };

  const validate = (name, value) => {
    switch (name) {
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
    setShowconfirmPassword((show) => !show);
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

  const handleOpenForm = () => {
    setOpenForm(true);
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

 
  //change password submission function
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

        // response = await axios.put(
        //   `${apiClient}/user/${id}/chgpwd`,
        //   {
        //     id: id,
        //     userName: userName,
        //     password: password,
        //     oldPassword: oldPassword,
        //   },
        //   {
        //     headers: {
        //       Authorization: `Bearer ${localStorage.getItem("token")}`,
        //       Accept: "application/json",
        //     },
        //   }
        // );

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
  

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "1px solid tertiary.dark",
    boxShadow: 10,
    p: 3,
    borderRadius: 4, // You can adjust this number or use '8px' etc.
    };

  return (
    <Paper
      sx={{
        borderRadius: 4,
        border: "1px solid tertiary.main",
        boxShadow: 5,
        padding: 3,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Typography
            variant="body2"
            fontWeight="bold"
            sx={{ textTransform: "uppercase" }}
          >
            Change New Password
          </Typography>
          <Typography
            variant="caption"
            color="secondary.main"
            fontWeight="light"
          >
            You may change your new password here
          </Typography>
        </Box>

        <ButtonComponent
          value="contained"
          callback={handleOpen}
          color="primary"
          text="Change Password"
        />

        {changePassword && (
                  <Modal open={changePassword}>
                    <Box sx={style}>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="body1" fontWeight="bold">
                          Reset New Password
                        </Typography>
                        <CloseIcon
                          onClick={handleClose}
                          style={{ cursor: "pointer" }}
                        />
                      </Box>
                      <Divider sx={{ my: 3, borderColor: "tertiary.main" }} />
        
                      <Box display="flex">
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
                              style={{ color: 'error', fontSize: "0.75rem" }}
                            >
                              {errors.oldPassword}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Box>
                      <Box display="flex">
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
                              style={{ color: 'error', fontSize: "0.75rem" }}
                            >
                              {errors.password}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Box>
                      <Box display="flex">
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
                         
                        >
                          <OutlinedInput
                            id="confirmPassword"
                            type={showconfirmPassword ? "text" : "password"}
                            onChange={(e) => handleChange("confirmPassword", e)}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={handleClickShowconfPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {!showconfirmPassword ? (
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
                              style={{ color: 'error', fontSize: "0.75rem" }}
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
                        <ButtonComponent
                          value="contained"
                          text="Update Password"
                          callback={handleSubmit}
                          color="primary"
                        />
                      </Box>
                    </Box>
                  </Modal>
                )}
      </Box>
    </Paper>
  );
}
