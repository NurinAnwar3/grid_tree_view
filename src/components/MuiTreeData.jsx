import * as React from "react";
import { DataGridPro } from "@mui/x-data-grid-pro";
import transformDataToTreeFormat from "../utils/convertDataMuiTree";
import axios from "axios";
import { useApiClient } from "../context/ApiClientContext";
import { GridRowClassNameParams } from '@mui/x-data-grid-pro'
import { darken, lighten, styled } from "@mui/system";


const getBackgroundColor = (color, theme, coefficient) => ({
  backgroundColor: darken(color, coefficient),
  ...theme.applyStyles('light', {
    backgroundColor: lighten(color, coefficient),
  }),
});

const StyledDataGrid = styled(DataGridPro)(({ theme }) => ({
  '& .row-depth-0': {
    ...getBackgroundColor(theme.palette.primary.main, theme, 0.7),
    '&:hover': {
      ...getBackgroundColor(theme.palette.primary.main, theme, 0.6),
    },
    '&.Mui-selected': {
      ...getBackgroundColor(theme.palette.primary.main, theme, 0.5),
      '&:hover': {
        ...getBackgroundColor(theme.palette.primary.main, theme, 0.4),
      },
    },
  },
  '& .row-depth-1': {
    ...getBackgroundColor(theme.palette.success.main, theme, 0.7),
    '&:hover': {
      ...getBackgroundColor(theme.palette.success.main, theme, 0.6),
    },
    '&.Mui-selected': {
      ...getBackgroundColor(theme.palette.success.main, theme, 0.5),
      '&:hover': {
        ...getBackgroundColor(theme.palette.success.main, theme, 0.4),
      },
    },
  },
  '&.row-depth-2': {
    ...getBackgroundColor(theme.palette.warning.main, theme, 0.7),
    '&:hover': {
      ...getBackgroundColor(theme.palette.warning.main, theme, 0.6),
    },
    '&.Mui-selected': {
      ...getBackgroundColor(theme.palette.warning.main, theme, 0.5),
      '&:hover': {
        ...getBackgroundColor(theme.palette.warning.main, theme, 0.4),
      },
    },
  },
  '&.row-depth-3': {
    ...getBackgroundColor(theme.palette.secondary.main, theme, 0.7),
    '&:hover': {
      ...getBackgroundColor(theme.palette.secondary.main, theme, 0.6),
    },
    '&.Mui-selected': {
      ...getBackgroundColor(theme.palette.secondary.main, theme, 0.5),
      '&:hover': {
        ...getBackgroundColor(theme.palette.secondary.main, theme, 0.4),
      },
    },
  },
  '& .row-default': {
    ...getBackgroundColor(theme.palette.error.main, theme, 0.7),
    '&:hover': {
      ...getBackgroundColor(theme.palette.error.main, theme, 0.6),
    },
    '&.Mui-selected': {
      ...getBackgroundColor(theme.palette.error.main, theme, 0.5),
      '&:hover': {
        ...getBackgroundColor(theme.palette.error.main, theme, 0.4),
      },
    },
  },
}));

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
   searchData()
    
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
      //console.log("response", response.data.jobs);

      var convertData = transformDataToTreeFormat(response.data?.jobs)
      //console.log('converted', convertData);
      
      setFilteredTreeData(convertData);
    } catch (error) {
      console.error("Search failed:", error);
      setErrors({ Failed: "Search error. Please try again." });
    }
  };

  return (
    <div style={{ height: "80vh" , width: "100%" }}>
      <DataGridPro
        treeData = {true}
        rows={filteredTreeData}
        columns={columns}
        getTreeDataPath={getTreeDataPath}
        onRowClick={(params) => {          
          setClickedRowId(params.id);
        }}
        getRowClassName={(params) => {
          // const isClicked = params.id === clickedRowId;
          //console.log('depth', params.row.hierarchy + ' ' + 'length:' + params.row.hierarchy.length);
          
          const depth = params.row.hierarchy.length;
          console.log('depth', depth);
          var result;
          if(depth === 0){
             result = 'row-depth-0';
          } else if(depth === 1){
            result = 'row-depth-1'
          } else if (depth === 2) {
            result = 'row-depth-2'
          }else if (depth === 3) {
            result = 'row-depth-3'
          }else if (depth === 4) {
            result = 'row-depth-4'
          } else {
            result = 'row-default'
          }

          return result;
        }}
      />
    </div>
  );
}
