import { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { useAuth } from './AuthContext';

export function ProtectedRoute({ children }: PropsWithChildren) {
  const { initialized, authenticated } = useAuth();
  const location = useLocation();

  if (!initialized) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!authenticated) {
    return <Navigate to="/" replace state={{ from: `${location.pathname}${location.search}` }} />;
  }

  return <>{children}</>;
}
