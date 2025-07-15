import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signin from "./pages/Auth/signin";
import Signup from "./pages/Auth/signup";
import Homepage from './pages/Homepage/index'
import Homepage1 from './pages/Homepage/index2'
import Account from './pages/Account/index'
import Plan from './pages/Plan/index'
// import { LicenseInfo } from '@mui/x-license-pro'
import { ThemeProvider } from '@mui/material/styles';
import CustomTheme from "theme/customTheme";
// LicenseInfo.setLicenseKey(process.env.REACT_APP_MUI_LICENSE_KEY);

function App() {
  return (
    
    <Router>
      <Routes>
        {/* <Route path="/login" element={<Navigate to="/login" />} /> */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage1 />} />
        <Route path="/accountDetail" element={<Account />} />
        <Route path="/plan" element={<Plan />} />
      </Routes>
    </Router>
  );
}

export default App;
