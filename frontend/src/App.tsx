import { Navigate, Route, Routes } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { AuthGate } from './components/AuthGate';
import { AppShell } from './components/AppShell';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ExpensesPage } from './pages/ExpensesPage';
import { ExpenseEditorPage } from './pages/ExpenseEditorPage';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0f766e',
    },
    secondary: {
      main: '#f59e0b',
    },
    background: {
      default: '#f6f7fb',
      paper: '#ffffff',
    },
  },
  shape: {
    borderRadius: 16,
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', background: 'linear-gradient(180deg, #f6f7fb 0%, #eef2ff 100%)' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<AuthGate />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <AppShell />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/app/expenses" replace />} />
              <Route path="expenses" element={<ExpensesPage />} />
              <Route path="expenses/new" element={<ExpenseEditorPage mode="create" />} />
              <Route path="expenses/:expenseId" element={<ExpenseEditorPage mode="edit" />} />
            </Route>
          </Route>
        </Routes>
      </Box>
    </ThemeProvider>
  );
}
