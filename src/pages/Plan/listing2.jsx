import { Box, Button, Chip, Divider, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ButtonComponent from "components/button";
export default function Listing2() {
  const plans = [
    {
      title: "Starter Plan",
      recomended: false,
      price: "$9/month",
      description: "Great for small teams starting their culture journey within organization.",
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
          <Grid size={4}>
            <Paper
              sx={{
                borderRadius: 4,
                border: "1px solid tertiary.main",
                boxShadow: 5,
                padding: 3,
              }}
            >
              <Box alignItems="center">
                <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography variant="h6" fontWeight="semibold">
                  {plan.title}
                </Typography>
                {plan.recomended && ( <Chip label="Recommended" color="primary" size="small" /> ) }

                </Box>
                

                <Typography variant="caption" fontWeight="semibold">
                  {plan.description}
                </Typography>
                <Box
                  display={"flex"}
                  justifyContent={"start"}
                  alignItems={"end"}
                  my={3}
                >
                  <Typography variant="h4" fontWeight="bold">
                    {plan.price}
                  </Typography>
                  {/* <Typography variant="overline">/month</Typography> */}
                </Box>

                <Box>
                  {plan.features.map((feature, index) => (
                    <Box key={index} display={"flex"} justifyContent={"start"}>
                      <TaskAltIcon sx={{ color: "primary.main" }} />
                      <Typography variant="body2" pb={1} pl={2}>
                        {feature}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Get Started
                </Button>
                {/* </Box> */}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
