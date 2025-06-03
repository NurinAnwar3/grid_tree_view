import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import logo from "../assets/images/Logo-250/3.png";
import { CssBaseline } from "@mui/material";
import bg from "../assets/images/bg4.png";
import { Box } from "@mui/system";

const PublicLayout = ({ children }) => {
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      {/* <CssBaseline /> */}
      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        sx={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box px={3}>
          <img src={logo} width="20%" />
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        component={Paper}
        elevation={6}
        square
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </Grid>
    </Grid>
  );
};

export default PublicLayout;
