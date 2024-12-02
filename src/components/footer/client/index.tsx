import { Facebook, Instagram, Linkedin, PhoneCall } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

function Footer_Client() {
  return (
    <footer className="w-full min-h-[400px] bg-slate-200 dark:bg-background flex  mt-8 mx-2 md:mx-0 border-t /border-border">
      <div className="w-full flex flex-col px-0 md:px-8 pt-8 pb-4">
        <div className="w-full flex flex-col md:flex-row gap-4 md:justify-between">
          <div className="space-y-4">
            <h3 className="text-primary uppercase">Redes sociais</h3>
            <ul className="flex gap-3">
              <li>
                <Link href={''} className="hover:text-primary/50">
                  <Instagram />
                </Link>
              </li>
              <li>
                <Link href={''} className="hover:text-primary/50">
                  <Linkedin />
                </Link>
              </li>
              <li>
                <Link href={''} className="hover:text-primary/50">
                  <Facebook />
                </Link>
              </li>

              <li>
                <Link href={''} className="hover:text-primary/50">
                  <PhoneCall />
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-primary uppercase">Navegação</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href={''} className="hover:text-primary/50">
                  Home
                </Link>
              </li>
              <li>
                <Link href={''} className="hover:text-primary/50">
                  Serviços
                </Link>
              </li>
              <li>
                <Link href={''} className="hover:text-primary/50">
                  Tipos de eventos
                </Link>
              </li>

              <li>
                <Link href={''} className="hover:text-primary/50">
                  Salões
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-primary uppercase">Serviços</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href={''} className="hover:text-primary/50">
                  Como podemos te judar?
                </Link>
              </li>
              <li>
                <Link href={''} className="hover:text-primary/50">
                  Mais informações
                </Link>
              </li>
              <li>
                <Link href={''} className="hover:text-primary/50">
                  Fale conosco
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-auto text-center text-sm text-slate-400 py-4">
          Party Room @Copy right, Rangel, CTT
        </p>
      </div>
    </footer>
  );
}

export default Footer_Client;
