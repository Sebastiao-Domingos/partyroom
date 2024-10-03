import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Users2Icon } from 'lucide-react';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { ScrollBar } from '@/components/ui/scroll-area';
import Chart from '@/components/graphics/Chart';

export default function dashboard() {
  return (
    <div>
      <div className="">
        <h1 className="text-orange-500 font-bold border-l pl-2 uppercase">
          Dashboard
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
              <BreadcrumbPage className="text-[12px]">Dashboard</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <ScrollArea className="max-w-[calc(100vw-250px)] mt-6">
        {/* <ScrollArea className="h-72 w-full rounded-md border"> */}
        <div className="w-full h-max flex gap-5 my-3">
          {Array(4)
            .fill('')
            .map((_, index) => (
              <div
                key={index}
                className="relative min-w-[350px] bg-card flex flex-col gap-2 items-center text-center p-4 /bg-slate-100 pt-6 rounded border border-border hover:border-primary/40"
              >
                <div className="absolute border-4 border-background -top-3 -right-3 size-14 flex justify-center items-center text-white font-bold rounded-full bg-orange-500">
                  0012
                </div>
                <Users2Icon size={40} className="text-slate-400" />
                <h2 className="text-xl font-thin text-orange-300">
                  Total de Fornecedores
                </h2>
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="mt-8 space-y-4">
        <div>
          <h2 className="text-orange-400">Balanço Geral</h2>
        </div>
        <Chart />
      </div>
    </div>
  );
}
