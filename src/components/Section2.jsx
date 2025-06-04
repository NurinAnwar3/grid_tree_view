// import * as React from "react";
// import section2Data from "../data/Section2";
// import { DataGridPro } from "@mui/x-data-grid-pro";
// import { Box, styled } from "@mui/material";

// const COLUMNS = [
//   { 
//     field: "type", 
//     headerName: "Type Name", 
//     headerClassName: "super-app-theme--header", 
//     width: 300 
//   },
//   {
//     field: "quantity",
//     headerName: "Quantity",
//     width: 150,
//     renderCell: (params) => (
//       <div style={{ display: "flex", alignItems: "center" }}>
//         <span>{params.row.quantity}</span>
//         <span style={{ color: "#666", marginLeft: "4px" }}>
//           {params.row.uom}
//         </span>
//       </div>
//     ),
//   },
// ];

// // Styled DataGridPro component
// const StyledDataGrid = styled(DataGridPro)(({ theme }) => ({
//   "&.MuiDataGrid-root": {
//     border: "none",
//   },
//   ".MuiDataGrid-columnSeparator": {
//     display: "none",
//   },
//   "& .MuiDataGrid-row.Mui-hovered, & .MuiDataGrid-row:hover": {
//     backgroundColor: "transparent",
//   },
//   "& .MuiDataGrid-columnHeaderTitle": {
//     fontWeight: "bold",
//   },
//   "& .super-app-theme--header": {
//     backgroundColor: "rgb(227, 230, 233)",
//   },
//   "& .MuiDataGrid-filler": {
//     backgroundColor: "rgb(227, 230, 233)",
//   },
// }));
// const gridStyles = {
//   mb: 5,
//   "& .MuiDataGrid-root": {
//     display: "flex",
//     justifyContent: "space-around",
//   },  
// };

// export default function Section2() {
//   const [rows] = React.useState(section2Data);
//   const [columns] = React.useState(COLUMNS);

//   return (
//     <Box m="8px 0 0 0" width="100%" sx={gridStyles}>
//       <StyledDataGrid
//         hideFooter 
//         density="compact"
//         rows={rows} 
//         columns={columns} 
//         disableColumnSelector 
//       />
//     </Box>
//   );
// }


import * as React from "react";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { Box, CssBaseline } from "@mui/material";
import section2 from "../data/Section2";
import CustomTheme from "../theme/customTheme";
import { styled } from "@mui/system";

// Column definitions
const columns = [
  {
    field: "type",
    headerName: "Type",
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
        <span style={{ marginLeft: 4 }}>{params.row.uom}</span>
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
    // const totalQuantity = section2.reduce(
    //   (sum, item) => sum + (item.quantity || 0),
    //   0
    // );

    // const rowsWithTotal = [
    //   ...section2,
    //   {
    //     id: "total-row",
    //     stock: "TOTAL",
    //     quantity: totalQuantity,
    //     uom: "",
    //     isTotalRow: true,
    //   },
    // ];

    setRows(section2);
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
      />
    </Box>
  );
}
