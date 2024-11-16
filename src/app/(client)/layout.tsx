'use client';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Menu_Client from '@/components/menus/client';
import Footer_Client from '@/components/footer/client';

const queryClient = new QueryClient();

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <QueryClientProvider client={queryClient}>
      <ScreenLayout> {children}</ScreenLayout>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

function ScreenLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Menu_Client />
      <main className="min-h-96 overflow-hidden">{children}</main>
      <Footer_Client />
    </div>
  );
}
