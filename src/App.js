import React, { useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Signin from "./pages/Auth/signin";
import Signup from "./pages/Auth/signup";
import Homepage from './pages/Homepage/index'
import Homepage1 from './pages/Homepage/index2'
import Account from './pages/Account/index'
import Subscription from './pages/SubscriptionBiling/index'
import Plan from './pages/Plan/index'
// import { LicenseInfo } from '@mui/x-license-pro'
import { ThemeProvider } from '@mui/material/styles';
import CustomTheme from "theme/customTheme";
import Privacy from "pages/Policy/index";
import Terms from "pages/Terms/index";
import Onboarding from "pages/Onboarding/index";
import OnboardingWelcome from "pages/Onboarding/step1";
import OnboardingValueTags from "pages/Onboarding/step2";
import OnboardingPlatform from "pages/Onboarding/step3";
import OnboardingName from "pages/Onboarding/step4";
import OnboardingThankyou from "pages/Onboarding/step5";
import Verification from "pages/Onboarding/verification";
// LicenseInfo.setLicenseKey(process.env.REACT_APP_MUI_LICENSE_KEY);
import { Toaster } from 'react-hot-toast';
import PrivateRoutes from "utils/privateRoutes";
import ProtectedRoute from "pages/Auth/protectedRoute";

function App() {
  return (
    <Router>
      {/* <Toaster /> */}
      <AppRoutes />
    </Router>
  )
};

const AppRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInID");
    localStorage.removeItem("companyId");
    localStorage.removeItem("loggedInUsername");
    localStorage.removeItem("roleId");
    localStorage.removeItem("activeTab");

    navigate("/signin");
  }, [navigate]);

  return (
      <Routes>
         {/* Public Routes */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/step1" element={<OnboardingWelcome />} />
        <Route path="/step2" element={<OnboardingValueTags />} />
        <Route path="/step3" element={<OnboardingPlatform />} />
        <Route path="/step4" element={<OnboardingName />} />
        <Route path="/step5" element={<OnboardingThankyou />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/privacyPolicy" element={<Privacy />} />
        <Route path="/tnc" element={<Terms />} />
        <Route path="/verify" element={<Verification />} />       


        {/* Private Routes */}
        <Route element={<ProtectedRoute><PrivateRoutes /></ProtectedRoute>}>
          <Route path="/" element={<Signin />} />
          <Route path="/homepage" element={<Homepage1 />} />
          <Route path="/accountDetail" element={<Account />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/plan" element={<Plan />} />       
        </Route>
      </Routes>
  );
}

export default App;
