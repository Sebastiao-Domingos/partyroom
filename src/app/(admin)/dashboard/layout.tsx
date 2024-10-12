'use client';
import { ModeToggle } from '@/components/theme/ModeToggle';
import React, { useContext } from 'react';
import { AlarmClock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserToggle } from '@/components/user/user-toggle';
import VerticalMenu from '@/components/menus/vertical-menu';
import Loader from '@/components/loader';
import { useRouter } from 'next/navigation';
import { UserContext, UserProvider } from '@/contexts/useContext';

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <UserProvider>
      <ScreenLayout> {children}</ScreenLayout>;
    </UserProvider>
  );
}

function ScreenLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const navigator = useRouter();
  // const { data, loading } = useGetUserData();
  const user = useContext(UserContext);

  if (user?.loading) {
    return (
      <div className="w-full h-[100vh] flex flex-col">
        <div className="m-auto flex flex-col gap-4">
          <Loader />
          <p className="m-auto">Carregando os dados</p>
        </div>
      </div>
    );
  }
  if (!user?.data) {
    console.log('login router : ', user?.data);

    navigator.replace('/auth/login');
  }

  if (user?.data && user.data.user_type == 'ADMIN') {
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
              <UserToggle />
            </li>
          </ul>
        </header>
        <VerticalMenu />
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
