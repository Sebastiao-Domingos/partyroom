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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import MeusDados from "./meus-dados";
import Solicitacoes from "./solicitacoes";

export default function Perfil() {
  const [perfil, setPerfil] = useState("Meus Dados");
  const { user, status } = useGetUserData();

  if (user && status === "success") {
    return (
      <div className="w-full flex flex-col">
        <div className="mt-[100px] mx-1 md:mx-8">
          <h1 className="text-primary font-bold border-l pl-2 uppercase">
            Perfil #{" "}
            <span className="text-slate-400 font-thin">
              {" "}
              {user?.first_name}-{user.last_name}
            </span>
            # <span className="text-slate-400 font-thin"> {perfil}</span>
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
        <div className="mt-6 mx-1 md:mx-8">
          <Tabs
            defaultValue="perfil"
            className="w-full space-y-4"
            onValueChange={(e) => {
              if (e === "perfil") {
                setPerfil("Meus Dados");
              } else if (e === "solicitacoes") {
                setPerfil("Minhas Solicitações");
              }
            }}
          >
            <TabsList>
              <TabsTrigger value="perfil">Meus Dados</TabsTrigger>
              <TabsTrigger value="solicitacoes">
                Minhas Solicitações
              </TabsTrigger>
            </TabsList>
            <TabsContent value="perfil">
              <MeusDados user={user} />
            </TabsContent>
            <TabsContent value="solicitacoes">
              <Solicitacoes />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  if (status === "pending")
    <div className="w-full flex items-center">
      <Loader />
    </div>;
}
