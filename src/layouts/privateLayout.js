import React, { useEffect, useState, useCallback } from "react";
import { styled, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import { Avatar, Badge, Box, Typography } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CustomTheme from "./../theme/customTheme";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LeftMenuDrawer from "./leftMenuDrawer";
import RightNotiDrawer from "./rightNotiDrawer";
// import ErrorAlert from "helper/errorAlert";
import { useApiClient } from "./../context/ApiClientContext";
import { Notifications } from "@mui/icons-material";
import { yellow } from "@mui/material/colors";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const PrivateLayout = ({ children }) => {
  const [open, setOpen] = useState(true);
  const toggleDrawer = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  const navigation = useNavigate();
  const logout = async () => {
    try {
      navigation("/signin");
    } catch (error) {
      console.error("An error occurred:", error.response);
    }
  };

  return (
    <ThemeProvider theme={CustomTheme}>
      <Box sx={{ display: "flex", overflow: "hidden" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} sx={{ boxShadow: "none" }}>
          <Toolbar>
            <Box sx={{ flexGrow: 1 }} />
            <Avatar sx={{ bgcolor: yellow[100], color: "black" }}>N</Avatar>
          </Toolbar>
        </AppBar>
        <LeftMenuDrawer
          open={open}
          toggleDrawerCallback={toggleDrawer}
          logoutCallback={logout}
        />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflowY: "scroll",
          }}
        >
          <Toolbar />
          <Box m={{ xs: 2, md: 5 }}>{children}</Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default PrivateLayout;
