import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export default function AuthProvider({ children, isSignedIn }) {
  const [user] = useState(isSignedIn ? { id: 1 } : null);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
