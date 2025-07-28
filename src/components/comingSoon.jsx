import { Box, Typography } from '@mui/material'
import React from 'react'
import myImage from './../assets/images/coming-soon.jpg'; // adjust the path

export default function ComingSoon({title}) {
  return (
    <Box
    display="flex"
    flexDirection="column"
    alignItems="end"
    justifyContent="center"
    height="90vh"
    p={4}
    gap={2}
     sx={{
    // backgroundColor: 'tertiary.main', 
    backgroundImage: `url(${myImage})`,
    backgroundSize: 'cover',        // Optional: covers entire box
    backgroundRepeat: 'no-repeat',  // Optional: prevents tiling
    backgroundPosition: 'center',   // Optional: centers image
  }}
  >
    <Typography variant="h2" textTransform={"uppercase"} fontWeight={700}  >
      {title}
    </Typography>
    <Typography variant="body1" fontWeight='light'  >
      Stay tuned for more updates and details.
    </Typography>
  </Box>
  )
}
