import React, { useEffect, useState, useCallback } from "react";
import { styled, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import { Badge, Box, Typography } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CustomTheme from "customTheme";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LeftMenuDrawer from "./leftMenuDrawer";
import RightNotiDrawer from "./rightNotiDrawer";
import Company from "components/company";
import ErrorAlert from "helper/errorAlert";
import { useApiClient } from "context/ApiClientContext";
import { Notifications } from "@mui/icons-material";

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
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(!isMobile);
  const [openNoti, setOpenNoti] = useState(false);
  const [badgeCount, setBadgeCount] = useState(); // Initial badge count

  const toggleDrawer = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  const toggleDrawerNoti = useCallback(() => {
    setOpenNoti((prevOpenNoti) => {
      if (!prevOpenNoti) {
        setBadgeCount(0); // Reset badge count to 0 when opening notification drawer
      }
      return !prevOpenNoti;
    });
  }, []);

  const roleId = localStorage.getItem("roleId") || "";
  const id = localStorage.getItem("loggedInID");

  const navigation = useNavigate();
  const companyId = localStorage.getItem('companyId');
  const userId = localStorage.getItem('loggedInID');

  const [user, setUser] = useState({});
  const [role, setRole] = useState({
    id: 0,
    name: "",
    description: "",
    allowadmin: false,
    allowar: false,
    allowap: false,
    allowprofile: false,
  });

  const apiClient = useApiClient();

  const assignUser = useCallback(async () => {
    try {
      const responseUser = await axios.get(`${apiClient}/user/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });

      setUser(responseUser.data);
    } catch (error) {
      console.error("An error occurred:", error.response);
    }
  }, [apiClient, id]);

  const getRoles = useCallback(async () => {
    try {
      const response = await axios.get(`${apiClient}/role/${roleId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });

      setRole(response.data);
    } catch (error) {
      ErrorAlert(error, navigation);
      console.error("An error occurred:", error.response);
    }
  }, [apiClient, navigation, roleId]);

  const logout = async () => {
    try {
      const response = await axios.post(
        `${apiClient}/user/logout`,
        { email: user.email },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        }
      );

      if (response.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInID");
        localStorage.removeItem("companyId");
        localStorage.removeItem("loggedInUsername");
        localStorage.removeItem("roleId");
        localStorage.removeItem("activeTab");

        navigation("/signin");
      }
    } catch (error) {
      ErrorAlert(error, navigation);
      console.error("An error occurred:", error.response);
    }
  };

  useEffect(() => {
    if (roleId !== "") {
      assignUser();
      getRoles();
    }
    fetchUnreadNoti();
  }, [roleId, assignUser, getRoles,]);

  const fetchUnreadNoti = useCallback(async () => {
    try {
      const response = await axios.get(`${apiClient}/notifications/${companyId}/${userId}?pagenum=1&pagesize=999999`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });

      const unreadCount = response.data.data.filter((notification) => !notification.opened).length;

      setBadgeCount(unreadCount);
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  }, []);


  return (
    <ThemeProvider theme={CustomTheme}>
      <Box sx={{ display: "flex", overflow: "hidden" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} sx={{ boxShadow: "none" }}>
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              <Company />
            </Typography>

            <Box>
              Hi, {user.userName}👋
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawerNoti}
              >
                <Badge color="error" badgeContent={badgeCount}>
                  <Notifications />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <LeftMenuDrawer
          roles={role}
          user={user}
          open={open}
          toggleDrawerCallback={toggleDrawer}
          logoutCallback={logout}
        />
        <RightNotiDrawer
          openNoti={openNoti}
          toggleDrawerNotiCallback={toggleDrawerNoti}
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
