import {
  Box,
  Button,
  CssBaseline,
  Divider,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Section2 from "../../components/Section2";
import TreeDataFull from "../../components/TreeDataFull";
import WarehouseSection from "../../components/WarehouseSection";
import PrivateLayout from "../../layouts/privateLayout";
import { Stack } from "@mui/system";
import { useState } from "react";
import { Search } from "@mui/icons-material";
import GridTreeDataBasic from "../../components/GridTreeDataBasic";

export default function Material() {
  const [filters, setFilters] = useState({
    partNumber: "",
    lotNumber: "",
  });

  const [searchTrigger, setSearchTrigger] = useState(0);

  const handleSearch = () => {
    setSearchTrigger((prev) => 
      {
       return prev + 1
      }
      );
  };

  return (
    <PrivateLayout>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={5}>
          <Typography
            fontWeight="bold"
            sx={{ textTransform: "uppercase" }}
            variant="h5"
          >
            Material Tracking
          </Typography>
        </Box>

        <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Part Number"
              name="partNumber"
              value={filters.partNumber}
              onChange={(e) =>
                setFilters({ ...filters, partNumber: e.target.value })
              }
              size="small"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Lot Number"
              name="lotNumber"
              value={filters.lotNumber}
              onChange={(e) =>
                setFilters({ ...filters, lotNumber: e.target.value })
              }
              size="small"
            />
          </Grid>

          <Grid item xs={2}>
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{ height: "40px" }}
            >
              SEARCH
            </Button>
          </Grid>
        </Grid>
        {/* <Divider sx={{ my:3 , border: "1px solid rgb(122, 116, 116)", display: "flex" }}/> */}

        <Box sx={{ mb: 3, p: 2, border: "1px solid #eee ", display: "flex", backgroundColor: 'rgb(233, 227, 227)' }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography>
              <strong>Total Purchase:</strong> 200 kg
            </Typography>
            <Typography>
              <strong>Variance:</strong>{" "}
              <span style={{ color: "red" }}>100%</span>
            </Typography>
          </Stack>
        </Box>
        {/* <Divider sx={{ my:3 , border: "1px solid rgb(122, 116, 116)", display: "flex" }}/> */}
        <WarehouseSection />
        <Section2 />
        <TreeDataFull filters={filters} triggers={searchTrigger} />
      </Box>
    </PrivateLayout>
  );
}
