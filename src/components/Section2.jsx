import * as React from "react";
import section2 from "../data/Section2";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { Box } from "@mui/material";

const fakecolumns = [
  { field: "type", headerName: "Type Name",  width: '300'},
   {
    field: "quantity",
    headerName: "Quantity",
    width: 150,
    renderCell: (params) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <span>{params.row.quantity}</span>
        <span style={{ color: "#666", marginLeft: "4px" }}>{params.row.uom}</span>
      </div>
    ),
  },
];

export default function Section2() {
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);

  React.useEffect(() => {
    setRows(section2);
    setColumns(fakecolumns);
  }, []);

  return (
    <div>
        <Box
        m="8px 0 0 0"
        style={{ width: "100%" }}
        sx={{
          "& .MuiDataGrid-root": {
            display: "flex",
            justifyContent: "space-around",
          },  
        }}
      >
      <DataGridPro
            hideFooter={true} 
            density="compact"
            rows={rows} 
            columns={columns} 
        />
        </Box>
    </div>
  );
}
