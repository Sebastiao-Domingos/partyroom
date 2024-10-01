import { ModeToggle } from '@/components/theme/ModeToggle';
import React from 'react';
import { AlarmClock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserToggle } from '@/components/user/user-toggle';
import VerticalMenu from '@/components/menus/vertical-menu';

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <header className="fixed z-10 bg-slate-50/80 dark:text-slate-50 dark:bg-gray-900 top-0 left-0 right-0 w-full shadow py-4 px-8 flex items-center justify-between dark:border-b dark:border-b-gray-800">
        <span>LOGO</span>

        <ul className="flex gap-4 items-center">
          <ModeToggle />
          <li>
            <Button variant={'outline'} size={'icon'} className="relative">
              <span className="absolute -top-1 -right-1 size-2 rounded-full bg-red-500 animate-pulse"></span>
              <AlarmClock />
            </Button>
          </li>
          <li>
            <UserToggle />
          </li>
        </ul>
      </header>
      <VerticalMenu />
      <main className="mt-[90px] ml-[216px] mr-8 min-h-96">{children}</main>
      <footer className="flex ml-[216px] mt-8 border-t border-slate-100 mr-8">
        <p className="m-auto text-sm text-slate-400 py-4">
          Party Room @Copy right, Rangel, CTT
        </p>
      </footer>
    </div>
  );
}
