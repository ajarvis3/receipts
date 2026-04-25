import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', px: 2 }}>
      <Card sx={{ width: '100%', maxWidth: 640 }}>
        <CardContent>
          <Stack spacing={2}>
            <Button component={Link} to="/" variant="text" sx={{ alignSelf: 'flex-start', px: 0 }}>
              Home
            </Button>
            <Typography variant="overline" color="primary" fontWeight={700}>
              HSA Receipts
            </Typography>
            <Typography variant="h3" fontWeight={800}>
              Track receipts without losing sight of your own record.
            </Typography>
            <Typography color="text.secondary">
              Create an account, sign in, and manage your receipts privately through Keycloak.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
              <Button component={Link} to="/login" variant="contained" fullWidth>
                Sign in
              </Button>
              <Button component={Link} to="/register" variant="outlined" fullWidth>
                Register
              </Button>
            </Stack>
            <Button component={Link} to="/app/expenses" variant="text">
              Go to receipts
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
