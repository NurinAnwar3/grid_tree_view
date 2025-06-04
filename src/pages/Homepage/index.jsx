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
import DragDropDemo from "../../components/PrimeReactTree";
import ArboristTreeView from "../../components/ArboristTreeView";
import { yellow } from "@mui/material/colors";
import MuiTreedata from "../../components/MuiTreeData";
import PrivateLayout from "../../layouts/privateLayout";
import myImage from './../../assets/images/img2.png'; // adjust the path


const dataList = [
  {
    id: "module",
    label: "Module",
    children: [
      { id: "job", label: "Job" },
      //{ id: "material", label: "Material" },
      { id: "search", label: "Material" },
      { id: "mui", label: "Mui Tree" },
    ],
  },
];

const renderComponent = (nodeId) => {
  switch (nodeId) {
    case "job":
      return <BasicRichTreeView />;
    // case "material":
    //   return <BasicSimpleTreeView />;
    case "search":
      return <ArboristTreeView />;
    case "mui":
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
  <PrivateLayout>
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center" // Centers horizontally
    justifyContent="center" // Centers vertically
    height="80vh" // Takes full viewport height
    gap={2} // Adds spacing between elements
  >
    <Typography variant="h4" fontWeight={700}  >
      Welcome!
    </Typography>
    <img
      src={myImage}
      alt="Description"
      style={{  borderRadius: "8px" }}
    />
  </Box>
</PrivateLayout>
  );
}
