import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import logo from "../assets/images/Logo-500/3.png";
import bg from "../assets/images/bg1.jpg";
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from "@mui/system";

const PublicLayout = ({ children }) => {
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        component={Paper}
        sx={{
          // backgroundColor: "#1a2f64",
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",

          height: "100vh",
          display: { xs: "none", sm: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={logo} />
        <Box sx={{ width: "100%", height: "1px" }} />
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
