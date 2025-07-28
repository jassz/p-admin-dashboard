import React from "react";
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/HighlightOff";
import { plans } from "data/planData";

// Feature list titles
const featureLabels = [
  "User Limit",
  "Mission Tracking",
  "Announcement Tools",
  "Reward System",
  "Manager Tools",
  "Support Level",
];

// Render table cell with icon or text
const renderFeatureCell = (value, highlighted) => {
  if (typeof value === "boolean") {
    return value ? (
      <CheckIcon color={highlighted ? "inherit" : "success"} />
    ) : (
      <CloseIcon color={highlighted ? "inherit" : "error"} />
    );
  }
  return value;
};

const Listing4 = () => {
  return (
    <Box py={10} bgcolor="#fff">
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box textAlign="center" mb={6}>
          <Typography variant="overline" color="primary.main">
            Our Pricing Plans
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            Pricing and Plans
          </Typography>
          <Typography mt={2} color="text.secondary">
            Choose the best plan that fits your needs.
          </Typography>
        </Box>

        {/* Comparison Table */}
        <TableContainer component={Paper}>
          <Table>
            {/* Table Header */}
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Key Features</strong>
                </TableCell>
                {plans.map((plan, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{
                      bgcolor: plan.recomended ? "secondary.main" : "transparent",
                      color: plan.recomended ? "white" : "text.primary",
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      {plan.title}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold" mt={1}>
                      {plan.price}
                    </Typography>
                    <Typography>{plan.frequency}</Typography>
                    <Typography
                      variant="body2"
                      mt={2}
                      color={plan.recomended ? "white" : "text.secondary"}
                    >
                      {plan.description}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* Table Body */}
            <TableBody>
              {featureLabels.map((label, i) => (
                <TableRow key={i}>
                  <TableCell>{label}</TableCell>
                  {plans.map((plan, index) => (
                    <TableCell
                      key={index}
                      align="center"
                      sx={{
                        bgcolor: plan.recomended
                          ? "secondary.main"
                          : "transparent",
                        color: plan.recomended ? "white" : "text.primary",
                      }}
                    >
                      {renderFeatureCell(plan.features[i], plan.recomended)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}

              {/* Action Row */}
              <TableRow>
                <TableCell />
                {plans.map((plan, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{
                      bgcolor: plan.recomended ? "secondary.main" : "transparent",
                      borderBottom: "none",
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: plan.recomended
                          ? "primary.main"
                          : "primary.light",
                        color: plan.recomended ? "white" : "grey.900",
                      }}
                    >
                      Purchase Now
                    </Button>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default Listing4;
