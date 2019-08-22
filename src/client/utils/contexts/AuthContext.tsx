import React, { createContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const defaultContextValue: AuthContextValue = {
  isLoggedIn: false,
};

export const AuthContext = createContext<AuthContextValue>(defaultContextValue);

export const Provider: React.FC = ({ children }) => {
  const [accessToken] = useLocalStorage('accessToken');

  const isLoggedIn = useMemo(
    () => Boolean(accessToken),
    [accessToken]
  );
  const value: AuthContextValue = {
    isLoggedIn,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export interface AuthContextValue {
  isLoggedIn: boolean;
};
