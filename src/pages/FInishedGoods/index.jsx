import { Box, Header, Typography } from "@mui/material";
import TreeDataFull from "../../components/TreeDataFull";
import PrivateLayout from "../../layouts/privateLayout";
import TreeDataWithGap from "../../components/MuiTreeData";

export default function FinishedGoods() {
  return (
    <PrivateLayout>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography fontWeight="bold"
            sx={{ textTransform: "uppercase" }} variant="h5">Finished Goods Tracking</Typography>
        </Box>
        <TreeDataWithGap />
      </Box>
    </PrivateLayout>
  );
}
