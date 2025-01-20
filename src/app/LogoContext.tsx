// src/app/LogoContext.tsx
'use client';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface LogoContextType {
  logoUrl: string;
  setLogoUrl: (url: string) => void;
}

const LogoContext = createContext<LogoContextType | undefined>(undefined);

export const useLogo = () => {
  const context = useContext(LogoContext);
  if (!context) {
    throw new Error('useLogo must be used within a LogoProvider');
  }
  return context;
};

export const LogoProvider = ({ children }: { children: ReactNode }) => {
  // Try to get the logo from localStorage, otherwise fallback to a default logo
  const storedLogoUrl = localStorage.getItem('logoUrl') || '/default-logo.png';
  const [logoUrl, setLogoUrl] = useState(storedLogoUrl);

  useEffect(() => {
    // Save the logo URL to localStorage whenever it changes
    if (logoUrl !== '/default-logo.png') {
      localStorage.setItem('logoUrl', logoUrl);
    }
  }, [logoUrl]);

  return (
    <LogoContext.Provider value={{ logoUrl, setLogoUrl }}>
      {children}
    </LogoContext.Provider>
  );
};
