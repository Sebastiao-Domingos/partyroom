import { Card } from "@/components/ui/card";
import { UserData } from "@/services/auth";
import { Map, User } from "lucide-react";
import React from "react";

export default function MeusDados({ user }: { user: UserData }) {
  return (
    <div className="w-full flex gap-4 flex-col md:flex-row md:justify-between">
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

            <span className="border-l pl-3 ml-3">
              {user.address?.city.name}
            </span>
          </li>
          <li>
            Município
            <span className="border-l pl-3 ml-3">
              {user.address?.city.name}
            </span>{" "}
          </li>
          <li>
            Distrito
            <span className="border-l pl-3 ml-3">{user.address?.district}</span>
          </li>
          <li>
            Rua
            <span className="border-l pl-3 ml-3">{user.address?.street}</span>
          </li>
          <li>
            Ponto de referência
            <span className="border-l pl-3 ml-3">
              {user.address?.land_mark}
            </span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
