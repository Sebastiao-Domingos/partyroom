'use client';
import {
  ButtonToggleModeClient,
  ModeToggle,
} from '@/components/theme/ModeToggle';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();
  return (
    <div>
      <header className="fixed z-20 text-white top-0 right-0 w-full shadow py-4 px-2 md:px-10  flex items-center justify-between dark:border-b dark:border-b-gray-800">
        <span className="block text-3xl">LOGO</span>
        <ul className="ml-auto flex gap-">
          <li>
            <Link
              href={''}
              className={`p-3 uppercase hover:text-primary ${
                pathname === '/' && 'text-primary'
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link href={''} className="p-3 uppercase hover:text-primary">
              eventos
            </Link>
          </li>
          <li>
            <Link href={''} className="p-3 uppercase hover:text-primary">
              Serviçõs
            </Link>
          </li>{' '}
          <li>
            <Link href={''} className="p-3 uppercase hover:text-primary">
              Ajuda
            </Link>
          </li>
        </ul>
        <ul className="hidden md:flex gap-4 items-center ml-auto">
          <ModeToggle>
            <ButtonToggleModeClient />
          </ModeToggle>
        </ul>
      </header>
      <main className="min-h-96 overflow-hidden">{children}</main>
      <footer className="w-full h-[400px] bg-slate-200 flex  mt-8 border-t /border-border">
        <p className="m-auto text-sm text-slate-400 py-4">
          Party Room @Copy right, Rangel, CTT
        </p>
      </footer>
    </div>
  );
}
