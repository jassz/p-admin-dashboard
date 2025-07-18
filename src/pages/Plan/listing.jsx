import { Box, Button, Chip, Divider, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ButtonComponent from "components/button";
export default function Listing() {
  const plans = [
    {
      title: "Starter Plan",
      recomended: false,
      price: "$9/month",
      description: "Great for small teams starting their culture journey.",
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
      popular: true,
    },
    {
      title: "Enterprise Plan",
      recomended: false,
      price: "$99/month",
      description:
        "Built for large organizations with complex engagement needs.",
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

  return (
    <Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {plans.map((plan, index) => (
          <Grid item size={{ xs: 12, md: 6, xl:4 }} key={index}>
            <Paper
              sx={{
                borderRadius: 4,
                border: "1px solid secondary.main",
                borderColor: "secondary.main",
                boxShadow: 5,
                padding: 3,
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
              <Box>
                <Box display={'flex'} justifyContent={'space-between'} alignItems="center">
                    <Typography variant="h6" fontWeight="semibold">
                  {plan.title}
                </Typography>
                {plan.recomended && ( <Chip label="Recommended" color="secondary" size="small" /> ) }

                </Box>
                

                 <Typography variant="caption" fontWeight="light" mt={1}>
                  {plan.description}
                </Typography>

                <Divider sx={{ my: 2, borderColor: "tertiary.main" }} />

                <Box
                  display="flex" alignItems="flex-end" my={2}
                >
                  <Typography variant="h4" fontWeight="bold">
                    {plan.price}
                  </Typography>
                  {/* <Typography variant="overline">/month</Typography> */}
                </Box>

                <Box mb={2}>
                  {plan.features.map((feature, index) => (
                    <Box key={index} display={"flex"} alignItems="start" mb={1}>
                      <TaskAltIcon sx={{ color: "secondary.main", fontSize: 18  }} />
                      <Typography variant="body2" pl={1}>
                        {feature}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ mt: 1, backgroundColor: plan.recomended ? 'secondary.main' : 'grey.200', color: plan.recomended ? 'white' : 'black' }}
                >
                  Get Started
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
