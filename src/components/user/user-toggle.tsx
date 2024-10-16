'use client';

import * as React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/auth/useAuth';

export function UserToggle({ name }: { name: string }) {
  const { logout } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{name}</DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Perfil</DropdownMenuItem>
        <DropdownMenuItem>Difinições</DropdownMenuItem>
        <DropdownMenuItem onClick={() => logout.mutate()}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
