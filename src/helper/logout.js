import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const LogoutCallback = (message) => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshtoken");
    localStorage.removeItem("loggedInID");
    localStorage.removeItem("tenantCode");
    localStorage.removeItem("mobileApiUrl");

    Navigate("/signin");
  };

export default LogoutCallback;
