import * as React from "react";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { darken, lighten, styled } from "@mui/system";
import axios from "axios";
import { useApiClient } from "../context/ApiClientContext";
import transformDataToTreeFormat from "../utils/convertDataMuiTree";

// Define color mapping for each level
const levelColors = {
  1: 'primary.light',    // Blue (level 1)
  2: 'success.light',    // Green (level 2)
  3: 'error.light',      // Red (level 3)
  4 : 'warning.main',    // Yellow (level 4)
  default: 'secondary.main' // Purple (others)
};

const getBackgroundColor = (color, theme, coefficient) => ({
  backgroundColor: darken(theme.palette[color] || color, coefficient),
  ...theme.applyStyles('light', {
    backgroundColor: lighten(theme.palette[color] || color, coefficient),
  }),
});

const StyledDataGrid = styled(DataGridPro)(({ theme }) => {
  // Generate styles for each level dynamically
  const styles = {};
  
  Object.entries(levelColors).forEach(([level, colorKey]) => {
    const className = level === 'default' ? 'row-default' : `row-depth-${level}`;
    const color = typeof colorKey === 'string' ? 
                  theme.palette[colorKey.split('.')[0]]?.[colorKey.split('.')[1]] || colorKey : 
                  colorKey;
    
    styles[`& .${className}`] = {
      ...getBackgroundColor(color, theme, 0.7),
      '&:hover': {
        ...getBackgroundColor(color, theme, 0.6),
      },
      '&.Mui-selected': {
        ...getBackgroundColor(color, theme, 0.5),
        '&:hover': {
          ...getBackgroundColor(color, theme, 0.4),
        },
      },
    };
  });

  return styles;
});

export default function TreeDataWithGap() {
  const [filteredTreeData, setFilteredTreeData] = React.useState([]);
  const apiClient = useApiClient();
  const [partSearch, setPartSearch] = React.useState("");
  const [lotSearch, setLotSearch] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [clickedRowId, setClickedRowId] = React.useState("");

  const columns = [
    {
      field: "partnum",
      headerName: "Part Number",
      width: 250,
    },
    {
      field: "jobNum",
      headerName: "Job Number",
      width: 150,
    },
    {
      field: "partDescription",
      headerName: "Description",
      width: 300,
    },
    {
      field: "jobStatus",
      headerName: "Status",
      width: 130,
    },
    {
      field: "variance",
      headerName: "Variance",
      width: 100,
    },
    {
      field: "jobOutput",
      headerName: "Job Output",
      width: 120,
      type: "number",
    },
    {
      field: "actualOutput",
      headerName: "Actual Output",
      width: 130,
      type: "number",
    },
  ];

  React.useEffect(() => {
    searchData();
  }, []);

  const getTreeDataPath = (filteredTreeData) => filteredTreeData.hierarchy;

  const searchData = async () => {
    try {
      const response = await axios.get(
        `${apiClient}/Job/GetNestedShowChildren`,
        {
          params: {
            partnum: partSearch,
            lotnum: lotSearch,
          },
        }
      );
      const convertData = transformDataToTreeFormat(response.data?.jobs);
      setFilteredTreeData(convertData);
    } catch (error) {
      console.error("Search failed:", error);
      setErrors({ Failed: "Search error. Please try again." });
    }
  };

  const getRowClassName = (params) => {
    const depth = params.row.hierarchy?.length || 0;
    // Levels are 0-indexed in your code (depth 0 = level 1, depth 1 = level 2, etc.)
    return `row-depth-${depth > 3 ? 'default' : depth}`;
  };

  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <StyledDataGrid
        treeData={true}
        rows={filteredTreeData}
        columns={columns}
        getTreeDataPath={getTreeDataPath}
        onRowClick={(params) => setClickedRowId(params.id)}
        getRowClassName={getRowClassName}
      />
    </div>
  );
}