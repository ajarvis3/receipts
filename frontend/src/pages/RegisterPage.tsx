import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export function RegisterPage() {
  const { initialized, register } = useAuth();

  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', px: 2 }}>
      <Card sx={{ width: '100%', maxWidth: 480 }}>
        <CardContent>
          <Stack spacing={2}>
            <Button component={Link} to="/" variant="text" sx={{ alignSelf: 'flex-start', px: 0 }}>
              Home
            </Button>
            <Typography variant="h4" fontWeight={800}>
              Create account
            </Typography>
            <Typography color="text.secondary">
              Use Keycloak self-registration to create your HSA Receipts account.
            </Typography>
            <Button variant="contained" onClick={() => void register(`${window.location.origin}/app/expenses`)} disabled={!initialized}>
              Register with Keycloak
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
