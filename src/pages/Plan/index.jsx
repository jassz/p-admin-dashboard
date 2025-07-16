import { Box, Divider, Typography } from '@mui/material'
import PrivateLayout from 'layouts/privateLayout'
import React from 'react'
import Listing from './listing'
import Listing2 from './listing2'

export default function Index() {
  return (
     <PrivateLayout>
          <Box sx={{ padding: 5, width: "100%" }}>
            <Typography variant="h4" fontWeight={"bold"}>
            Plan and Pricing
          </Typography>
           <Divider sx={{ my: 3, borderColor: "transparent" }} />
            <Listing />
           {/* <Divider sx={{ my: 10, borderColor: "secondary.main" }} />

            <Listing2 /> */}
            </Box>
</PrivateLayout>
  )
}
