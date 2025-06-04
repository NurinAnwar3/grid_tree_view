import React, { useEffect, useState } from "react";
import { DataGridPro } from "@mui/x-data-grid-pro";
import Box from "@mui/material/Box";
import transformDataToTreeFormat from "../utils/dataTransformer";
import axios from "axios";
import { useApiClient } from "../context/ApiClientContext";
import { darken, lighten, styled } from "@mui/material/styles";
import ConvertData from "../utils/convertData";
import flattenTreeData from "../utils/convertData";

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

export default function GridTreeDataBasic({ filters }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiClient = useApiClient();

  useEffect(() => { 
    fetchData();
  }, []);

  async function fetchData()  {
      try {
         const response = await axios.get(
          `${apiClient}/Job`,
          // {
          //   params: {
          //     partnum: filters.partNumber,
          //     lotnum: filters.lotNumber,
          //   },
          // }
        );

        
        const flatData = flattenTreeData(response.data.jobs);
        
        setRows(flatData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    }
  const getTreeDataPath = (row) => {
    return [row.jobNum, row.id.toString()];
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
        getRowClassName={(params) => `row-depth-${params.row.depth || 0}`}
      />
    </Box>
  );
}