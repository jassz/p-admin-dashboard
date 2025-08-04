import { createTheme } from "@mui/material/styles";

const CustomTheme = () => createTheme({
   typography: {
    fontFamily: "Poppins, sans-serif",
    // fontSize: 12,
  },
  palette: {
    primary: {
      light: "#98BBEC",
      main: "#1C519B",
      dark: "#001F54",
      contrastText: "#fff",
    },
    secondary: {
      light: "#4CA6FA",
      main: "#034078", //#F15B2B
      dark: "#ba3a11",
      contrastText: "#fff",
    },
    tertiary: {
      light: "#EAEBDC",
      main: "#FFFFF2", //#CBCEA7
      dark: "#46472c",
      contrastText: "#1A1A1A",
    },
    
  },
});

export default CustomTheme;
