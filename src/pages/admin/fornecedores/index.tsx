import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function fornecedores() {
  return (
    <div>
      <div className="flex items-center">
        <div className="">
          <h1 className="text-orange-500 font-bold border-l pl-2 uppercase">
            Fornecedores
          </h1>
          <div className="pl-2 mt-2 text-[12px]">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbPage className="text-[12px]">Home</BreadcrumbPage>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" className="text-[12px]">
                    Admin
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard" className="text-[12px]">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbPage className="text-[12px]">
                  Fornecedores
                </BreadcrumbPage>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        <Button className="space-y-3 bg-orange-500 ml-auto">
          <PlusCircle className="mr-2" /> Adicionar
        </Button>
      </div>
      <ScrollArea className="w-[calc(100vw-250px)] flex gap-3 py-2 mt-6">
        <div className="w-full flex gap-3">ola</div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
