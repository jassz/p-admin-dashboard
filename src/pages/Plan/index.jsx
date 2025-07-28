import { Box, Divider, Typography, useTheme, useMediaQuery } from "@mui/material";
import PrivateLayout from "layouts/privateLayout";
import React, { useEffect, useState } from "react";
import Listing from "./listing";
import Listing2 from "./listing2";
import Listing3 from "./listing3";
import Listing4 from "./listing4";
import axios from "axios";
import { useApiClient } from "context/ApiClientContext";

export default function Index() {
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [planList, setPlanList] = useState([]);
  const { dashboardApiUrl, accountMgtApiUrl } = useApiClient();

   const getPlanList = async () => {
  try {
    const response = await axios.get(
      `${dashboardApiUrl}/Plan/plan-options`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      }
    );
    console.log('response', response);
    
    setPlanList(response?.data?.data || []); // Ensure we always set an array
  } catch (error) {
    console.error("Error fetching value tags:", error);
  }
};

  
  useEffect(() => {
    getPlanList();
  }, []);

  return (
    <PrivateLayout>
      <Box sx={{ paddingX: isMobile ? 2 : 5, py: isMobile ? 4 : 5, width: "100%", borderRadius: '30' }}>
        {/* <Typography variant="h5" fontWeight={"bold"} textTransform={'uppercase'}>
          Plan and Pricing
        </Typography> */}
        {/* <Divider sx={{ my: 1, borderColor: "transparent" }} /> */}
        {/* <Listing />
        <Divider sx={{ my: 10, borderColor: "secondary.main" }} /> */}

        <Listing2 plans={planList} />
        {/* <Divider sx={{ my: 10, borderColor: "secondary.main" }} />

        <Listing3 />
        <Divider sx={{ my: 10, borderColor: "secondary.main" }} />
        <Listing4 /> */}
      </Box>
    </PrivateLayout>
  );
}
