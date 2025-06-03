import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import logo from "../assets/images/Logo-250/2.png";
import bg from "../assets/images/bg1.jpg";
import { Box } from "@mui/system";

const PublicLayout = ({ children }) => {
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      {/* <CssBaseline /> */}
      <Grid
        item
        xs={12}
        sx={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          border={1}
          borderColor="primary"
          borderRadius={2}
          px={1}
          py={4}
          
          sx={{
            backgroundColor: "#fff",
          }}
        >
          <Box textAlign="center" >
            <img src={logo}  />
          </Box>

          {children}
        </Box>
      </Grid>
    </Grid>
  );
};

export default PublicLayout;
