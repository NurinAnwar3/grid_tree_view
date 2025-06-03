import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

export default function Dashboard() {
  return (
    <Container>
      <Box mt={5}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
          <Typography>Welcome to your dashboard!</Typography>
        </Paper>
      </Box>
    </Container>
  );
}
