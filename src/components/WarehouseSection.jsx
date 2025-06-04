import * as React from "react";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { Box, CssBaseline } from "@mui/material";
import whse from "../data/WarehouseData";
import CustomTheme from "../theme/customTheme";
import { styled } from "@mui/system";

// Column definitions
const columns = [
  {
    field: "stock",
    headerName: "Stock",
    headerClassName: "super-app-theme--header",
    width: 300,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    headerClassName: "super-app-theme--header",
    // width: 150,
    renderCell: (params) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <span>{params.row.quantity}</span>
        <span style={{ color: "#666", marginLeft: 4 }}>{params.row.uom}</span>
      </div>
    ),
  },
];

// Styled DataGridPro component
const StyledDataGrid = styled(DataGridPro)(({ theme }) => ({
  "&.MuiDataGrid-root": {
    border: "none",
  },
  ".MuiDataGrid-columnSeparator": {
    display: "none",
  },
  "& .MuiDataGrid-row.Mui-hovered, & .MuiDataGrid-row:hover": {
    backgroundColor: "transparent",
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: "bold",
  },
  "& .super-app-theme--header": {
    backgroundColor: "rgb(227, 230, 233)",
  },
  "& .MuiDataGrid-filler": {
    backgroundColor: "rgb(227, 230, 233)",
  },
}));

// Component
export default function WarehouseSection() {
  const [rows, setRows] = React.useState([]);
  const theme = CustomTheme();

  React.useEffect(() => {
    const totalQuantity = whse.reduce(
      (sum, item) => sum + (item.quantity || 0),
      0
    );

    const rowsWithTotal = [
      ...whse,
      {
        id: "total-row",
        stock: "TOTAL",
        quantity: totalQuantity,
        uom: "",
        isTotalRow: true,
      },
    ];

    setRows(rowsWithTotal);
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        mb: 5,
        "& .total-row": {
          fontWeight: "bold",
        },
      }}
    >
      <StyledDataGrid
        hideFooter
        density="compact"
        rows={rows}
        columns={columns}
        getRowClassName={(params) => (params.row.isTotalRow ? "total-row" : "")}
      />
    </Box>
  );
}
