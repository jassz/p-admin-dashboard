import { Box, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import ButtonComponent from 'components/button';
import React from 'react';

export default function DeleteSection({ handleSubmit }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper
      sx={{
        borderRadius: 4,
        border: "1px solid tertiary.main",
        boxShadow: 5,
        padding: 3,
      }}
    >
      <Box
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        justifyContent="space-between"
        alignItems={isMobile ? "flex-start" : "center"}
        gap={2}
      >
        <Box>
          <Typography
            variant="body2"
            color="error"
            fontWeight="bold"
            sx={{ textTransform: "uppercase" }}
          >
            Delete Account
          </Typography>
          <Typography variant="caption" fontWeight="light">
            Permanently delete your account and all of your content
          </Typography>
        </Box>

        <ButtonComponent
          value="contained"
          callback={handleSubmit}
          color="error"
          text="Delete Account"
        />
      </Box>
    </Paper>
  );
}
