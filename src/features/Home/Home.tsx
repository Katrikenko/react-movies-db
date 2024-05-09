import { Box, Button, Container, Stack, Typography, Divider } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function CopyRight() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      Copyright © The Movies DB {new Date().getFullYear()}
    </Typography>
  );
}

export default function Home() {
  const { user, isAuthenticated } = useAuth0();

  const greeting = isAuthenticated
    ? `${user?.name}, explore movies today with us!`
    : `Explore movies today with us!`;

  // throw new Error("Fatality!");

  return (
    <Box sx={{ bgcolor: "background.paper", pt: 8, pb: 8 }}>
      <Container maxWidth="sm">
        <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
          Welcome
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          {greeting}
        </Typography>
        <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
          <Button component={RouterLink} to="/movies" variant="contained" color="secondary">
            Explore
          </Button>
        </Stack>
      </Container>
      <Divider variant="middle" sx={{ p: 3 }} />
      <CopyRight />
    </Box>
  );
}
