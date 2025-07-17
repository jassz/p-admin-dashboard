import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Divider,
  MenuItem,
} from "@mui/material";
import { useApiClient } from "context/ApiClientContext";
import ButtonComponent from "components/button";


export default function UserForm({
  inputForm,
  handleInputChange,
  submit,
}) {
  const labelWidth = 170;
  const countries = ["Malaysia", "Singapore"];

  const [data, setData] = useState({});

  const [errors, setErrors] = useState({
    id: "",
    userName: "",
    email: "",
    roleid: "",
    lastcompany: "",
  });

  const validate = (name, value) => {
    switch (name) {
      case "userName":
        if (!value.trim()) return "Username is required";
        return "";
      case "company":
        if (!value.trim()) return "Company is required";
        return "";
      case "country":
        if (!value.trim()) return "Country is required";
        return "";
      default:
        return "";
    }
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

  return (
    <Box padding={3} sx={{ borderRadius: 4 }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item size={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center" >
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ textTransform: "uppercase" }}
            >
              Personal Details
            </Typography>
            <ButtonComponent
              value="contained"
              text="Save"
              callback={submit}
              color="primary"
            />
          </Box>
        <Divider sx={{ my: 2, borderColor: "tertiary.main" }} />

          <Box display="flex">
            <Typography
              display="flex"
              alignItems="center"
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
              variant="standard"
              fontSize="30"
            />
          </Box>
          <Box display="flex">
            <Typography
              display="flex"
              alignItems="center"
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

          <Box display="flex">
            <Typography
              display="flex"
              alignItems="center"
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
              size="small"
            />
          </Box>

          <Box display="flex">
            <Typography
              display="flex"
              alignItems="center"
              sx={{ minWidth: labelWidth }}
            >
              Country
            </Typography>
               <TextField
              select
              id="country"
              name="country"
              value={data.country}
              onChange={(e) => handleChange("country", e)}
              error={!!errors.country}
              helperText={errors.country}
              margin="dense"
              size="small"
              fullWidth
              autoFocus
            >
              {countries.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
