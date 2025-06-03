import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  List,
  Divider,
  styled,
  Toolbar,
  IconButton,
  Typography,
  Paper,
  Button,
  Grid,
} from "@mui/material";
import Badge from "@mui/material/Badge";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MuiDrawer from "@mui/material/Drawer";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Cancel, Error, RemoveCircle, WatchLater } from "@mui/icons-material";
import axios from "axios";
import { useApiClient } from "context/ApiClientContext";
import ErrorAlert from "helper/errorAlert";
import { toast } from "react-toastify";
import DateFormatter from "helper/dateFormartter";

const drawerWidth = 440;

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 15,
    padding: "3px 3px",
  },
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "openNoti",
})(({ theme, openNoti }) => ({
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  "& .MuiList-root": {
    paddingBottom: 0,
  },
  "& .MuiTypography-root": {
    lineHeight: 1,
  },
  "& .MuiPaper-root": {
    borderRadius: 0,
  },
}));

const RightNotiDrawer = ({ openNoti, toggleDrawerNotiCallback }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [notiArray, setNotiArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMoreNoti, setHasMoreNoti] = useState(true);
  const apiClient = useApiClient();
  const companyId = localStorage.getItem('companyId');
  const userId = localStorage.getItem('loggedInID');
  const navigate = useNavigate();

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await axios.get(`${apiClient}/notifications/${companyId}/${userId}?pagenum=1&pagesize=10`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });

      const notifications = response.data.data.map((notification) => ({
        ...notification,
        id: notification.notificationId,
        date: moment(notification.createdDate).format('DD-MMM-YYYY hh:mm A'),
        dateRaw: moment(notification.createdDate),
        read: notification.opened === true,
      }));
      notifications.sort((a, b) => b.dateRaw - a.dateRaw);
      setNotiArray(notifications);
    } catch (error) {
      ErrorAlert(error, navigate);
    } finally {
      setLoading(false);
    }
  }, [apiClient]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const loadMore = async () => {
    try {
      const response = await axios.get(`${apiClient}/notifications/${companyId}/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
        params: {
          pagenum: currentPage + 1, // Increment the page number
          pagesize: 10,
        },
      });

      const moreNoti = response.data.data.map((notification) => ({
        ...notification,
        id: notification.notificationId,
        date: moment(notification.createdDate).format('DD-MMM-YYYY hh:mm A'),
        dateRaw: moment(notification.createdDate),
        read: notification.opened === true,
      }));

      // Check for duplicate notifications
      const existingIds = new Set(notiArray.map((noti) => noti.id));
      const newNoti = moreNoti.filter((noti) => !existingIds.has(noti.id));

      if (newNoti.length === 0) {
        setHasMoreNoti(false);
      } else {
        const updatedNotiArray = [ ...newNoti, ...notiArray];
        updatedNotiArray.sort((a, b) => b.dateRaw - a.dateRaw);
        setNotiArray(updatedNotiArray);
        setCurrentPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      ErrorAlert(error, navigate);
    }
  };


  const redirect = async (notificationId, docId, docSource) => {
    try {
      let response = await axios.put(
        `${apiClient}/notifications/updatenotifications`,
        {
          companyId: parseInt(companyId),
          notificationsId: notificationId,
          userId: parseInt(userId),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        }
      );
      if (response?.data?.status) {
        if (docSource && docId) {
          const path = (docSource === "AR") ? "account-receivable" : "account-payable";
          navigate(`/${path}/${docId}`);
        } else {
          toast.error("docSource or docId is missing in the notification data");
        }
      }

      // Close the notification drawer
      toggleDrawerNotiCallback(!openNoti);
    } catch (error) {
      ErrorAlert(error, navigate);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Error':
        return <Error sx={{ color: 'darkOrange' }} />;
      case 'Rejected':
        return <Cancel sx={{ color: 'firebrick' }} />;
      case 'Dispute':
        return < WatchLater sx={{ color: '#0ba2e3' }} />;
      default:
        return < RemoveCircle sx={{ color: 'grey'}} />;
    }
  };

  return (
    <Drawer
      anchor="right"
      open={openNoti}
      onClose={toggleDrawerNotiCallback}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawerNotiCallback}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List p={2} backgroundColor="primary">
        <Box display="flex" m={2} justifyContent="space-between">
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ textTransform: "uppercase" }}
          >
            Notifications
          </Typography>
        </Box>

        {notiArray.length === 0 ? (
          <Paper m={5}>
            <Typography m={5} textAlign="center" color="lightgray">
              No Data Available
            </Typography>
          </Paper>
        ) : (
          <>
            {notiArray.map((row) => (
              <Grid container
                key={row.id}
                sort="desc"
                sx={{
                  fontWeight: row.read ? "normal" : "bold",
                  backgroundColor: row.read
                    ? "whitesmoke"
                    : "white",
                  transition: "background-color 0.3s",
                  "&:hover": {
                    backgroundColor: row.read
                      ? "rgba(211, 211, 211, 0.7)"
                      : "whitesmoke",
                    cursor: "pointer",
                  },
                }}
                onClick={() => redirect(row.notificationId, row.docId, row.docSource)}
              >
                <Grid item xs={2} p={2}>
                  {getStatusIcon(row.invoiceStatus)}
                </Grid>
                <Grid item xs={7} py={2}>
                  <Typography
                    variant="subtitle1"
                    fontSize="145x"
                    fontWeight="bold"
                    pb={1}
                  >
                    {/* {row.notificationId} */}
                    {row.title}
                  </Typography>
                  <Typography variant="body1" fontSize="12px">
                    {row.message}
                  </Typography>
                </Grid>
                <Grid item xs={2} py={2} display="flex" textAlign="right">
                  <Typography fontSize="10px">{row.date}</Typography>
                </Grid>
              </Grid>
            ))}
            <Paper>
              <Box display="flex" justifyContent="center">
                <Button
                  sx={{
                    width: "100%",
                  }}
                  variant="text"
                  onClick={loadMore}
                  disabled={!hasMoreNoti}
                >
                  Load More
                </Button>
              </Box>
            </Paper>
          </>
        )}
      </List>
    </Drawer>
  );
};

export default RightNotiDrawer;
