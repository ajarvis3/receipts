import { Outlet } from 'react-router-dom';
import { AuthProvider } from '../auth/AuthContext';

export function AuthGate() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
