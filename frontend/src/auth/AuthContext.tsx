import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import Keycloak from 'keycloak-js';

type AuthContextValue = {
  keycloak: Keycloak | null;
  initialized: boolean;
  authenticated: boolean;
  login: (redirectUri?: string) => Promise<void>;
  register: (redirectUri?: string) => Promise<void>;
  logout: () => Promise<void>;
  token: string | null;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const keycloakConfig = {
  url: import.meta.env.VITE_KEYCLOAK_URL ?? 'http://localhost:8081',
  realm: import.meta.env.VITE_KEYCLOAK_REALM ?? 'receipts',
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID ?? 'receipts-web',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [keycloak] = useState(() => new Keycloak(keycloakConfig));
  const [initialized, setInitialized] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    keycloak
      .init({
        onLoad: 'check-sso',
        pkceMethod: 'S256',
        checkLoginIframe: false,
        silentCheckSsoFallback: false,
      })
      .then((isAuthenticated) => {
        if (!mounted) {
          return;
        }
        setAuthenticated(isAuthenticated);
        setToken(isAuthenticated ? keycloak.token ?? null : null);
        setInitialized(true);
      })
      .catch(() => {
        if (!mounted) {
          return;
        }
        setInitialized(true);
      });

    keycloak.onAuthSuccess = () => {
      setAuthenticated(true);
      setToken(keycloak.token ?? null);
    };
    keycloak.onAuthRefreshSuccess = () => {
      setToken(keycloak.token ?? null);
    };
    keycloak.onAuthLogout = () => {
      setAuthenticated(false);
      setToken(null);
    };

    return () => {
      mounted = false;
    };
  }, [keycloak]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (keycloak.authenticated) {
        void keycloak.updateToken(30).then((refreshed) => {
          if (refreshed) {
            setToken(keycloak.token ?? null);
          }
        });
      }
    }, 15000);

    return () => window.clearInterval(timer);
  }, [keycloak]);

  const value = useMemo<AuthContextValue>(() => ({
    keycloak,
    initialized,
    authenticated,
    login: async (redirectUri?: string) => {
      await keycloak.login({ redirectUri: redirectUri ?? window.location.origin });
    },
    register: async (redirectUri?: string) => {
      await keycloak.register({ redirectUri: redirectUri ?? window.location.origin });
    },
    logout: async () => {
      await keycloak.logout({ redirectUri: window.location.origin });
    },
    token,
  }), [authenticated, initialized, keycloak, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
