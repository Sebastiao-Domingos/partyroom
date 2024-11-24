'use client';
import {
  ButtonToggleModeClient,
  ModeToggle,
} from '@/components/theme/ModeToggle';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MenuMobileClient from './menu-mobile-client';
import { Button } from '@/components/ui/button';

function Menu_Client() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

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
      <ul className="hidden md:flex ml-auto dark:text-slate-50">
        <li>
          <Link
            href={'/'}
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
      <div className="/hidden md:flex gap-4 items-center ml-auto">
        <ModeToggle>
          <ButtonToggleModeClient />
        </ModeToggle>
        <Button variant={'secondary'}>Login</Button>
      </div>
      <MenuMobileClient />
    </header>
  );
}

export default Menu_Client;
