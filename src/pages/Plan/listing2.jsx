import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const plans = [
  {
    title: "Starter Plan",
    recomended: false,
    price: "$9/month",
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
    recomended: true,
    price: "$29/month",
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
    recomended: false,
    price: "$99/month",
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

const Listing2 = () => {
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
            Choose the best plan that fits your team's engagement needs.
          </Typography>
        </Box>

        <Grid container spacing={1} justifyContent="center">
          {plans.map((plan, index) => (
            <Grid item size={4} key={index}>
              <Box
                sx={{
                  borderRadius: 4,
                  p: plan.recomended ? "3px" : 0,
                  background: plan.recomended
                    ? "linear-gradient(200deg, #1c4f4a, #fc6719)"
                    : "transparent",
                  // backgroundSize: "400% 400%",
                  animation: plan.recomended
                    ? "borderGradient 6s ease infinite"
                    : "none",
                  transition: "transform 0.3s ease, filter 0.3s ease",
                  "&:hover": {
                    transform: plan.recomended ? "scale(1.02)" : "none",
                    filter: plan.recomended ? "brightness(1.1)" : "none",
                  },
                }}
              >
                <Card
                  elevation={plan.recomended ? 10 : 1}
                  sx={{
                    borderRadius: 4,
                    height: "100%",
                  }}
                >
                  <CardContent>
                    <Box mb={2}>
                      <Typography variant="h6" fontWeight="bold">
                        {plan.title}
                      </Typography>
                      <Typography color="text.secondary" mt={1}>
                        {plan.description}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="flex-end" mb={2}>
                      <Typography variant="h4" fontWeight="bold">
                        {plan.price.split("/")[0]}
                      </Typography>
                      <Typography color="text.secondary" ml={1}>
                        /{plan.price.split("/")[1]}
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Typography
                      variant="subtitle1"
                      fontWeight="medium"
                      gutterBottom
                    >
                      Plan Includes:
                    </Typography>
                    <Stack spacing={1}>
                      {plan.features.map((feature, idx) => (
                        <Box key={idx} display="flex" alignItems="center">
                          <CheckIcon color="success" sx={{ mr: 1 }} />
                          <Typography variant="body2">{feature}</Typography>
                        </Box>
                      ))}
                    </Stack>
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        mt: 4,
                        backgroundColor: plan.recomended
                          ? "secondary.main"
                          : "grey.200",
                          "&hover": {backgroundColor: 'secondary.dark'} ,
                        color: plan.recomended ? "white" : "text.primary",
                      }}
                    >
                      {plan.recomended
                        ? "Start 14 Days Free Trial"
                        : "Get The Plan Now"}
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Listing2;
