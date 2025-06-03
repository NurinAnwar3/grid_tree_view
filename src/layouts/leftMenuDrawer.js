import React from "react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SettingsIcon from "@mui/icons-material/Settings";
import GradingIcon from "@mui/icons-material/Grading";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Link,
  Divider,
  styled,
  Toolbar,
  IconButton,
  Typography,
  Grid,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Container from "@mui/material/Container";
import MuiDrawer from "@mui/material/Drawer";
import logo from "../assets/images/Logo-250/3.png";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const LeftMenuDrawer = ({roles, open, toggleDrawerCallback, logoutCallback }) => {
  const roleid = localStorage.getItem('roleId')

  return (
    <Drawer variant="permanent" open={open} sx={{
      '& .MuiDrawer-paper': {
        borderRight: 'none',
      },
    }}> 
      <Box>
        
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <img src={logo} alt="image" width="60%" />

        <IconButton onClick={toggleDrawerCallback} color="inherit">
          <ChevronLeftIcon sx={{ color: "contrastText" }} />
        </IconButton>
      </Toolbar>
      {/* <Divider /> */}
      <List component="nav">
       <ListItemButton component={Link} to="/">
          <ListItemIcon
            sx={{ color: (theme) => theme.palette.primary.contrastText }}
          >
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        {roles.allowar && <ListItemButton component={Link} to="/account-receivable">
          <ListItemIcon
            sx={{ color: (theme) => theme.palette.primary.contrastText }}
          >
            <GradingIcon />
          </ListItemIcon>
          <ListItemText primary="Account Receivable" />
        </ListItemButton> }
        {roles.allowap &&<ListItemButton component={Link} to="/account-payable">
          <ListItemIcon
            sx={{ color: (theme) => theme.palette.primary.contrastText }}
          >
            <GradingIcon />
          </ListItemIcon>
          <ListItemText primary="Account Payable" />
        </ListItemButton> }

        {roles.allowadmin && <ListItemButton component={Link} to="/setting">
          <ListItemIcon
            sx={{ color: (theme) => theme.palette.primary.contrastText }}
          >
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Admin Setting" />
        </ListItemButton> }

        {roles.allowprofile && <ListItemButton component={Link} to="/profile">
          <ListItemIcon
            sx={{ color: (theme) => theme.palette.primary.contrastText }}
          >
            <AssignmentIndIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton> }

        {/* <Divider /> */}

        {localStorage.getItem("token") ? (
          <ListItemButton onClick={logoutCallback}>
            <ListItemIcon
              sx={{
                color: (theme) => theme.palette.primary.contrastText,
              }}
            >
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        ) : null}
      </List>
      
      </Box>
      {/* <Box style={{ flex: 1 }}>
      <Typography variant="small">v1.1.3</Typography>
      </Box> */}
    </Drawer>
  );
};

export default LeftMenuDrawer;
