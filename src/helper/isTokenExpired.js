import { jwtDecode } from "jwt-decode";

const isTokenExpired = (token) => {
  if (!token) {
    return true;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // current time in seconds

    // Convert currentTime to a readable format
    const currentTimeReadable = new Date(currentTime * 1000).toLocaleString();

    // Convert decoded.exp to a readable format
    const expirationTimeReadable = new Date(
      decoded.exp * 1000
    ).toLocaleString();

    console.log("Current Time :", currentTimeReadable);
    console.log("Expiration Time:", expirationTimeReadable);
    console.log("Token expired:", decoded.exp < currentTime);

    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Failed to decode token", error);
    return true;
  }
};

export default isTokenExpired;
