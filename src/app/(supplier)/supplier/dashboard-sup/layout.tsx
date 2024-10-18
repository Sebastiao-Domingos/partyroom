'use client';
import { ModeToggle } from '@/components/theme/ModeToggle';
import React, { useEffect } from 'react';
import { AlarmClock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserToggle } from '@/components/user/user-toggle';
import Loader from '@/components/loader';
import { redirect } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGetUserData } from '@/hooks/auth/useGetUserData';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useAuth } from '@/hooks/auth/useAuth';
import VerticalMenuSupplier from '@/components/menus/vertical-menu/menu-supplier';

const queryClient = new QueryClient();

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <QueryClientProvider client={queryClient}>
      <ScreenLayout> {children}</ScreenLayout>;
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

function ScreenLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { user, status } = useGetUserData();
  const { logout } = useAuth();

  useEffect(() => {
    if (
      status === 'error' ||
      (user !== undefined && user.user_type !== 'SUPPLIER')
    ) {
      logout.mutate();
      redirect('/supplier/auth/login');
    }
  }, [status, user, logout]);
  if (status === 'pending') {
    return (
      <div className="w-full h-[100vh] flex flex-col">
        <div className="m-auto flex flex-col gap-4">
          <Loader />
          <p className="m-auto">Carregando os dados</p>
        </div>
      </div>
    );
  }

  if (user && user.user_type == 'SUPPLIER' && status === 'success') {
    return (
      <div>
        <header className="sticky z-10 text-foreground bg-background/80 top-0 left-[211px] right-0 w-full shadow py-4 px-8 flex items-center justify-between dark:border-b dark:border-b-gray-800">
          <ul className="flex gap-4 items-center ml-auto">
            <ModeToggle />
            <li>
              <Button variant={'outline'} size={'icon'} className="relative">
                <span className="absolute -top-1 -right-1 size-2 rounded-full bg-red-500 animate-pulse"></span>
                <AlarmClock />
              </Button>
            </li>
            <li>
              <UserToggle name={`${user.first_name}`} />
            </li>
          </ul>
        </header>
        <VerticalMenuSupplier />
        <main className="mt-4 ml-[230px] mr-8 min-h-96 overflow-hidden">
          {children}
        </main>
        <footer className="flex ml-[216px] mt-8 border-t border-border mr-8">
          <p className="m-auto text-sm text-slate-400 py-4">
            Party Room @Copy right, Rangel, CTT
          </p>
        </footer>
      </div>
    );
  }
}
