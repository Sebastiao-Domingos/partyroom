'use client';
import {
  ButtonToggleModeClient,
  ModeToggle,
} from '@/components/theme/ModeToggle';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MenuMobileClient from './menu-mobile-client';
import { useGetUserData } from '@/hooks/auth/useGetUserData';
import { Button } from '@/components/ui/button';
import { UserIcon } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { UserModelDefinition } from './drop-down-menu';
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

function Menu_Client() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const { user, status } = useGetUserData();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <header
      className={`fixed z-20 transition-colors ${
        scrolled &&
        'bg-background/80 text-black shadow dark:border-b dark:border-b-gray-800'
      } text-white top-0 right-0 w-full py-4 px-2 md:px-10 flex items-center justify-between`}
    >
      <span className="block text-3xl">LOGO</span>
      <ul className="hidden md:flex ml-auto dark:text-slate-50 /text-foreground">
        <li>
          <Link
            href={'/'}
            className={`p-3 uppercase hover:text-primary text-foreground ${
              pathname === '/' && 'text-primary'
            }`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href={''}
            className={`p-3 uppercase hover:text-primary text-foreground ${
              pathname === '/eventos' && 'text-primary'
            }`}
          >
            eventos
          </Link>
        </li>
        <li>
          <Link
            href={''}
            className={`p-3 uppercase hover:text-primary text-foreground ${
              pathname === '/servicos' && 'text-primary'
            }`}
          >
            Serviçõs
          </Link>
        </li>{' '}
        <li>
          <Link
            href={''}
            className={`p-3 uppercase hover:text-primary text-foreground ${
              pathname === '/ajuda' && 'text-primary'
            }`}
          >
            Ajuda
          </Link>
        </li>
      </ul>
      <div className="/hidden md:flex gap-6 items-center ml-auto text-foreground">
        <ModeToggle>
          <ButtonToggleModeClient />
        </ModeToggle>
        {status === 'success' && user && (
          <UserModelDefinition
            name={`${user.first_name} ${user.last_name}`}
            whatsapp={user.phone_number}
          >
            <DropdownMenuTrigger>
              <Avatar className="bg-primary dark:bg-primary/50 flex justify-center items-center">
                <span className="space-y-2 font-bold">
                  <span>{user.first_name.charAt(0).toUpperCase()}</span>
                  <span>{user.last_name.charAt(0).toUpperCase()}</span>
                </span>
              </Avatar>
            </DropdownMenuTrigger>
          </UserModelDefinition>
        )}
        {(status !== 'success' || !user) && (
          <Link
            href={'/login'}
            className={`p-3 uppercase hover:text-primary ${
              pathname === '/login' && 'text-primary'
            }`}
          >
            Login
          </Link>
        )}
      </div>
      <MenuMobileClient />
    </header>
  );
}

export default Menu_Client;
