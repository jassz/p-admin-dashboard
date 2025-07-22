import {
  Box,
  Divider,
  Modal,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContactDetails from "./contactDetails";
import ButtonComponent from "components/button";
import CloseIcon from "@mui/icons-material/Close";
import toast from 'react-hot-toast';
import ComponentBackdrop from "components/backdrop";
import BillingHistory from "./billingHistory";
import BillingHistoryDataGridPro from "./billingHistoryDataGridPro";

export default function BillingOverview() {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate(); // initialize navigate
  const [updateBilling, setUpdateBilling] = useState();
  const labelWidth = 120;

  const [errors, setErrors] = useState({
    name: "",
    carNumber: "",
    cardType: "",
    expDate: "",
    address: "",
    email: "",
  });
  const [inputForm, setInputForm] = useState({
    name: "",
    cardNumber: "",
    cardType: "",
    month: "",
    year: "",
    address: "",
    email: "",
  });

  const openModal = () => {
    setUpdateBilling(!updateBilling);
  };

  const handleClose = () => {
    inputForm.name = "";
    inputForm.cardNumber = "";
    inputForm.cardType = "";
    inputForm.expDate = "";
    inputForm.address = "";
    inputForm.email = "";
    setErrors({});

    setUpdateBilling(false);
  };

   const handleChange = (field, event) => {
    const value = event.target.value;

    setInputForm({ ...inputForm, [field]: value });
  };


  
  const validate = (name, value) => {
    switch (name) {
      case "email":
        if (!value) return "Email is required";
        return "";      
      case "cardNumber":
        if (!value) return "Card number is required";
        return "";  
      case "name":
        if (!value) return "Name on card is required";
        return "";
      case "month":
        if (!value) return "Month is required";
        return "";
      case "year":
        if (!value) return "Year is required";
        return "";
      case "phone":
        if (!value) return "Phone number is required";
        return "";
         case "address":
        if (!value) return "Address is required";
        return "";
      default:
        return "";
    }
  };

  
  const handleSubmit = async (event) => {

    event.preventDefault();

    const newErrors = {};
    Object.entries(inputForm).forEach(([key, value]) => {
      const error = validate(key, value);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

        try {
          setOpenBackdrop(!openBackdrop);
          await new Promise((resolve) => setTimeout(resolve, 3000));
          
          setOpenBackdrop(false);
          toast.success('Update successfull.');          
        
        } catch (error) {
            toast.error('Something went wrong.');          
        } finally {
          handleClose();
          setOpenBackdrop(false);
        }
      }
    

  return (
    <Paper
      sx={{
        borderRadius: 4,
        border: "1px solid tertiary.main",
        boxShadow: 5,
        padding: 3,
      }}
    >
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box>
          <Typography variant="subtitle1">Billing Overview</Typography>
          <Typography variant="caption">
            Summary of your billing and transaction history for the purchased
            plan.
          </Typography>
        </Box>
        <ButtonComponent
          text={"Update Billing"}
          value={"contained"}
          color={"secondary"}
          callback={openModal}
        />
      </Box>
      <ComponentBackdrop openBackdrop={openBackdrop} />

      <Divider sx={{ my: 2, borderColor: "primary.main" }} />
      <ContactDetails />
      <Divider sx={{ my: 2, borderColor: "primary.main" }} />
      <BillingHistory />

      <BillingHistoryDataGridPro />
       {updateBilling && (
        <Modal open={updateBilling}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: 500 },
              bgcolor: "background.paper",
              border: "1px solid tertiary.dark",
              boxShadow: 10,
              p: 3,
              borderRadius: 4,
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexDirection="row"
            >
              <Typography variant="body1" fontWeight="bold">
                Update Billing Details
              </Typography>
              <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
            </Box>
            <Divider sx={{ my: 3, borderColor: "tertiary.main" }} />

          
              <Box
                display="flex"
                flexDirection={isMobile ? "column" : "row"}
                alignItems={isMobile ? "flex-start" : "center"}
                gap={1}
              >
                <Typography sx={{ minWidth: isMobile ? 0 : labelWidth }}>
                  Name on Card
                </Typography>
                <TextField
                placeholder="John Doe"
                  id="name"
                  name="name"
                  type="text"
                  value={inputForm.name}
                  onChange={(e) => handleChange("name", e)}
                  error={!!errors.name}
                  helperText={errors.name}
                  margin="dense"
                  size="small"
                  fullWidth
                />
              </Box>

              <Box
                display="flex"
                flexDirection={isMobile ? "column" : "row"}
                alignItems={isMobile ? "flex-start" : "center"}
                gap={1}
              >
                <Typography sx={{ minWidth: isMobile ? 0 : labelWidth }}>
                  Card Number
                </Typography>
                <TextField
                placeholder="1234 5678 0987 6543"
                  id="cardNumber"
                  name="cardNumber"
                  type="number"
                  value={inputForm.cardNumber}
                  onChange={(e) => handleChange("cardNumber", e)}
                  error={!!errors.cardNumber}
                  helperText={errors.cardNumber}
                  margin="dense"
                  size="small"
                  fullWidth
                />
              </Box>

              <Box
                display="flex"
                flexDirection={isMobile ? "column" : "row"}
                alignItems={isMobile ? "flex-start" : "center"}
                gap={1}
              >
                <Typography sx={{ minWidth: isMobile ? 0 : labelWidth }}>
                  Card Expiry Date
                </Typography>
                <TextField
                placeholder="02"
                  id="month"
                  name="month"
                  type="number"
                  value={inputForm.month}
                  onChange={(e) => handleChange("month", e)}
                  error={!!errors.month}
                  helperText={errors.month}
                  margin="dense"
                  size="small"
                  fullWidth
                   slotProps={{ min: 1, max: 12 }}
                />
                /
                <TextField
                placeholder="36"
                  id="year"
                  name="year"
                  type="number"
                  value={inputForm.year}
                  onChange={(e) => handleChange("year", e)}
                  error={!!errors.year}
                  helperText={errors.year}
                  margin="dense"
                  size="small"
                  fullWidth
                  slotProps={{
                    min: 25,
                    max: 50,
                    onInput: (e) => {
                      e.target.value = Math.max(25, Math.min(50, Number(e.target.value)));
                    }
                  }}
                />
              </Box>

               <Box
                display="flex"
                flexDirection={isMobile ? "column" : "row"}
                alignItems={isMobile ? "flex-start" : "center"}
                gap={1}
              >
                <Typography sx={{ minWidth: isMobile ? 0 : labelWidth }}>
                  Email
                </Typography>
                <TextField
                  placeholder="johndoe@gmail.com" 
                  id="email"
                  name="email"
                  type="email"
                  value={inputForm.email}
                  onChange={(e) => handleChange("email", e)}
                  error={!!errors.email}
                  helperText={errors.email}
                  margin="dense"
                  size="small"
                  fullWidth
                />
              </Box>

               <Box
                display="flex"
                flexDirection={isMobile ? "column" : "row"}
                alignItems={isMobile ? "flex-start" : "center"}
                gap={1}
              >
                <Typography sx={{ minWidth: isMobile ? 0 : labelWidth }}>
                  Address
                </Typography>
                <TextField
                placeholder="No 12, Petaling Jaya, Selangor"
                  id="address"
                  name="address"
                  type="text"
                  value={inputForm.address}
                  onChange={(e) => handleChange("address", e)}
                  error={!!errors.address}
                  helperText={errors.address}
                  margin="dense"
                  size="small"
                  fullWidth
                />
              </Box>

            <Box display="flex" justifyContent="center" mt={4}>
              <ButtonComponent
                value="contained"
                text="Update"
                callback={handleSubmit}
                color="secondary"
              />
            </Box>
          </Box>
        </Modal>
      )}

    </Paper>
  );
}
