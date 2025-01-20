"use client";
import {
  ButtonToggleModeClient,
  ModeToggle,
} from "@/components/theme/ModeToggle";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuMobileClient from "./menu-mobile-client";
import { useGetUserData } from "@/hooks/auth/useGetUserData";
import { Avatar } from "@/components/ui/avatar";
import { UserModelDefinition } from "./drop-down-menu";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const links_menu = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Salões de festas",
    url: "/saloes",
  },
  {
    title: "Eventos",
    url: "/eventos",
  },
  {
    title: "Serviços",
    url: "/servicos",
  },
  {
    title: "Ajuda",
    url: "/ajuda",
  },
];

function Menu_Client() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const { user, status } = useGetUserData();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header
      className={`fixed z-20 transition-colors ${
        scrolled &&
        "bg-background/80 text-black shadow dark:border-b dark:border-b-gray-800"
      } text-white top-0 right-0 w-full py-4 px-2 md:px-10 flex items-center justify-between`}
    >
      <span className="block text-3xl text-primary font-bold italic">
        SBODAS
      </span>
      <ul className="hidden md:flex ml-auto dark:text-slate-50 /text-foreground">
        {links_menu.map(({ title, url }, index) => (
          <li key={index}>
            <Link
              href={url}
              className={`p-3 uppercase hover:text-primary text-foreground ${
                pathname === url ||
                (pathname.includes(url) && url !== "/" && "text-primary")
              }`}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex gap-4 md:gap-6 items-center ml-auto text-foreground">
        <ModeToggle>
          <ButtonToggleModeClient />
        </ModeToggle>
        <MenuMobileClient />

        {status === "success" && user && (
          <UserModelDefinition
            name={`${user.first_name} ${user.last_name}`}
            whatsapp={user.phone_number}
          >
            <DropdownMenuTrigger>
              <Avatar className="h-9 w-9 md:w-10 md:h-10 bg-primary dark:bg-primary/50 flex justify-center items-center">
                <span className="space-y-2 font-bold text-sm">
                  <span>{user.first_name.charAt(0).toUpperCase()}</span>
                  <span>{user.last_name.charAt(0).toUpperCase()}</span>
                </span>
              </Avatar>
            </DropdownMenuTrigger>
          </UserModelDefinition>
        )}
        {(status !== "success" || !user) && (
          <Link
            href={"/login"}
            className={`p-3 uppercase hover:text-primary ${
              pathname === "/login" && "text-primary"
            }`}
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}

export default Menu_Client;
