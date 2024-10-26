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
import { Facebook, Instagram, Linkedin, PhoneCall } from 'lucide-react';

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
      <footer className="w-full min-h-[400px] bg-slate-200 flex  mt-8 border-t /border-border">
        <div className="w-full flex flex-col px-8 pt-8 pb-4">
          <div className="w-full flex flex-col md:flex-row gap-4 md:justify-between">
            <div className="space-y-4">
              <h3 className="text-primary uppercase">Redes sociais</h3>
              <ul className="flex gap-3">
                <li>
                  <Link href={''} className="hover:text-primary/50">
                    <Instagram />
                  </Link>
                </li>
                <li>
                  <Link href={''} className="hover:text-primary/50">
                    <Linkedin />
                  </Link>
                </li>
                <li>
                  <Link href={''} className="hover:text-primary/50">
                    <Facebook />
                  </Link>
                </li>

                <li>
                  <Link href={''} className="hover:text-primary/50">
                    <PhoneCall />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-primary uppercase">Navegação</h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <Link href={''} className="hover:text-primary/50">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href={''} className="hover:text-primary/50">
                    Serviços
                  </Link>
                </li>
                <li>
                  <Link href={''} className="hover:text-primary/50">
                    Tipos de eventos
                  </Link>
                </li>

                <li>
                  <Link href={''} className="hover:text-primary/50">
                    Salões
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-primary uppercase">Serviços</h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <Link href={''} className="hover:text-primary/50">
                    Como podemos te judar?
                  </Link>
                </li>
                <li>
                  <Link href={''} className="hover:text-primary/50">
                    Mais informações
                  </Link>
                </li>
                <li>
                  <Link href={''} className="hover:text-primary/50">
                    Fale conosco
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <p className="mt-auto text-center text-sm text-slate-400 py-4">
            Party Room @Copy right, Rangel, CTT
          </p>
        </div>
      </footer>
    </div>
  );
}
