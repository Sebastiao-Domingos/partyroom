"use client";
import {
  ChartBarIcon,
  HouseIcon,
  LayoutDashboardIcon,
  LogOut,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useParams, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/auth/useAuth";

const menus = [
  {
    title: "Marketing",
    menus: [
      {
        name: "Dashboard",
        icon: <LayoutDashboardIcon size={18} />,
        link: "/supplier/dashboard-sup",
      },

      {
        name: "Salões",
        icon: <HouseIcon size={18} />,
        link: "/supplier/dashboard-sup/saloes",
      },
      {
        name: "Solicitações",
        icon: <ChartBarIcon size={18} />,
        link: "/supplier/dashboard-sup/solicitacoes",
      },
    ],
  },
  {
    title: "Serviços",
    menus: [
      {
        name: "Definições",
        icon: <Settings size={18} />,
        link: "/supplier/dashboard-sup/definicoes",
        submenu: [
          {
            name: "Perfil",
            link: "/supplier/dashboard-sup/definicoes/perfil",
          },
        ],
      },
    ],
  },
];

export default function VerticalMenuSupplier() {
  const { logout } = useAuth();
  return (
    <div className="hidden md:block fixed z-20 bg-background top-0 left-0 bottom-2 rounded shadow shadow-border w-[210px] pt-5">
      <span className="ml-4 text-3xl">LOGO</span>
      <nav className="pt-2">
        <ScrollArea className="space-y-8 h-[calc(100vh-140px)]">
          <div className="w-full h-max">
            {menus.map((item, index) => (
              <BaseItemMenu key={index} menu_data={item} />
            ))}
            <ScrollBar orientation="vertical" />
          </div>
        </ScrollArea>
      </nav>
      <div className="fixed left-0 bottom-0 p-2 bg-background w-[200px]">
        <button
          className="w-full flex gap-2 py-2 hover:text-orange-500"
          onClick={() => logout.mutate()}
        >
          <LogOut size={18} />
          Log out
        </button>
      </div>
    </div>
  );
}

type BaseItemMenuProps = {
  menu_data: {
    title: string;
    menus: {
      name: string;
      icon: React.ReactNode;
      link: string;
      submenu?: {
        name: string;
        link: string;
      }[];
    }[];
  };
};

function BaseItemMenu({ menu_data }: BaseItemMenuProps) {
  const path = usePathname();
  return (
    <div className="mb-4">
      <h3 className="font-thin text-sm uppercase text-slate-400 pl-4">
        {menu_data.title}
      </h3>
      <div className="flex flex-col mt-3 space-y-1">
        {menu_data.menus.map(({ icon, link, name, submenu }, index) => (
          <div key={index} className="w-full">
            <div className="w-full relative flex flex-col gap-1 rounded font-thin">
              <Link
                href={link}
                className={`w-full pl-5 flex gap-2 items-center py-2 hover:bg-primary/10 border-l-4 border-l-transparent hover:border-l-primary/50 ${
                  path?.includes(link) && "border-l-primary"
                }`}
              >
                {icon}
                <span className="font-thin">{name}</span>
              </Link>
              {submenu && (
                <Accordion type="single" collapsible className="border-b-0">
                  <AccordionItem value="item-1" className="border-b-0">
                    <AccordionTrigger className="absolute -top-1 right-1"></AccordionTrigger>
                    <AccordionContent className="">
                      <ul className="space-y-1">
                        {submenu.map((sub, index) => (
                          <li key={index} className="w-full">
                            <Link
                              href={sub.link}
                              className="w-full pl-8 flex gap-2 items-center py-3 hover:bg-primary/10 /hover:bg-orange-200 border-l-4 border-l-transparent hover:border-primary"
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
