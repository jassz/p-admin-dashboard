import {
  Avatar,
  Box,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import logoVisa from "./../../assets/images/visa.png";
import logoMaster from "./../../assets/images/mastercard.png";

export default function ContactDetails() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const data = {
    card: {
      cardName: "Alice Johnson",
      cardNumber: "4111 1111 1111 1111",
      cardType: "Visa",
      cardExpiryDate: "12/2026",
    },
    planExpiryDate: "2025-12-31",
    address: "123 Main Street, New York, NY",
    email: "alice@example.com",
  };

  return (
    <Grid container alignItems="flex-start" justifyContent="space-between">
      {/* Right: Card section */}

      <Grid item size={{ xs: 12, md: 5 }} pl={isMobile ? "auto" : 3}>
        <Box
          component="img"
          src={(data.card.cardType = "Visa" ? logoVisa : logoMaster)} // replace with your image path
          alt="Logo"
          sx={{ height: 50 }}
          justifyContent={"flex-end"}
          display={"flex"}
          mb={2}
        />
        <Typography variant="body2" gutterBottom>
          <strong>Name on credit card:</strong> {data.card.cardName}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <strong>Credit card number:</strong> {data.card.cardNumber}
        </Typography>

   
        <Typography variant="body2" gutterBottom>
          <strong>Card expiry date:</strong> {data.card.cardExpiryDate}
        </Typography>
      </Grid>

      <Grid size={{ xs: 12, md: 7 }}>
        <Typography variant="body2" gutterBottom>
          <strong>Phone number:</strong> 0187729135
        </Typography>
        <Typography variant="body2" gutterBottom>
          <strong>Email:</strong> {data.email}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <strong>Address:</strong> {data.address}
        </Typography>
      </Grid>
    </Grid>
  );
}
