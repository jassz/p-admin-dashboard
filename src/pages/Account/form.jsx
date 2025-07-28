import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Divider,
  MenuItem,
  useTheme,
  useMediaQuery,
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

      const theme = useTheme();
  
      const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

      var fieldList =[
            { label: "Email", key: "email", disabled: true },
            { label: "Full Name", key: "userName", disabled: true },
            { label: "Company Name", key: "company", disabled: true },
          ];
          
  return (
    <Box padding={3} sx={{ borderRadius: 4 }}>
      <Grid container rowSpacing={2} columnSpacing={3}>
        <Grid item size={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center" flexDirection={isMobile ? "row" : "row"} gap={2} >
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ textTransform: "uppercase" }}
            >
              Personal Details
            </Typography>
            {/* <ButtonComponent
              value="contained"
              text="Save"
              callback={submit}
              color="secondary"
            /> */}
          </Box>
        <Divider sx={{ my: 2, borderColor: "tertiary.main" }} />


         {/* Form Fields */}
          {fieldList.map(({ label, key, disabled = false }) => (
            <Box
              key={key}
              display="flex"
              flexDirection={isMobile ? "column" : "row"}
              alignItems={isMobile ? "start" : "center"}
              // gap={1}
              mb={2}
            >
              <Typography sx={{ minWidth: isMobile ? 0 : labelWidth }}>{label}</Typography>
              <TextField
                error={!!errors[key]}
                helperText={errors[key]}
                type="text"
                onChange={(e) => handleChange(key, e)}
                value={inputForm[key]}
                required
                margin="dense"
                id={key}
                fullWidth
                size="small"
                disabled={disabled}
                  slotProps={{
       input: { readOnly: true,}
      }}
              />
            </Box>
          ))}

          {/* Country Select */}
          <Box
            display="flex"
            flexDirection={isMobile ? "column" : "row"}
            alignItems={isMobile ? "start" : "center"}
            // gap={1}
            mb={2}
          >
            <Typography sx={{ minWidth: isMobile ? 0 : labelWidth }}>Country</Typography>
            <TextField
              select
              id="country"
              name="country"
              value={"Malaysia"}
              onChange={(e) => handleChange("country", e)}
              error={!!errors.country}
              helperText={errors.country}
              margin="dense"
              size="small"
              fullWidth
              disabled="true"
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
