'use client';

import * as React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function UserToggle() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Domingos</DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Perfil</DropdownMenuItem>
        <DropdownMenuItem>Difinições</DropdownMenuItem>
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
