
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { verifySessionToken } from '../auth/backend/auth-be';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
        const res = await verifySessionToken();
        if (!res.success) {
            logout();
          }
    }

    checkSession();
  }, []);

  const login = (sessionId, user) => {
    localStorage.setItem('uprolld.session.id', sessionId);
    localStorage.setItem('uprolld.user.id', user.id);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('uprolld.session.id');
    setUser(null);
    router.push('/auth');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
