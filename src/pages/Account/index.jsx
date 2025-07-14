
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
  CircularProgress,
  Backdrop,
  Grid,
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
import PrivateLayout from "../../layouts/privateLayout";
import myImage from './../../assets/images/coming-soon.jpg'; // adjust the path
import ButtonComponent from "components/button";
import UserForm from "./form";
import BasicBreadcrumbs from "components/breadcrumb";
import { toast } from "react-toastify";
import axios from "axios";
import { useApiClient } from "context/ApiClientContext";
import Header from "components/header";

export default function Account() {
  const userId = localStorage.getItem("loggedInID");
  const apiClient = useApiClient();
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState();

  const [inputForm, setInputForm] = useState({
      userName: "",
      email: "",
      roleid: "",
      lastcompany: "",
      oldPassword: "",
      password: "",
      confirmPassword: "",
      isActive: false,
    });

 const handleInputChange = (property, value) => {
    setInputForm((prevState) => ({
      ...prevState,
      [property]: value,
    }));
  };

  const handleSubmit = async () => {
    const toastId = toast.loading("Saving data...", {
      position: "top-right",
    });

    try {
      setOpenBackdrop(true);
      await new Promise((resolve) => setTimeout(resolve, 3000));

      let response = "";
      setLoading(true);
      inputForm.password = currentPassword;

      response = await axios.put(
        `${apiClient}/user/${userId}`,
        inputForm,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        }
      );

      toast.update(toastId, {
        render: "Successfully updated.",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      toast.update(toastId, {
        render: error,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
      setOpenBackdrop(false);
    }
  };


  return (
  <PrivateLayout>
    {/* <Typography variant="h2" textTransform={"uppercase"} fontWeight={700}  >
      Account Details
    </Typography>
    <Typography variant="body1" fontWeight='light'  >
      Stay tuned for more updates and details.
    </Typography> */}

    <Box sx={{ padding:5, width: "100%", marginTop: "10px" }}>
        {/* <BasicBreadcrumbs first="User" second="Details" /> */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="Account Details" />
        </Box>
        <Paper>
          <Grid container spacing={2} p={3} mt={1}>
            <Grid item xs={12} >
              <UserForm
                id={userId}
                inputForm={inputForm}
                handleInputChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="end">
              {/* <ButtonComponent value="contained" text="Save" callback={handleSubmit} /> */}
              {loading && (
                <CircularProgress color="inherit" />
              )}
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </PrivateLayout>
  );
}
