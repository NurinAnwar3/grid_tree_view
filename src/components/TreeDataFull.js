import * as React from 'react';
import { DataGridPro, DataGridProProps } from '@mui/x-data-grid-pro';
import Box from '@mui/material/Box';
import testData from "../data/TestData3";
import transformDataToTreeFormat from '../utils/dataTransformer';

const columns = [
  { field: 'partnum', headerName: 'Part Number', width: 200 },
  { field: 'partDescription', headerName: 'Description', width: 300 },
  { field: 'lotNum', headerName: 'Lot Number', width: 150 },
  { field: 'jobStatus', headerName: 'Status', width: 120 },
  { field: 'jobOutput', headerName: 'Job Output', type: 'number', width: 120 },
  { field: 'issueQty', headerName: 'Issue Qty', type: 'number', width: 100 },
  { field: 'actualOutput', headerName: 'Actual Output', type: 'number', width: 130 },
  { field: 'requiredQty', headerName: 'Required Qty', type: 'number', width: 120 },
  { field: 'actRequiredQty', headerName: 'Actual Req. Qty', type: 'number', width: 130 },
  { field: 'variance', headerName: 'Variance', width: 100 },
];

const getTreeDataPath = (row) => row.hierarchy;

export default function TreeDataFull() {
  const rows = transformDataToTreeFormat(testData);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ height: 400, mt: 1 }}>
        <DataGridPro
          treeData
          rows={rows}
          columns={columns}
          getTreeDataPath={getTreeDataPath}
          defaultGroupingExpansionDepth={-1}
        />
      </Box>
    </Box>
  );
}