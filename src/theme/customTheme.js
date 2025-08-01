import { createTheme } from "@mui/material/styles";

const CustomTheme = () => createTheme({
   typography: {
    fontFamily: "Poppins, sans-serif",
    // fontSize: 12,
  },
  palette: {
    primary: {
      light: "#AABBB1",
      main: "#1c4f4a",
      dark: "#023b17",
      contrastText: "#fff",
    },
    secondary: {
      light: "#FD8549",
      main: "#fc6719", //#F15B2B
      dark: "#ba3a11",
      contrastText: "#fff",
    },
    tertiary: {
      light: "#EAEBDC",
      main: "#f5f3ee", //#CBCEA7
      dark: "#46472c",
      contrastText: "#1A1A1A",
    },
    
  },
});

export default CustomTheme;
