import ReactDOM from "react-dom/client";
import App from "./App";
import { ApiClientProvider } from "./context/ApiClientContext";
import CustomTheme from "./theme/customTheme";
import { ThemeProvider } from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={CustomTheme}>
    <ApiClientProvider>
      <App />
    </ApiClientProvider>
  </ThemeProvider>
);
