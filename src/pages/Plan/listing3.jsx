import React from "react";
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  useTheme,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

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

const Listing3 = () => {
  const theme = useTheme();

  const allFeatures = Array.from(
    new Set(plans.flatMap((plan) => plan.features))
  );

  const renderFeatureValue = (feature, featuresList, isHighlighted = false) => {
    const hasFeature = featuresList.includes(feature);
    return hasFeature ? (
      <CheckIcon sx={{ color: isHighlighted ? "white" : "secondary.main" }} />
    ) : (
      <CloseIcon sx={{ color: isHighlighted ? "white" : "text.disabled" }} />
    );
  };

  return (
    <Box py={10} bgcolor="white">
      <Container maxWidth="lg">
        <Box textAlign="center" maxWidth="sm" mx="auto">
          <Typography variant="h4" fontWeight="bold">
            Pricing & Plans
          </Typography>
          <Typography mt={2} color="text.secondary">
            Choose the best plan that fits your team's engagement needs.
          </Typography>
        </Box>

        <Box mt={8} display={{ xs: "none", lg: "block" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                {plans.map((plan, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{
                      bgcolor: plan.recomended ? "secondary.main" : "transparent",
                      color: plan.recomended ? "white" : "text.primary",
                    }}
                  >
                    {plan.recomended && (
                      <Box mb={1}>
                        <Typography
                          variant="button"
                          color="white"
                          sx={{
                            bgcolor: "primary.main",
                            borderRadius: "999px",
                            px: 2,
                            py: 0.5,
                          }}
                        >
                          Recommended
                        </Typography>
                      </Box>
                    )}
                    <Typography
                      variant="h6"
                      fontWeight={'bold'}
                      textTransform={'uppercase'}
                      color={plan.recomended ? "white" : "secondary.main"}
                    >
                      {plan.title}
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      mt={1}
                      color={plan.recomended ? "white" : "text.primary"}
                    >
                      {plan.price}
                    </Typography>
                    <Typography
                      variant="body2"
                      color={plan.recomended ? "white" : "text.secondary"}
                    >
                      {plan.description}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {allFeatures.map((feature, rowIdx) => (
                <TableRow key={rowIdx}>
                  <TableCell sx={{ fontWeight: "bold" }}>{feature}</TableCell>
                  {plans.map((plan, colIdx) => (
                    <TableCell
                      key={colIdx}
                      align="center"
                      sx={{
                        bgcolor: plan.recomended
                          ? "secondary.main"
                          : "transparent",
                        color: plan.recomended ? "white" : "text.primary",
                      }}
                    >
                      {renderFeatureValue(
                        feature,
                        plan.features,
                        plan.recomended
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
                      bgcolor: plan.recomended ? "secondary.main" : "transparent",
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: plan.recomended ? "primary.main" : "grey.200",
                        color: plan.recomended ? "white" : "grey.900",
                      }}
                      fullWidth
                      size="normal"
                    >
                      Get Started
                    </Button>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Container>
    </Box>
  );
};

export default Listing3;
