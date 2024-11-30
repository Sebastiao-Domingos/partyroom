'use client';

import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import { PhoneCallIcon, User2Icon } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/auth/useAuth';

export function UserModelDefinition({
  children,
  name,
  whatsapp,
}: {
  children: React.ReactNode;
  name?: string;
  whatsapp?: string;
}) {
  const { logout } = useAuth();

  return (
    <DropdownMenu>
      {children}
      <DropdownMenuContent align="end" className="bg-card w-[250px] p-3">
        <DropdownMenuGroup className="border-b border-primary/40 text-sm">
          <DropdownMenuLabel className="flex gap-1">
            <User2Icon size={15} /> {name}
          </DropdownMenuLabel>
          <DropdownMenuLabel className="flex gap-1 ml-3">
            <PhoneCallIcon size={15} /> {whatsapp}
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuGroup className="flex flex-col gap-2 pt-2">
          <DropdownMenuItem asChild>
            <Link href={'/perfil'}>Perfil</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={'definicoes'}>Definições</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <button onClick={() => logout}>Log out</button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
