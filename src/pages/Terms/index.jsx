import PrivateLayout from 'layouts/privateLayout'
import React from 'react'
import Details from './details'
import ResetPwdLayout from 'layouts/resetPwdLayout'
import { Box, useMediaQuery, useTheme } from '@mui/material'

export default function Index() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  

  return (
    <ResetPwdLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: isMobile ? 2 : 5,
          py: isMobile ? 4 : 5,
          minHeight: "100vh", // center vertically if needed
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 900, // adjust width here
          }}
        >
          <Details />
        </Box>
      </Box>
    </ResetPwdLayout>
  )
}
