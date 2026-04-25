import { useMemo } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useAuth } from '../auth/AuthContext';

export function AppShell() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const title = useMemo(() => {
    if (location.pathname.includes('/expenses/new')) {
      return 'New Expense';
    }
    if (location.pathname.match(/\/expenses\/[^/]+$/)) {
      return 'Edit Expense';
    }
    return 'Expenses';
  }, [location.pathname]);

  return (
    <Box>
      <AppBar position="sticky" elevation={0} color="transparent">
        <Toolbar sx={{ backdropFilter: 'blur(12px)' }}>
          <ReceiptLongIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Button component={Link} to="/" color="inherit" sx={{ textTransform: 'none', fontWeight: 700, mr: 2 }}>
            HSA Receipts
          </Button>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/app/expenses" color="inherit">
            Expenses
          </Button>
          <Button
            component={Link}
            to="/app/expenses/new"
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ mx: 2 }}
          >
            Add
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              void logout().then(() => navigate('/', { replace: true }));
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 800 }}>
          {title}
        </Typography>
        <Outlet />
      </Container>
    </Box>
  );
}
