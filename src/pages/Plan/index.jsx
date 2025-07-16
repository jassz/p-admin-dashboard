import { Box, Divider, Typography } from '@mui/material'
import PrivateLayout from 'layouts/privateLayout'
import React from 'react'
import Listing from './listing'

export default function Index() {
  return (
     <PrivateLayout>
          <Box sx={{ padding: 5, width: "100%" }}>
            <Typography variant="h4" fontWeight={"bold"}>
            Plan and Pricing
          </Typography>
           <Divider sx={{ my: 1, borderColor: "transparent" }} />
            <Listing />
            </Box>
</PrivateLayout>
  )
}
