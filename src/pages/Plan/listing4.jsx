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
  Grid,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/HighlightOff";

const plans = [
  {
    title: "Starter Plan",
    price: "$9",
    recomended: false,
    frequency: "Per Month",
    description:
      "Great for small teams starting their culture journey within organization.",
    features: [
      "Up to 20 users",
      "Mission creation & completion tracking",
      "Basic announcements and campaigns",
      "Reward redemption system",
      "Campaign creation",
      "Email support",
    ],
  },
  {
    title: "Business Plan",
    price: "$29",
    recomended: true,

    frequency: "Per Month",
    description:
      "Designed for growing organizations that want deeper engagement.",
    features: [
      "Up to 100 users",
      "Campaign analytics and reporting",
      "Advanced announcement targeting",
      "Tiered reward system",
      "Manager dashboard",
      "Priority email support",
    ],
  },
  {
    title: "Enterprise Plan",
    price: "$99",
    recomended: false,

    frequency: "Per Month",
    description: "Built for large organizations with complex engagement needs.",
    features: [
      "Unlimited users",
      "Custom mission templates and automations",
      "Role-based access control",
      "SSO & enterprise integrations",
      "Dedicated account manager",
      "SLA-backed support",
    ],
  },
];

const features = [
  "User Limit",
  "Mission Tracking",
  "Announcement Tools",
  "Reward System",
  "Manager Tools",
  "Support Level",
];

const Listing4 = () => {
  return (
    <Box py={10} bgcolor="#fff">
      <Container maxWidth="lg">
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

        {/* <Grid container spacing={4} justifyContent="center">
          {plans.map((plan, index) => (
            <Grid item size={4} key={index} textAlign="center">
              <Box p={4} border={"1px solid #e0e0e0"} borderRadius={2}>
                <Typography variant="h6" fontWeight="bold">{plan.title}</Typography>
                <Typography variant="h4" fontWeight="bold" mt={1}>{plan.price}</Typography>
                <Typography color="text.secondary">{plan.frequency}</Typography>
                <Typography mt={2} mb={3} color="text.secondary">{plan.description}</Typography>
                <Button variant="contained" color={plan.title === "Business Plan" ? "success" : "primary"}>Purchase Now</Button>
              </Box>
            </Grid>
          ))}
        </Grid> */}

        <TableContainer component={Paper} sx={{ mt: 6 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Key Features</strong>
                </TableCell>
                {plans.map((plan, idx) => (
                  <TableCell
                    align="center"
                    key={idx}
                    sx={{
                      bgcolor: plan.recomended ? "primary.main" : "transparent",
                      color: plan.recomended ? "white" : "text.primary",
                    }}
                  >
                    {/* <Box p={4} border={"1px solid #e0e0e0"} borderRadius={2}> */}
                    <Typography variant="h6" fontWeight="bold">
                      {plan.title}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold" mt={1}>
                      {plan.price}
                    </Typography>
                    <Typography sx={{ color: plan.recomended ? "white" : "" }}>
                      {plan.frequency}
                    </Typography>
                    <Typography
                      mt={2}
                      mb={3}
                      variant="body2"
                      sx={{ color: plan.recomended ? "white" : "" }}
                    >
                      {plan.description}
                    </Typography>
                    {/* </Box> */}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {features.map((feature, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell>{feature}</TableCell>
                  {plans.map((plan, colIndex) => (
                    <TableCell
                      align="center"
                      key={colIndex}
                      sx={{
                        bgcolor: plan.recomended
                          ? "primary.main"
                          : "transparent",
                        color: plan.recomended ? "white" : "text.primary",
                      }}
                    >
                      {typeof plan.features[rowIndex] === "boolean" ? (
                        plan.features[rowIndex] ? (
                          <CheckIcon color="success" />
                        ) : (
                          <CloseIcon color="error" />
                        )
                      ) : (
                        plan.features[rowIndex]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              <TableRow>
                <TableCell />
                {plans.map((plan, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{
                      bgcolor: plan.recomended ? "primary.main" : "transparent",
                      borderBottom: "none",
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: plan.recomended
                          ? "secondary.main"
                          : "grey.200",
                        color: plan.recomended ? "white" : "grey.800",
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
