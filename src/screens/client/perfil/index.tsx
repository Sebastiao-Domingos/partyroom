"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { useGetUserData } from "@/hooks/auth/useGetUserData";
import Loader from "@/components/loader";
import { Card } from "@/components/ui/card";
import { Map, User } from "lucide-react";

export default function Perfil() {
  const { user, status } = useGetUserData();

  if (status === "error" || user === undefined) {
    window.location.href = "/login";
  }

  if (user && status === "success") {
    return (
      <div className="w-full flex flex-col">
        <div className="mt-[100px] mx-1 md:mx-8">
          <h1 className="text-primary font-bold border-l pl-2 uppercase">
            Perfil #{" "}
            <span className="text-primary/80">
              {" "}
              {user?.first_name}-{user.last_name}
            </span>
          </h1>
          <div className="pl-2 mt-2 text-[12px]">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="text-[12px]">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />

                <BreadcrumbPage className="text-[12px]">Perfil</BreadcrumbPage>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        <div className="mt-6 mx-1 md:mx-8 flex gap-4 flex-col md:flex-row md:justify-between">
          <Card className="p-2 md:p-4 md:w-[48%]">
            <h2 className="flex gap-1 items-center">
              <User size={18} />
              Dados pessoais
            </h2>

            <ul className="text-sm space-y-3 mt-4">
              <li>
                <span className="">Nome</span>

                <span className="border-l pl-3 ml-3">
                  {user.first_name} {user.last_name}
                </span>
              </li>
              <li>
                Contacto
                <span className="border-l pl-3 ml-3">{user.phone_number}</span>
              </li>
              <li>
                Estado da conta
                <span className="border-l pl-3 ml-3">
                  {user.is_active ? "Activa" : "Desactiva"}
                </span>
              </li>
            </ul>
          </Card>
          <Card className="p-2 md:p-4 md:w-[48%]">
            <h2 className="flex items-center gap-1">
              <Map size={18} />
              Endereço
            </h2>

            <ul className="text-sm space-y-3 mt-4">
              <li>
                <span className="">Província</span>

                <span className="border-l pl-3 ml-3">{user.address}</span>
              </li>
              <li>
                Município
                <span className="border-l pl-3 ml-3">{user.phone_number}</span>
              </li>
              <li>
                Distrito
                <span className="border-l pl-3 ml-3">
                  {user.is_active ? "Activa" : "Desactiva"}
                </span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    );
  }

  if (status === "pending")
    <div className="w-full flex items-center">
      <Loader />
    </div>;
}
