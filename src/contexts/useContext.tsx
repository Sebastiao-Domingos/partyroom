import { useGetUserData } from '@/hooks/auth/useGetUserData';
import { UserData } from '@/services/auth';
import React, { createContext } from 'react';

export const UserContext = createContext<{
  data: UserData | null;
  loading: boolean;
} | null>(null);

export const UserProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const { data, loading } = useGetUserData();
  return (
    <UserContext.Provider value={{ data: data, loading: loading }}>
      {children}
    </UserContext.Provider>
  );
};
