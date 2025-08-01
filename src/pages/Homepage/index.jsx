import { Box, Typography } from "@mui/material";

import PrivateLayout from "../../layouts/privateLayout";
import myImage from './../../assets/images/dashboard-bg.jpg'; // adjust the path

export default function Homepage() {

  return (
  <PrivateLayout>
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center" // Centers horizontally
    justifyContent="center" // Centers vertically
    height="80vh" // Takes full viewport height
    gap={2} // Adds spacing between elements
    sx={{
       '&::-webkit-scrollbar': {
              display: 'none' // Hide scrollbar for Chrome, Safari and Opera
            },
            scrollbarWidth: 'none', // Hide scrollbar for Firefox
            msOverflowStyle: 'none' // Hide scrollbar for IE and Edge
    }}
  >
    <Typography variant="h4" fontWeight={700}  >
      Welcome!
    </Typography>
    <img
      src={myImage}
      alt="Description"
      style={{  borderRadius: "8px" }}
      width={500}
    />
  </Box>
</PrivateLayout>
  );
}
