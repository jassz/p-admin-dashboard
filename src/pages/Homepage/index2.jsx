import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import PrivateLayout from "../../layouts/privateLayout";
import myImage from './../../assets/images/coming-soon.jpg'; // adjust the path


export default function Homepage() {
  const [selectedNode, setSelectedNode] = useState(null);

  const handleSectionAClick = (event, itemId) => {
    console.log(`Nodes ${itemId} is clicked`);
  };

  const handleItemSelectionToggle = (event, itemId, isSelected) => {
    if (isSelected) {
      setSelectedNode(itemId);
    }
  };

  return (
    <PrivateLayout>
  <Box
    display="flex"
    flexDirection="column"
    alignItems="end"
    justifyContent="center"
    height="90vh"
    gap={2}
     sx={{
    // backgroundColor: 'tertiary.main', 
    backgroundImage: `url(${myImage})`,
    backgroundSize: 'cover',        // Optional: covers entire box
    backgroundRepeat: 'no-repeat',  // Optional: prevents tiling
    backgroundPosition: 'center',   // Optional: centers image
  }}
  >
    <Typography variant="h4" textTransform={"uppercase"} fontWeight={'bold'} px={5}  >
      Welcome to Poisum Admin Dashboard!
    </Typography>
    {/* <Typography variant="body1" fontWeight='light'  >
      Time to spark some culture, captain!
      Poisum’s ready — are you? 
    </Typography> */}
  </Box>
</PrivateLayout>
  );
}
