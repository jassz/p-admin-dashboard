import { Box, Button, Chip, Divider, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ButtonComponent from "components/button";
import { plans } from "data/planData";
export default function Listing() {
 

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
