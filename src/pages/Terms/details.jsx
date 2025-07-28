import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Paper,
  Button,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const sections = [
  {
    title: "1. Account Registration & Eligibility",
    content: [
      {
        text: "Registration is open to all users with a valid work email address. Personal email domains (e.g., @gmail.com, @hotmail.com, @yahoo.com) are not eligible."
      },
      {
        text: "You agree to provide accurate, current, and complete information."
      },
      {
        text: "You confirm that you are authorized to bind your organization to this Agreement."
      }
    ]
  },
  {
    title: "2. Subscription Plans & Fees",
    content: [
      {
        text: "POISUM offers four plans — Starter, Essentials, and Enterprise — each designed to cater to different levels of user needs and feature access."
      },
      {
        text: "Payment is due monthly or annually based on your selected plan."
      },
      {
        text: "Subscription fees are non-refundable except as required by law."
      }
    ]
  },
  {
    title: "3. Use of Platform",
    content: [
      {
        text: "You may use POISUM solely for internal business purposes."
      },
      {
        text: "You agree not to:",
        children: [
          "Share credentials outside your organization.",
          "Resell, copy, or reverse-engineer any part of the platform."
        ]
      },
      {
        text: "Each user must be assigned a unique license."
      }
    ]
  },
  {
    title: "4. Value Tags, Missions, and Points",
    content: [
      {
        text: "Points earned by employees through Missions and Tasks are non-redeemable unless otherwise determined by your company."
      },
      {
        text: "Points represent performance and engagement, not monetary value or employee entitlements."
      },
      {
        text: "Campaigns may use these points to drive internal motivation and competition. Points can be valid for multiple overlapping campaigns during defined periods."
      }
    ]
  },
  {
    title: "5. Data Ownership & Privacy",
    content: [
      {
        text: "All company and user-generated data remain the property of your organization."
      },
      {
        text: "Gosum may access data solely for:",
        children: [
          "System support",
          "Performance analytics",
          "Service enhancement"
        ]
      },
      {
        text: "We do not sell or share your data with third parties."
      },
      {
        text: "Refer to the Privacy Policy [insert link] for full terms."
      }
    ]
  },
  {
    title: "6. Service Level Commitment (SLA)",
    content: [
      {
        text: "For paid plans:",
        children: [
          "Uptime Guarantee: 99.5% monthly uptime (excluding scheduled maintenance).",
          {
            text: "Response Time:",
            children: [
              "Critical issues: <4 business hours",
              "Non-critical: <1 business day"
            ]
          }
        ]
      },
      {
        text: "For free users, support is provided on a best-effort basis via community help or email."
      }
    ]
  },
  {
    title: "7. GDPR & Data Residency",
    content: [
      {
        text: "POISUM is compliant with the Personal Data Protection Act (PDPA) of Malaysia and adheres to its principles in handling personal data."
      },
      {
        text: "Data is hosted on secure servers located in [e.g., Singapore/Malaysia/AWS region]. You may request data location confirmation during onboarding."
      },
      {
        text: "Enterprise clients may request custom data residency or data processing addendums."
      }
    ]
  },
  {
    title: "8. Enterprise Customization Terms (Enterprise Plan Only)",
    content: [
      {
        text: "Custom development, API integration, and data migration services are available for Enterprise customers under a separate agreement or Statement of Work (SOW)."
      },
      {
        text: "All customizations remain the property of Gosum unless otherwise agreed in writing."
      },
      {
        text: "Delivery timelines and pricing for customization will be mutually agreed upon."
      }
    ]
  },
  {
    title: "9. Intellectual Property",
    content: [
      {
        text: "All rights, title, and interest in the POISUM platform remain with Gosum."
      },
      {
        text: "This Agreement does not grant any ownership rights to you—only a limited, revocable, non-transferable license to use POISUM."
      }
    ]
  },
  {
    title: "10. Termination",
    content: [
      {
        text: "You may cancel your subscription at any time via the billing dashboard."
      },
      {
        text: "Gosum reserves the right to suspend or terminate access for violations of these terms or non-payment."
      }
    ]
  },
  {
    title: "11. Limitation of Liability",
    content: [
      {
        text: "Gosum is not liable for:",
        children: [
          "Loss of profit, revenue, or data",
          "Indirect, incidental, or consequential damages"
        ]
      },
      {
        text: "Total liability is limited to the amount paid in the last 3 months."
      }
    ]
  },
  {
    title: "12. Modifications",
    content: [
      {
        text: "Gosum may revise these terms with prior notice for material changes."
      },
      {
        text: "Continued use of the Platform after updates signifies acceptance."
      }
    ]
  },
  {
    title: "13. Governing Law",
    content: [
      {
        text: "This Agreement is governed by the laws of Malaysia."
      },
      {
        text: "Disputes shall be resolved in the courts of Kuala Lumpur, Malaysia."
      }
    ]
  },
  {
    title: "14. Marketing Use of Company Name & Logo",
    content: [
      {
        text: "Unless you notify us in writing at [support@poisum.com] or through your account settings, you grant Gosum Consulting Group Sdn. Bhd. the right to use your company name and logo for the sole purpose of identifying you as a POISUM customer in:",
        children: [
          "Our website",
          "Presentation decks",
          "Marketing brochures",
          "Client lists"
        ]
      },
      {
        text: "This usage:",
        children: [
          "Will not include confidential information",
          "Will not imply endorsement unless you provide prior written consent",
          "Will be removed within a reasonable timeframe upon your written request"
        ]
      }
    ]
  }
];


export default function Details() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

 const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 40) { // Adjust 300 to your desired scroll threshold
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Attach scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Box px={isMobile ? 2 : 5}>
  {/* <Typography variant="h4" fontWeight="bold" gutterBottom>
    POISUM’s User Terms & Conditions
  </Typography> */}
  <Typography variant="body2" gutterBottom >
    These Terms & Conditions govern your access to and use of the POISUM platform, operated by Gosum Consulting Group Sdn. Bhd. (“Gosum”, “we”, “our”, or “us”).
  </Typography>
  <Typography variant="body2" gutterBottom mt={2}>
    By using POISUM, you agree to comply with these terms.
  </Typography>
  <Divider sx={{ my: 2 }} />

    {sections.map((section, index) => (
              <Box key={index} mb={3}>
                <Typography variant="subtitle2" fontWeight={600}>
                  {section.title}
                </Typography>
          
                <Box component="ul" sx={{ pl: 4, }}>
                  {section.content.map((item, idx) =>
                    typeof item === "string" ? (
                      <li key={idx}>
                        <Typography variant="body2" >{item}</Typography>
                      </li>
                    ) : (
                      <li key={idx}>
                        <Typography variant="body2" gutterBottom>{item.text}</Typography>
                        {item.children && (
                          <Box component="ul" sx={{ pl: 4,  }}>
                            {item.children.map((child, childIdx) =>
                              typeof child === "string" ? (
                                <li key={childIdx}>
                                  <Typography variant="body2" gutterBottom>{child}</Typography>
                                </li>
                              ) : (
                                <li key={childIdx}>
                                  <Typography variant="body2" >1{child.text}</Typography>
                                  {child.children && (
                                    <Box component="ul" sx={{ pl: 4, }}>
                                      {child.children.map((deep, deepIdx) => (
                                        <li key={deepIdx}>
                                          <Typography variant="body2">{deep}</Typography>
                                        </li>
                                      ))}
                                    </Box>
                                  )}
                                </li>
                              )
                            )}
                          </Box>
                        )}
                      </li>
                    )
                  )}
                </Box>
          
              </Box>
            ))}

  <Box textAlign="right" mt={4}>
    {isVisible && (
        <Button onClick={scrollToTop} >
          Scroll to Top
        </Button>
      )}
  </Box>
</Box>

  );
}
