import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Backdrop,
  Divider,
} from "@mui/material";
import PrivateLayout from "../../layouts/privateLayout";
import UserForm from "./form";
import { toast } from "react-toastify";
import { useApiClient } from "context/ApiClientContext";
import Header from "components/header";
import DeleteSection from "./deleteSection";
import ChangePasswordSection from "./changePasswordSection";

export default function Account() {
  const userId = localStorage.getItem("loggedInID");
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState();

  const [inputForm, setInputForm] = useState({
    userName: "Naja",
    email: "najanadhirah@gosumgroup.com",
    company: "Gosum Group Sdn Bhd",
    country: "Malaysia",
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
      <Box sx={{ padding: 5, width: "100%" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="Account Details" />
        </Box>
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
        <Divider sx={{ my: 3, borderColor: "secondary.main" }} />
        <DeleteSection handleSubmit={handleSubmit} />
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
