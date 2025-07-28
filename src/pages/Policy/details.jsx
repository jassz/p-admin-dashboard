import React from "react";
import {
  Box,
  Divider,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function PrivacyPolicyModal({ open, onClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

const privacyPolicySections = [
  {
    title: "1. What Personal Data We Collect",
    content: [
      {
        text: "We may collect the following categories of personal data:",
        children: [
          "Full Name",
          "Work Email Address",
          "Job Title and Department",
          "Company Name",
          "Employee Engagement and Performance Data (e.g., Missions completed, Points earned, Campaign scores)",
          "Device and login information (for security and analytics)"
        ]
      }
    ]
  },
  {
    title: "2. How We Use Your Data",
    content: [
      {
        text: "Your data is used for the following purposes:",
        children: [
          "To create and manage your account",
          "To track and analyze task performance and engagement",
          "To generate performance-based reports for team leaders or HR",
          "To support internal recognition and reward programs",
          "To communicate system updates, campaign notifications, or support",
          "To improve our service and enhance user experience"
        ]
      }
    ]
  },
  {
    title: "3. Legal Basis for Processing",
    content: [
      {
        text: "We process your personal data based on:",
        children: [
          "Your explicit consent",
          "The legitimate interest of your employer (POISUM’s client) in improving employee engagement and alignment",
          "Compliance with applicable laws and regulations"
        ]
      }
    ]
  },
  {
    title: "4. Disclosure of Data",
    content: [
      {
        text: "We do not sell or rent your data. Data may be shared with:",
        children: [
          "Your employer (POISUM’s client) for legitimate operational use",
          "Third-party service providers (e.g., cloud hosting, analytics) under strict confidentiality agreements",
          "Authorities where required by law"
        ]
      }
    ]
  },
  {
    title: "5. Cross-Border Data Transfers",
    content: [
      {
        text: "POISUM may store data on secure servers located outside Malaysia (e.g., Singapore or other regions). All cross-border transfers comply with PDPA regulations and ensure equivalent data protection standards."
      }
    ]
  },
  {
    title: "6. Data Retention",
    content: [
      {
        text: "We retain your personal data only as long as necessary:",
        children: [
          "For account and system functionality",
          "To fulfill reporting requirements",
          "Or as required by law"
        ]
      },
      {
        text: "Data may be anonymized and aggregated for analytics upon account closure."
      }
    ]
  },
  {
    title: "7. Your Rights",
    content: [
      {
        text: "Under the PDPA, you have the right to:",
        children: [
          "Access your personal data",
          "Correct inaccurate or outdated data",
          "Withdraw consent (where applicable)",
          "Request deletion of your data (subject to business and legal requirements)"
        ]
      },
      {
        text: "To exercise these rights, please contact: privacy@poisum.com"
      }
    ]
  },
  {
    title: "8. Data Security",
    content: [
      {
        text: "We apply appropriate technical and organizational measures to:",
        children: [
          "Encrypt data at rest and in transit",
          "Restrict access via role-based controls",
          "Monitor and audit access logs"
        ]
      }
    ]
  },
  {
    title: "9. Changes to This Policy",
    content: [
      {
        text: "We may revise this Privacy Policy periodically. Users will be notified through the platform or email of any significant changes."
      }
    ]
  },
  {
    title: "10. Contact Us",
    content: [
      {
        text: "For questions or concerns regarding your personal data, contact our Data Protection Officer:"
      },
      {
        text: "📧 privacy@poisum.com"
      }
    ]
  }
];


  return (
      <Box px={isMobile ? 2 : 5}>
        <Typography variant="body2" gutterBottom>
          This Privacy Policy explains how Gosum Consulting Group Sdn. Bhd. (“Gosum”, “we”, “our”, or “us”) collects, uses, and protects your personal data when you use the POISUM platform, in accordance with the Personal Data Protection Act 2010 (PDPA) of Malaysia.
           </Typography>
            <Typography variant="body2" gutterBottom mt={2}>
          By accessing or using POISUM, you acknowledge and agree to the data practices described in this policy.
        </Typography>
        <Divider sx={{ my: 2 }} />

        {privacyPolicySections.map((section, index) => (
            <Box key={index} mb={3}>
              <Typography variant="subtitle2" fontWeight={600}>
                {section.title}
              </Typography>
        
              <Box component="ul" sx={{ pl: 4, }}>
                {section.content.map((item, idx) =>
                  typeof item === "string" ? (
                    <li key={idx}>
                      <Typography variant="body2">{item}</Typography>
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
        </Box>
    // </Modal>
  );
}
