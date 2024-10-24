'use client';
import { ModeToggle } from '@/components/theme/ModeToggle';
import React from 'react';
import { AlarmClock } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
      <header className="sticky z-10 text-foreground bg-background/80 top-0 right-0 w-full shadow py-4 px-2 md:px-10  flex items-center justify-between dark:border-b dark:border-b-gray-800">
        <span className="block text-3xl">LOGO</span>
        <ul className="ml-auto flex gap-4">
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
          <ModeToggle />
          <li>
            <Button variant={'outline'} size={'icon'} className="relative">
              <span className="absolute -top-1 -right-1 size-2 rounded-full bg-red-500 animate-pulse"></span>
              <AlarmClock />
            </Button>
          </li>
        </ul>
      </header>
      <main className="mt-4 mx-2 md:mx-10 min-h-96 overflow-hidden">
        {children}
      </main>
      <footer className="flex mx-2 mt-8 border-t border-border md:mr-8">
        <p className="m-auto text-sm text-slate-400 py-4">
          Party Room @Copy right, Rangel, CTT
        </p>
      </footer>
    </div>
  );
}
