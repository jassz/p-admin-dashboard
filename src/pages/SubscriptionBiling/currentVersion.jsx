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
import { Link, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import InfoCard from "components/infoCard";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import { plans } from "data/planData";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import axios from "axios";

export default function CurrentVersion({planId, planName, planDescription, price, totalUsage, totalStorage, planExpiryDate, planFunction}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  return (
    <Grid container alignItems="flex-start" justifyContent="space-between">
      <Grid item size={{ xs: 12, md: 5 }} pl={isMobile ? "auto" : 3}>
        <Typography variant="body2">
          <strong>Plan:</strong> {planName}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <strong>Description:</strong> {planDescription}
        </Typography>

        <Typography variant="body2" gutterBottom>
          <strong>File Storage Limit:</strong> {totalUsage}GB of{" "}
          {totalStorage}GB
        </Typography>
        <Typography variant="body2" gutterBottom>
          <strong>Plan expiry date:</strong> {planExpiryDate}
        </Typography>

        <Typography variant="body2" gutterBottom>
          <strong>Plan function:</strong>
        </Typography>
        {planFunction.map((data, i) => (
          <Box key={i} display="flex" alignItems="center" mb={1}>
            <TaskAltIcon color="primary" fontSize="small" />
            <Typography variant="body2" pl={1}>
              {data.featureName}
            </Typography>
          </Box>
        ))}
      </Grid>

      {/* Right column: plan info box */}
      {/* <Grid item size={{xs:12, md:7}} >
        <ButtonComponent text={'Upgrade Plan'} value={'contained'} callback={openPlan} color={'secondary'} />
      </Grid>  */}
    </Grid>
  );
}
