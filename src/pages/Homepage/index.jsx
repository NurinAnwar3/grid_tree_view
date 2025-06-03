import React, { useState } from "react";
import { Box, Typography, Grid, Paper, styled, Avatar } from "@mui/material";
import { RichTreeView } from "@mui/x-tree-view";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css"; // Icons
import { ThemeProvider, createTheme } from "@mui/material/styles";

import BasicSimpleTreeView from "../../components/BasicSimpleTreeView";
import BasicRichTreeView from "../../components/BasicRichTreeView";
import GmailTreeView from "../../components/GmailTreeView";
import FileExplorerTreeView from "../../components/FileExplorerTreeView";
import DragDropDemo from "../../components/PrimeReactTree";
import ArboristTreeView from "../../components/ArboristTreeView";
import { yellow } from "@mui/material/colors";


const dataList = [
  {
    id: "module",
    label: "Module",
    children: [
      { id: "job", label: "Job" },
      { id: "material", label: "Material" },
    ],
  },
];

const renderComponent = (nodeId) => {
  switch (nodeId) {
    case "job":
      return <BasicRichTreeView />;
    case "material":
      return <BasicSimpleTreeView />;
    default:
      return <Typography>Select a component from the tree.</Typography>;
  }
};

const theme = createTheme({
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
  },
});

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Task Name", width: 150 },
  { field: "status", headerName: "Status", width: 150 },
];

const sectionBMap = {
  module1: [
    { id: "module1-job", label: "Module 1 - Job" },
    { id: "module1-material", label: "Module 1 - Material" },
  ],
  module2: [
    { id: "module2-job", label: "Module 2 - Job" },
    { id: "module2-material", label: "Module 2 - Material" },
  ],
};

const sectionCMap = {
  "module1-job": [
    { id: 1, name: "Task A", status: "Pending" },
    { id: 2, name: "Task B", status: "Completed" },
  ],
  "module2-job": [
    { id: 3, name: "Task C", status: "Ongoing" },
    { id: 4, name: "Task D", status: "Pending" },
  ],
};

export default function Homepage() {
  const [selectedNode, setSelectedNode] = useState(null);

  const [sectionBItems, setSectionBItems] = useState([]);
  const [sectionCItems, setSectionCItems] = useState([]);

  const handleSectionAClick = (event, itemId) => {
    setSectionBItems(sectionBMap[itemId] || []);
    setSectionCItems([]); // clear grid view
  };

  const handleSectionBClick = (id) => {
    setSectionCItems(sectionCMap[id] || []);
  };

  const handleItemSelectionToggle = (event, itemId, isSelected) => {
    if (isSelected) {
      setSelectedNode(itemId);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            p: 2,
            bgcolor: "#1976d2",
            color: "white",
            flexShrink: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center", // optional: aligns vertically
          }}
        >
          <Typography variant="h4">Dashboard</Typography>
          <Typography variant="h6">
            <Avatar sx={{ bgcolor: yellow[100], color: "black" }}>N</Avatar>
          </Typography>
        </Box>

        <Grid container sx={{ flex: 1, }} spacing={2}>
          <Grid
            item
            size={2}
            xs={3}
            sx={{
              p: 2,
              borderRight: "1px solid #ccc",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <Typography variant="h6">Section A</Typography>
            <RichTreeView
              items={dataList}
              onItemSelectionToggle={handleItemSelectionToggle}
              onClick={() => handleSectionAClick()}
              slots={{
                expandIcon: ChevronRightIcon,
                collapseIcon: ExpandMoreIcon,
              }}
              sx={{
                flex: 1,
                 height: "100vh", overflow: "auto",
                "& .MuiTreeItem-label": {
                  fontSize: "0.875rem",
                },
              }}
            />
          </Grid>

          <Grid item xs={3} sx={{ p: 2 }}>
            <Typography variant="h6">Section B</Typography>
            {renderComponent(selectedNode)}
          </Grid>

          {/* <Grid item xs={6}>
          <Paper sx={{ p: 2, height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Section C Grid View
            </Typography>
            {sectionCItems.length > 0 ? (
              <DataGrid
                rows={sectionCItems}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                autoHeight
              />
            ) : (
              <Typography variant="body2" color="text.secondary">
                Select a Section B item to see data.
              </Typography>
            )}
          </Paper>
        </Grid> */}
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
