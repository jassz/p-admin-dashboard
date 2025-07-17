import {
  Box,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ButtonComponent from "components/button";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useApiClient } from "context/ApiClientContext";
import { toast } from "react-toastify";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PwdErrorMessage from "components/pwdErrorMessage";
import { useNavigate } from "react-router-dom";
import ComponentBackdrop from "components/backdrop";

export default function ChangePwd() {

  const apiClient = useApiClient();
  //   const [data, setData] = useState({});
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showTempPassword, setShowTempPassword] = useState(false);
  const [changePassword, setChangePassword] = useState();
  const navigate = useNavigate();
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const labelWidth = 170;

  const [errors, setErrors] = useState({
    newPassword: "",
    tempPassword: "",
    confirmPassword: "",
  });

  const [inputForm, setInputForm] = useState({
    tempPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleClose = () => {
    setInputForm({});
    setErrors({});

    setShowNewPassword(false);
    setShowTempPassword(false);
    setShowConfirmPassword(false);

    setChangePassword(false);
  };

  const handleChange = (property, event) => {
    const value = event.target.value;

    setInputForm({ ...inputForm, [property]: value });

    if (property === "tempPassword") {
      const error = validate(property, value);
      setErrors((inputForm) => ({ ...inputForm, tempPassword: error }));
    }
    if (property === "newPassword") {
      const error = validate(property, value);
      setErrors((inputForm) => ({ ...inputForm, newPassword: error }));
    }
    if (property === "confirmPassword") {
      const error = validate(property, value);
      setErrors((inputForm) => ({ ...inputForm, confirmPassword: error }));
    }
  };

  const validate = (name, value) => {
    switch (name) {
      case "confirmPassword":
        if (!value) return "Confirm password is required";
        if (value != inputForm.newPassword) return "Confirm password must be same with new password";
        if (value.length < 8)
          return "Confirm password must be at least 8 characters";
        if (!/[A-Z]/.test(value))
          return "Confirm password must contain at least one uppercase letter";
        if (!/[a-z]/.test(value))
          return "Confirm password must contain at least one lowercase letter";
        if (!/[0-9]/.test(value))
          return "Confirm password must contain at least one number";
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
          return "Confirm password must contain at least one special character";
        return "";

      case "tempPassword":
        if (!value) return "Temporary password is required";
        if (value.length < 8)
          return "Temporary password must be at least 8 characters";
        if (!/[A-Z]/.test(value))
          return "Temporary password must contain at least one uppercase letter";
        if (!/[a-z]/.test(value))
          return "Temporary password must contain at least one lowercase letter";
        if (!/[0-9]/.test(value))
          return "Temporary password must contain at least one number";
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
          return "Temporary password must contain at least one special character";
        return "";

      case "newPassword":
        if (!value) return "New password is required";
        
        if (value.length < 8)
          return "New password must be at least 8 characters";
        if (!/[A-Z]/.test(value))
          return "New password must contain at least one uppercase letter";
        if (!/[a-z]/.test(value))
          return "New password must contain at least one lowercase letter";
        if (!/[0-9]/.test(value))
          return "New password must contain at least one number";
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
          return "New password must contain at least one special character";
        return "";

      default:
        return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.entries(inputForm).forEach(([key, value]) => {
      const error = validate(key, value);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const toastId = toast.loading("Saving data...", {
      position: "top-right",
    });
    try {
              setOpenBackdrop(true);

      await new Promise((resolve) => setTimeout(resolve, 3000));

      let response = "";

      const { newPassword, confirmPassword, tempPassword } = inputForm;

      // response = await axios.put(
      //   `${apiClient}/user/${id}/chgpwd`,
      //   {
      //     id: id,
      //     userName: userName,
      //     password: password,
      //     tempPassword: tempPassword,
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
    //   setTimeout(() => {
        // window.location.reload();
        navigate("/homepage");
    //   }, 3000);
    } catch (error) {
      // ErrorAlert(error, navigate);
      toast.update(toastId, {
        render: error.response.data || "An error occurred.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      //   }
    }finally {
      setOpenBackdrop(false);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        border: "1px solid tertiary.dark",
        boxShadow: 10,
        p: 3,
        borderRadius: 4,
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body1" fontWeight="bold">
          Reset New Password
        </Typography>
        <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
      </Box>
      <Divider sx={{ my: 3, borderColor: "tertiary.main" }} />

      <Box display="flex">
        <Typography
          display="flex"
          alignItems="center"
          pr={4}
          sx={{ minWidth: labelWidth }}
        >
          Temporary Password
        </Typography>
        <TextField
          id="tempPassword"
          name="tempPassword"
          type={showTempPassword ? "text" : "password"}
          value={inputForm.tempPassword}
          onChange={(e) => handleChange("tempPassword", e)}
          error={errors.tempPassword}
          helperText={
            errors.tempPassword == "Temporary password is required." ||
            inputForm.tempPassword == ""
              ? errors.tempPassword
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
                    onClick={() => setShowTempPassword((prev) => !prev)}
                    edge="end"
                  >
                    {!showTempPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
      <Grid size={{ xs: "grow", md: 6 }} offset={{ md: 3 }}>
        <PwdErrorMessage
          field={inputForm.tempPassword}
          error={errors.tempPassword}
        />
      </Grid>

      <Box display="flex">
        <Typography
          display="flex"
          alignItems="center"
          pr={4}
          sx={{ minWidth: labelWidth }}
        >
          New Password
        </Typography>
        <TextField
          id="newPassword"
          name="newPassword"
          type={showNewPassword ? "text" : "password"}
          value={inputForm.newPassword}
          onChange={(e) => handleChange("newPassword", e)}
          error={errors.newPassword}
          helperText={
            errors.newPassword == "New password is required." ||
            inputForm.newPassword == ""
              ? errors.newPassword
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
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    edge="end"
                  >
                    {!showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
     <Grid size={{ xs: "grow", md: 6 }} offset={{ md: 3 }}>
        <PwdErrorMessage
          field={inputForm.newPassword}
          error={errors.newPassword}
        />
      </Grid>
      <Box display="flex">
        <Typography
          display="flex"
          alignItems="center"
          pr={4}
          sx={{ minWidth: labelWidth }}
        >
          Confirm Password
        </Typography>
        <TextField
          id="confirmPassword"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          value={inputForm.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e)}
          error={errors.confirmPassword}
          helperText={
            errors.confirmPassword == "Confirm password is required." ||
            inputForm.confirmPassword == ""
              ? errors.confirmPassword
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
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    edge="end"
                  >
                    {!showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
      <Grid size={{ xs: "grow", md: 6 }} offset={{ md: 3 }}>
        <PwdErrorMessage
          field={inputForm.confirmPassword}
          error={errors.confirmPassword}
          newPwd={inputForm.newPassword}
        />
      </Grid>
      <Box display="flex" justifyContent="center" style={{ marginTop: "30px" }}>
        <ButtonComponent
          value="contained"
          text="Update Password"
          callback={handleSubmit}
          color="primary"
        />
      </Box>
    <ComponentBackdrop openBackdrop={openBackdrop} />
      
    </Box>
  );
}
