import React, { useEffect, useState } from "react";
import { DataGridPro } from "@mui/x-data-grid-pro";
import Box from "@mui/material/Box";
import transformDataToTreeFormat from "../utils/dataTransformer";
import axios from "axios";
import { useApiClient } from "../context/ApiClientContext";
import { darken, lighten, styled } from "@mui/material/styles";

const levelColors = {
  1: "primary.light",
  2: "success.light",
  3: "error.light",
  4: "warning.main",
  default: "secondary.main",
};

const getBackgroundColor = (color, theme, coefficient) => ({
  backgroundColor: darken(theme.palette[color] || color, coefficient),
  ...theme.applyStyles("light", {
    backgroundColor: lighten(theme.palette[color] || color, coefficient),
  }),
});

const makeBoldHeader = (label) => () => <strong>{label}</strong>;

const columns = [
  {
    field: "jobNum",
    renderHeader: makeBoldHeader("Job Number"),
    width: 200,
    hideable: false
  },
  {
    field: "partnum",
    renderHeader: makeBoldHeader("Part Number"),
    width: 200,
  },
  {
    field: "partDescription",
    renderHeader: makeBoldHeader("Description"),
    width: 300,
  },
  {
    field: "lotNum",
    renderHeader: makeBoldHeader("Lot Number"),
    width: 150,
  },
  {
    field: "jobOutput",
    renderHeader: makeBoldHeader("Job Output"),
    type: "number",
    width: 120,
  },
  {
    field: "actualOutput",
    renderHeader: makeBoldHeader("Actual Output"),
    type: "number",
    width: 130,
  },
  {
    field: "issueQty",
    renderHeader: makeBoldHeader("Issue Qty"),
    type: "number",
    width: 100,
  },
  {
    field: "requiredQty",
    renderHeader: makeBoldHeader("Job Required Qty"),
    type: "number",
    width: 120,
  },
  {
    field: "actRequiredQty",
    renderHeader: makeBoldHeader("Actual Req. Qty"),
    type: "number",
    width: 130,
  },
  {
    field: "variance",
    renderHeader: makeBoldHeader("Variance"),
    width: 100,
  },
  {
    field: "jobStatus",
    renderHeader: makeBoldHeader("Status"),
    width: 120,
  },
];

const getTreeDataPath = (row) =>{
 return row.hierarchy;}

const StyledByLevel = styled(DataGridPro)(({ theme }) => {
  // Generate styles for each level dynamically
  const styles = {};

  Object.entries(levelColors).forEach(([level, colorKey]) => {
    
    const className =
      level === "default" ? "row-default" : `row-depth-${level}`;
    const color =
      typeof colorKey === "string"
        ? theme.palette[colorKey.split(".")[0]]?.[colorKey.split(".")[1]] ||
          colorKey
        : colorKey;

    styles[`& .${className}`] = {
      ...getBackgroundColor(color, theme, 0.7),
      "&:hover": {
        ...getBackgroundColor(color, theme, 0.6),
      },
      "&.Mui-selected": {
        ...getBackgroundColor(color, theme, 0.5),
        "&:hover": {
          ...getBackgroundColor(color, theme, 0.4),
        },
      },
    };
  });

  return styles;
});

const StyledByStatus = styled(DataGridPro)(({ theme }) => ({
  "& .super-app-theme--Open": {
    ...getBackgroundColor(theme.palette.info.main, theme, 0.7),
    "&:hover": {
      ...getBackgroundColor(theme.palette.info.main, theme, 0.6),
    },
    "&.Mui-selected": {
      ...getBackgroundColor(theme.palette.info.main, theme, 0.5),
      "&:hover": {
        ...getBackgroundColor(theme.palette.info.main, theme, 0.4),
      },
    },
  },
  "& .super-app-theme--Completed": {
    ...getBackgroundColor(theme.palette.success.main, theme, 0.7),
    "&:hover": {
      ...getBackgroundColor(theme.palette.success.main, theme, 0.6),
    },
    "&.Mui-selected": {
      ...getBackgroundColor(theme.palette.success.main, theme, 0.5),
      "&:hover": {
        ...getBackgroundColor(theme.palette.success.main, theme, 0.4),
      },
    },
  },
  "& .super-app-theme--InProgress": {
    ...getBackgroundColor(theme.palette.warning.main, theme, 0.7),
    "&:hover": {
      ...getBackgroundColor(theme.palette.warning.main, theme, 0.6),
    },
    "&.Mui-selected": {
      ...getBackgroundColor(theme.palette.warning.main, theme, 0.5),
      "&:hover": {
        ...getBackgroundColor(theme.palette.warning.main, theme, 0.4),
      },
    },
  },
}));

export default function TreeDataFull({ filters, triggers }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiClient = useApiClient();

  useEffect(() => {
    fetchTreeData();
  }, [triggers]); 

   async function fetchTreeData() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${apiClient}/Job/GetNestedShowChildren`,
          {
            params: {
              partnum: filters.partNumber,
              lotnum: filters.lotNumber,
            },
          }
        );
        const data = response.data.jobs;        
        const transformed = transformDataToTreeFormat(data);

        setRows(transformed);
      } catch (error) {
        console.log("Error loading tree data: ", error);
      } finally {
        setLoading(false);
      }
    }

  const getRowClassName = (params) => {
    const depth = params.row.hierarchy?.length || 0;
    
    return `row-depth-${depth <= 0 ? "default" : depth}`;
  };

  return (
    <Box sx={{ height: "100vh", mt: 1 }}>
      <StyledByLevel
        density="compact"
        treeData
        rows={rows}
        columns={columns}
        getTreeDataPath={getTreeDataPath}
        loading={loading}
        groupingColDef={{
          headerName: "id",
          renderHeader: makeBoldHeader("Id"),
          hideDescendantCount: true, // Hides the arrow column
        }}
       disableChildrenFiltering = {true}
        getRowClassName={getRowClassName}
      />
    </Box>
  );
}
