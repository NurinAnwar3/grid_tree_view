import React, { useState } from "react";
import {
  Box,
  Avatar,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Typography,
  Paper,
  ThemeProvider,
} from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import { LockOutlined as LockOutlinedIcon, Visibility, VisibilityOff } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { Container, createTheme } from "@mui/system";
import PublicLayout from "../layouts/publicLayout";
import CustomTheme from "../customTheme";
import axios from 'axios';
import { useApiClient } from "../context/ApiClientContext";

const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const apiClient = useApiClient();

  const validEmail = "123@gmail.com";
  const validPassword = "123";

  const handleChange = (field, event) => {
    setData({ ...data, [field]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  const newErrors = {};
  Object.entries(data).forEach(([key, value]) => {
    const error = validate(key, value);
    if (error) newErrors[key] = error;
  });

  setErrors(newErrors);
  if (Object.keys(newErrors).length > 0) return;

  try {
    const result = true;
   // const result = await axios.post(`${apiClient}/user/login`, data);
    console.log("Login response:", result);

    if (result) {
      // localStorage.setItem("loggedInID", result.data.id);
      navigate("/homepage");
    } else {
      setErrors({ form: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login failed:", error);
    setErrors({ form: "Unexpected error occurred. Please try again." });
  }
};


  const validate = (name, value) => {
    switch (name) {
      case "email":
        if (!value.trim()) return "Email is required";
        return "";
      case "password":
        if (!value) return "Password is required";
        return "";
      default:
        return "";
    }
  };

  return (
    <Box
      sx= {{
      height: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      // background: 'linear-gradient(to right,rgb(88, 153, 214),rgb(177, 188, 235))',
      }}
    >
       <CssBaseline />
        <Container
          maxWidth="xs"
          component={Paper}
          elevation={6}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 2,
            backdropFilter: "blur(10px)", // optional for frosted glass look
            backgroundColor: "rgba(255, 255, 255, 0.85)",
          }}
        >
          <Avatar sx={{ bgcolor: "secondary.main", mb: 2 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" mb={2}>
            Sign In
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }} noValidate>
            <TextField
              label="Email"
              id="email"
              name="email"
              type="email"
              value={data.email}
              onChange={(e) => handleChange("email", e)}
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
              fullWidth
              autoFocus
            />

            <FormControl
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.password}
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={data.password}
                onChange={(e) => handleChange("password", e)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {errors.password && (
                <FormHelperText sx={{ color: red[700] }}>{errors.password}</FormHelperText>
              )}
            </FormControl>

            {errors.form && (
              <FormHelperText
                sx={{ color: red[700], textAlign: "center", marginBottom: 2 }}
              >
                {errors.form}
              </FormHelperText>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Container>
    </Box>
  );
}
