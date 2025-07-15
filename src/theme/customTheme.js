import { createTheme } from "@mui/material/styles";

const CustomTheme = () => createTheme({
   typography: {
    fontFamily: "Poppins, sans-serif",
    // fontSize: 12,
  },
  palette: {
    secondary: {
      light: "#edfcf3",
      main: "#39493F",
      dark: "#023b17",
      contrastText: "#fff",
    },
    primary: {
      light: "#ff9b7a",
      main: "#F15B2B",
      dark: "#ba3a11",
      contrastText: "#fff",
    },
    tertiary: {
      light: "#EAEBDC",
      main: "#CBCEA7",
      dark: "#46472c",
      contrastText: "#1A1A1A",
    },
    grey: {
      light: "#e6e3e3",
      main: "#bfbfbf",
      dark: "#8c8b8b",
      contrastText: "1A1A1A",
    },
  },
});

export default CustomTheme;
