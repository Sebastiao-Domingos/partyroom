'use client';
import React from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  BookDashed,
  HomeIcon,
  LogOut,
  MenuIcon,
  PhoneCall,
  Settings,
  Star,
  User,
} from 'lucide-react';
import { UserData } from '@/services/auth';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/auth/useAuth';

function MenuMobileClient({ user }: { user?: UserData }) {
  const path = usePathname();
  const navigator = useRouter();
  const { logout } = useAuth();
  return (
    <Sheet>
      <SheetTrigger className="md:hidden dark:text-foreground">
        <MenuIcon className="md:hidden" size={30} />
      </SheetTrigger>
      <SheetContent className="w-full md:w-auto">
        {user && (
          <SheetHeader className="border-b border-border">
            <SheetTitle className="text-left flex gap-1 text-primary">
              <User />
              {user?.first_name} {user?.last_name}
            </SheetTitle>
            <SheetDescription className="text-left text-sm flex items-center gap-1 ml-2">
              <PhoneCall size={15} />
              {user?.phone_number}
            </SheetDescription>
          </SheetHeader>
        )}

        {!user && (
          <div>
            <h3 className="text-primary">Menu</h3>
          </div>
        )}
        <div className="h-[calc(100vh-150px)] pt-3">
          <ul className="flex flex-col gap-2">
            <li
              className={cn(
                `border-l-2 border-l-primary hover:bg-primary/20 /bg-primary/10 ${
                  path === '/' && 'bg-primary/20'
                }`
              )}
            >
              <SheetClose
                className="w-full flex items-center gap-1 p-2"
                onClick={() => navigator.push('/')}
              >
                <BookDashed size={20} />
                Home
              </SheetClose>
            </li>
            <li
              className={cn(
                `border-l-2 border-l-primary hover:bg-primary/20 ${
                  path === '/saloes' && 'bg-primary/20'
                }`
              )}
            >
              <SheetClose
                className="w-full flex items-center gap-1 p-2"
                onClick={() => navigator.push('/saloes')}
              >
                <HomeIcon size={20} />
                Salões de festas
              </SheetClose>
            </li>
            <li
              className={cn(
                `border-l-2 border-l-primary hover:bg-primary/20 ${
                  path === '/servicos' && 'bg-primary/20'
                }`
              )}
            >
              <SheetClose
                className="w-full flex items-center gap-1 p-2 "
                onClick={() => navigator.push('/servicos')}
              >
                <Settings size={20} />
                Tipos Serviços
              </SheetClose>
            </li>
            <li
              className={cn(
                `border-l-2 border-l-primary hover:bg-primary/20 ${
                  path === '/eventos' && 'bg-primary/20'
                }`
              )}
            >
              <SheetClose
                className="w-full flex items-center gap-1 p-2 "
                onClick={() => navigator.push('/eventos')}
              >
                <Star size={20} />
                Tipos de eventos
              </SheetClose>
            </li>
            {user && (
              <li
                className={cn(
                  `border-l-2 border-l-primary hover:bg-primary/20 `
                )}
              >
                <SheetClose
                  className="w-full flex items-center gap-1 p-2"
                  onClick={() => logout.mutate()}
                >
                  <LogOut size={20} />
                  Log out
                </SheetClose>
              </li>
            )}
          </ul>
        </div>
        {user && (
          <SheetFooter className="border-t border-border">
            <div className="space-y-2 pt-2">
              <SheetClose
                className="flex text-left items-center gap-1"
                onClick={() => navigator.push('/supplier/dashboard-sup/perfil')}
              >
                <User size={16} />
                Perfil
              </SheetClose>
              <SheetClose
                className="flex text-left items-center gap-1"
                onClick={() => logout.mutate()}
              >
                <LogOut size={16} />
                Log out
              </SheetClose>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default MenuMobileClient;
