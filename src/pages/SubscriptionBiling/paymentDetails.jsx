import {
  Avatar,
  Box,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ButtonComponent from "components/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import InfoCard from "components/infoCard";
import LoyaltyIcon from "@mui/icons-material/Loyalty"
import CreditCardIcon from "@mui/icons-material/CreditCard"
import MaskedCreditCard from "components/maskedCreditCard";
import logo from "./../../assets/images/visa.png";

export default function PaymentDetails() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/plan");
  };

  return (
    <Grid
      container
      alignItems="flex-start"
      justifyContent="space-between"
    >
      <Grid item size={{xs:12, md:5}} >
        <Box>
          <Typography variant="subtitle1" fontWeight={600}>
            Payment Details
          </Typography>
          <Typography variant="caption">
            You can switch card for payment anytime.
          </Typography>
        </Box>
      </Grid>

      {/* Right column: plan info box */}
      <Grid item size={{xs:12, md:7}} >
        <InfoCard>
          <Box display="flex" alignItems={"flex-start"} gap={1}>
            <MaskedCreditCard
            cardNumber="1234 5678 0987"
            cardHolder="Naja Nadhirah"
            brand="Visa"
            expiry="12/36" />
          </Box>
         
          <Box />
        </InfoCard>
        <InfoCard>
             <Box display="flex" alignItems={"flex-start"} gap={1}>
            <CreditCardIcon sx={{ color: "secondary.main"}} />
            <Box>
             <Box
                          component="img"
                          src={logo} // replace with your image path
                          alt="Logo"
                         
                        />
              <Typography variant="subtitle1" fontWeight={500}>
                Visa Card
              </Typography>
              <Typography variant="caption" sx={{ color: grey[500] }}>
                Naja Nadhirah
              </Typography>
              {" "}
              <Typography variant="caption" sx={{ color: grey[500] }}>
                1234 5678 0987 6543
              </Typography>
            </Box>
          </Box>
        </InfoCard>
      </Grid>
    </Grid>
  );
}
