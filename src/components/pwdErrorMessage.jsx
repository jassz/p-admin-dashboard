import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export default function PwdErrorMessage({field, error, newPwd}) {
     const passwordRules = [
    {
      label: "Minimum 8 characters",
      test: (pwd) => pwd.length >= 8,
    },
     {
      label: "Confirm password must be same with new password",
      test: (pwd) =>pwd == newPwd,
    },
    {
      label: "At least 1 uppercase letter",
      test: (pwd) => /[A-Z]/.test(pwd),
    },
    {
      label: "At least 1 lowercase letter",
      test: (pwd) => /[a-z]/.test(pwd),
    },
    {
      label: "At least 1 number",
      test: (pwd) => /\d/.test(pwd),
    },
    {
      label: "At least 1 special character (!@#$...)",
      test: (pwd) => /[^A-Za-z0-9]/.test(pwd),
    },
  ];

  return (
    <Box>
 {field && error && (
        <Stack spacing={0.5} pl={2}>
          {passwordRules.map((rule, idx) => {
            const passed = rule.test(field);
            return (
              <Stack direction="row" alignItems="center" spacing={1} key={idx}>
                {passed ? (
                  <CheckCircleIcon fontSize="small" sx={{ color: "green" }} />
                ) : (
                  <CancelIcon fontSize="small" sx={{ color: "red" }} />
                )}
                <Typography
                  variant="caption"
                  sx={{ color: passed ? "green" : "red" }}
                >
                  {rule.label}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      )}
    </Box>
     
    // </Grid>
  );
}
