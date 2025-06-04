import React, { useState } from "react";
import { Box, Typography, Grid, Paper, styled, Avatar, CssBaseline } from "@mui/material";
import { RichTreeView } from "@mui/x-tree-view";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css"; // Icons
import { ThemeProvider, createTheme } from "@mui/material/styles";

import BasicRichTreeView from "../../components/BasicRichTreeView";
import ArboristTreeView from "../../components/ArboristTreeView";
import TreeDataFullExample from "../../components/TreeDataFull";
import { yellow } from "@mui/material/colors";
import MuiTreedata from "../../components/MuiTreeData";
import Material from "../material";
import PrivateLayout from "../../layouts/privateLayout";


const dataList = [
  {
    id: "module",
    label: "Tracking",
    children: [
      // { id: "job", label: "Job" },
      // { id: "employee", label: "Employee" },
      // { id: "search", label: "Material" },
      // { id: "mui", label: "Mui Tree" },
      { id: "material", label: "Material Tracking"},
      { id: "finishGoods", label: "Finished Goods Tracking"},
    ],
  }
];

const renderComponent = (nodeId) => {
  switch (nodeId) {
    case "job":
      return <BasicRichTreeView />;
    case "material":
      return <Material />;
      case "search":
      return <ArboristTreeView />;
    case "finishGoods":
      return <MuiTreedata />;
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


export default function Homepage() {
  const [selectedNode, setSelectedNode] = useState(null);

  const handleSectionAClick = (event, itemId) => {
    console.log(`Nodes ${itemId} is clicked`);
  };

  const handleItemSelectionToggle = (event, itemId, isSelected) => {
    if (isSelected) {
      setSelectedNode(itemId);
    }
  };

  return (
   <ThemeProvider>
      <Box sx={{  overflow: "hidden" }}>
         <CssBaseline />
        <Box
          sx={{
            p: 2,
            bgcolor: "#1976d2",
            color: "white",
            flexShrink: 0,
            display: "flex",
            justifyContent: "space-between",
            // alignItems: "center", // optional: aligns vertically
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

          <Grid size={10} sx={{ p: 2 }}>
            {renderComponent(selectedNode)}
          </Grid>

        </Grid>
      </Box>
    </ThemeProvider>
  );
}
