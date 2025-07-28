import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Backdrop,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import PrivateLayout from "../../layouts/privateLayout";
import UserForm from "./form";
import { toast } from "react-hot-toast";
import { useApiClient } from "context/ApiClientContext";
// import Header from "components/header";
// import DeleteSection from "./deleteSection";
import ChangePasswordSection from "./changePasswordSection";
import axios from "axios";
import ComponentBackdrop from "components/backdrop";

export default function Account() {
  
const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const userId = localStorage.getItem("loggedInID");
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState();
  const { dashboardApiUrl } = useApiClient();

  const [inputForm, setInputForm] = useState({
    fullName: "",
    email: "",
    companyName: "",
    country: "",
    planName: "",
  });

  useEffect(() => {
    if (inputForm.fullName === ""){
      getAccDtl();
      
    }
  }, [inputForm]);

  const getAccDtl = async () => {
    setOpenBackdrop(true);
    try{
      const apiAccDtlResponse = await axios.get(`${dashboardApiUrl}/Account/account-details`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        }
      );
      // console.log(apiAccDtlResponse);
      if (apiAccDtlResponse.status === 200){
        setInputForm(apiAccDtlResponse.data.data);
      }
    }
    catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    finally{
      setOpenBackdrop(false);
    }
  };

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

      // response = await axios.put(`${apiClient}/user/${userId}`, inputForm, {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("token")}`,
      //     Accept: "application/json",
      //   },
      // });

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
      <Box sx={{ paddingX: isMobile ? 2 : 5, py: isMobile ? 4 : 5, width: "100%" }}>
        <Typography variant="h5" textTransform={'uppercase'} fontWeight={"bold"}>
          Account Setting
        </Typography>
        <Divider sx={{ my: 1, borderColor: "transparent" }} />

        <Paper
          sx={{
            borderRadius: 4,
            bgcolor: "background.paper",
            border: "1px solid tertiary.main",
            boxShadow: 5,
          }}
        >
          <UserForm
            id={userId}
            inputForm={inputForm}
            handleInputChange={handleInputChange}
            submit={handleSubmit}
          />
          {loading && <CircularProgress color="inherit" />}
        </Paper>
        <Divider sx={{ my: 1, borderColor: "transparent" }} />
        <ChangePasswordSection />
        {/* <Divider sx={{ my: 3, borderColor: "secondary.main" }} />
        <DeleteSection handleSubmit={handleSubmit} /> */}
      </Box>
      <ComponentBackdrop openBackdrop={openBackdrop} />
    </PrivateLayout>
  );
}
