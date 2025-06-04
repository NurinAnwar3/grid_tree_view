import { createTheme } from "@mui/material/styles";

const CustomTheme = () => createTheme({
  palette: {
    secondary: {
      light: "#e691b9",
      main: "#d10d69",
      dark: "#91114d",
      contrastText: "#fff",
    },
    primary: {
      light: "#89b8e0",
      main: "#328cd9",
      dark: "#0d5fa6",
      contrastText: "#fff",
    },
    grey: {
      light: "#e6e3e3",
      main: "#bfbfbf",
      dark: "#8c8b8b",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

export default CustomTheme;
