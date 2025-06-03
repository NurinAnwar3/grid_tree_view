import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { TreeView, TreeItem } from "@mui/x-tree-view";
import { DataGrid } from "@mui/x-data-grid";

const sectionAData = [
  {
    id: "module1",
    name: "Module 1",
    children: ["Job", "Material"],
  },
  {
    id: "module2",
    name: "Module 2",
    children: ["Job", "Material"],
  },
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

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Task Name", width: 150 },
  { field: "status", headerName: "Status", width: 150 },
];

export default function App() {
  const [sectionBItems, setSectionBItems] = useState([]);
  const [sectionCItems, setSectionCItems] = useState([]);

  const handleSectionAClick = (id) => {
    setSectionBItems(sectionBMap[id] || []);
    setSectionCItems([]); // clear grid view
  };

  const handleSectionBClick = (id) => {
    setSectionCItems(sectionCMap[id] || []);
  };

  return (
    <Box p={2}>
      <Paper sx={{ p: 2, mb: 2, bgcolor: "#e0e0e0" }}>
        <Typography variant="h5">DASHBOARD</Typography>
      </Paper>
      <Grid container spacing={2}>
        {/* Section A */}
        <Grid item xs={3}>
          <Paper sx={{ p: 2, height: "100%" }}>
            <Typography variant="h6">Section A</Typography>
            <TreeView>
              {sectionAData.map((module) => (
                <TreeItem
                  nodeId={module.id}
                  label={module.name}
                  key={module.id}
                  onClick={() => handleSectionAClick(module.id)}
                >
                  {module.children.map((child) => (
                    <TreeItem
                      nodeId={`${module.id}-${child}`}
                      label={child}
                      key={child}
                    />
                  ))}
                </TreeItem>
              ))}
            </TreeView>
          </Paper>
        </Grid>

        {/* Section B */}
        <Grid item xs={3}>
          <Paper sx={{ p: 2, height: "100%" }}>
            <Typography variant="h6">Section B</Typography>
            <List>
              {sectionBItems.map((item) => (
                <ListItem button key={item.id} onClick={() => handleSectionBClick(item.id)}>
                  <ListItemText primary={item.label} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Section C */}
        <Grid item xs={6}>
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
        </Grid>
      </Grid>
    </Box>
  );
}
