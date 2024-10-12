import { UserData } from '@/services/auth';
import React, { createContext } from 'react';

export const UserContext = createContext<{
  data: UserData | null;
  loading: boolean;
} | null>(null);

export const UserProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <UserContext.Provider value={null}>{children}</UserContext.Provider>;
};
