import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export function LoginPage() {
  const { initialized, login } = useAuth();
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', px: 2 }}>
      <Card sx={{ width: '100%', maxWidth: 480 }}>
        <CardContent>
          <Stack spacing={2}>
            <Button component={Link} to="/" variant="text" sx={{ alignSelf: 'flex-start', px: 0 }}>
              Home
            </Button>
            <Typography variant="h4" fontWeight={800}>
              Sign in
            </Typography>
            <Typography color="text.secondary">
              Continue to Keycloak to access your receipts.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
              <Button variant="contained" onClick={() => void login(`${window.location.origin}/app/expenses`)} disabled={!initialized} fullWidth>
                Sign in with Keycloak
              </Button>
              <Button variant="text" onClick={() => void navigate('/')} disabled={!initialized} fullWidth>
                Back
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
