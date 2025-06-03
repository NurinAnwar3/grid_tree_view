import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CustomTheme from "./customTheme";
import { ThemeProvider } from "@mui/material/styles";
// import { ToastContainer } from "react-toastify";
import { ApiClientProvider } from "./context/ApiClientContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <ThemeProvider theme={CustomTheme}>
    <ApiClientProvider>
      <App />
      {/* <ToastContainer autoClose={6000} /> */}
    </ApiClientProvider>
  // </ThemeProvider>
);
