import * as React from "react";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { Box } from "@mui/material";
import whse from "../data/WarehouseData";

const fakecolumns = [
  { field: "stock", headerName: "Stock", width: '300' },
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

export default function WarehouseSection() {
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState(fakecolumns);

  React.useEffect(() => {
    const totalQuantity = whse.reduce((sum, item) => sum + (item.quantity || 0), 0);

    const rowsWithTotal = [
      ...whse,
      {
        id: "total-row", // Unique ID for the summary row
        stock: "TOTAL",
        quantity: totalQuantity,
        uom: "", // Optional: You can leave this empty or add a label
        isTotalRow: true, // Flag to identify this as the summary row
      },
    ];

    setRows(rowsWithTotal);
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
         
          "& .total-row": {
            fontWeight: "bold",
            backgroundColor: "rgba(58, 94, 224, 0.37)",
          },
        }}
      >
        <DataGridPro
          hideFooter={true}
          density="compact"
          rows={rows}
          columns={columns}
          getRowClassName={(params) => {
            return params.row.isTotalRow ? "total-row" : "";
          }
          }
        />
      </Box>
    </div>
  );
}