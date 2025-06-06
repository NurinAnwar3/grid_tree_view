import React, { useEffect, useState } from 'react';
import { DataGridPro } from '@mui/x-data-grid-pro';
import Box from '@mui/material/Box';
import transformDataToTreeFormat from '../utils/dataTransformer';
import axios from 'axios';
import { useApiClient } from "../context/ApiClientContext";
import { darken, lighten, styled } from '@mui/material/styles';

const makeBoldHeader = (label) => () => <strong>{label}</strong>;

const columns = [
  // {
  //   field: 'jobNum',
  //   renderHeader: makeBoldHeader('Job Number'),
  //   width: 200,
  // },
  {
    field: 'partnum',
    renderHeader: makeBoldHeader('Part Number'),
    width: 200,
  },
  {
    field: 'partDescription',
    renderHeader: makeBoldHeader('Description'),
    width: 300,
  },
  {
    field: 'lotNum',
    renderHeader: makeBoldHeader('Lot Number'),
    width: 150,
  },
  {
    field: 'jobStatus',
    renderHeader: makeBoldHeader('Status'),
    width: 120,
  },
  {
    field: 'jobOutput',
    renderHeader: makeBoldHeader('Job Output'),
    type: 'number',
    width: 120,
  },
  {
    field: 'issueQty',
    renderHeader: makeBoldHeader('Issue Qty'),
    type: 'number',
    width: 100,
  },
  {
    field: 'actualOutput',
    renderHeader: makeBoldHeader('Actual Output'),
    type: 'number',
    width: 130,
  },
  {
    field: 'requiredQty',
    renderHeader: makeBoldHeader('Required Qty'),
    type: 'number',
    width: 120,
  },
  {
    field: 'actRequiredQty',
    renderHeader: makeBoldHeader('Actual Req. Qty'),
    type: 'number',
    width: 130,
  },
  {
    field: 'variance',
    renderHeader: makeBoldHeader('Variance'),
    width: 100,
  },
];

const getTreeDataPath = (row) => row.hierarchy;

const getBackgroundColor = (color, theme, coefficient) => ({
  backgroundColor: darken(color, coefficient),
  ...theme.applyStyles('light', {
    backgroundColor: lighten(color, coefficient),
  }),
});

const StyledDataGridPro = styled(DataGridPro)(({ theme }) => ({
  '& .super-app-theme--Open': {
    ...getBackgroundColor(theme.palette.info.main, theme, 0.7),
    '&:hover': {
      ...getBackgroundColor(theme.palette.info.main, theme, 0.6),
    },
    '&.Mui-selected': {
      ...getBackgroundColor(theme.palette.info.main, theme, 0.5),
      '&:hover': {
        ...getBackgroundColor(theme.palette.info.main, theme, 0.4),
      },
    },
  },
  '& .super-app-theme--Completed': {
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
  '& .super-app-theme--InProgress': {
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
}));

export default function TreeDataFull() {
  const [rows, setRows] =  useState([]);
  const [loading, setLoading] = useState(true);
  const apiClient = useApiClient();

  useEffect(() => {
    async function fetchTreeData() {
    try {
      const response = await axios.get(`${apiClient}/Job/GetNestedShowChildren`);
      const data = response.data.jobs;

      const transformed = transformDataToTreeFormat(data);
      setRows(transformed);
    } catch (error) {
      console.log('Error loading tree data: ', error);
    } finally {
      setLoading(false);
    }
  }
    fetchTreeData();
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ height: 400, mt: 1 }}>
        <StyledDataGridPro
          treeData
          rows={rows}
          columns={columns}
          getTreeDataPath={getTreeDataPath}
          loading={loading}
          defaultGroupingExpansionDepth={-1}
          showToolbar
          groupingColDef={{
            headerName: 'Job Number', 
            renderHeader: makeBoldHeader('Job Number'), 
            width: 200,
          }}
          getRowClassName={(params) => `super-app-theme--${params.row.jobStatus}`}
        />
      </Box>
    </Box>
  );
}