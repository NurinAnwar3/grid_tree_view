import React from "react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import GradingIcon from "@mui/icons-material/Grading";
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
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
  Typography,
  Avatar,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { yellow } from "@mui/material/colors";
import { GppGood, Home, TrackChanges, Traffic } from "@mui/icons-material";

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

const LeftMenuDrawer = ({
  open,
  logoutCallback,
}) => {

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        "& .MuiDrawer-paper": {
          borderRight: "none",
        },
      }}
    >
      <Box>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
           sx={{ 
              flexGrow: 1,
              ml: 1,
              mt: 2,
              fontWeight: 700,
              textTransform: 'uppercase'
            }}
          >
            Admin Dashboard
          </Typography>       
        </Toolbar>
        <List component="nav">
          <ListItemButton component={Link} to="/homepage">
            <ListItemIcon
              sx={{ color: (theme) => theme.palette.primary.contrastText }}
            >
              <Home />
            </ListItemIcon>
            <ListItemText primary="Homepage" />
          </ListItemButton>
          <ListItemButton component={Link} to="/material">
            <ListItemIcon
              sx={{ color: (theme) => theme.palette.primary.contrastText }}
            >
              <QueryStatsIcon />
            </ListItemIcon>
            <ListItemText primary="Material Tracking" />
          </ListItemButton>
          <ListItemButton component={Link} to="/finished-goods">
            <ListItemIcon
              sx={{ color: (theme) => theme.palette.primary.contrastText }}
            >
              <AssignmentTurnedInIcon />
            </ListItemIcon>
            <ListItemText primary="Finished Goods" />
          </ListItemButton>

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
