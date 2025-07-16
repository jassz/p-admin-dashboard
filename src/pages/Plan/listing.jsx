import { Box, Divider, Paper, Typography } from '@mui/material'
import React from 'react'

export default function Listing() {
  return (
     <Paper
      sx={{
        borderRadius: 4,
        border: "1px solid tertiary.main",
        boxShadow: 5,
        padding: 3,
      }}
    >
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box>
          <Typography variant="h4" fontWeight={"bold"}>
            Plan Listing
          </Typography>
          <Divider sx={{ my: 1, borderColor: "transparent" }} />

          {/* <Typography variant="body1">
            We got the best offers for you
          </Typography>
          <Divider sx={{ my: 1, borderColor: "transparent" }} />
          <Typography variant="body2">
            Subscribe to get access to all features and content
          </Typography> */}
        </Box>

        {/* <ButtonComponent
          value={"contained"}
          text={"View Plans"}
          color={"secondary"}
        /> */}
      </Box>
    </Paper>
  )
}
