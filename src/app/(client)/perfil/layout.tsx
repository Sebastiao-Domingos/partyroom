"use client";
import { useAuth } from "@/hooks/auth/useAuth";
import { useGetUserData } from "@/hooks/auth/useGetUserData";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const navigator = useRouter();
  const { user } = useGetUserData();
  const { logout } = useAuth();
  const path = usePathname();
  if (
    // status === "error" ||
    user === undefined ||
    user.user_type.toUpperCase() !== "CLIENT"
  ) {
    logout.mutate();
    navigator.push("/login");
  }

  if (
    user &&
    // status === "success" &&
    user.user_type.toUpperCase() === "CLIENT"
  ) {
    if (path == "/perfil") {
      return <>{children}</>;
    }
    return (
      <>
        <div className="mt-[100px] mx-1 md:mx-8">
          <h1 className="text-primary font-bold border-l pl-2 uppercase">
            Perfil #{" "}
            <span className="text-slate-400 font-thin">
              {" "}
              {user?.first_name}-{user.last_name}
            </span>
            # <span className="text-slate-400 font-thin"> Solicitação</span>
          </h1>
        </div>
        {children}
      </>
    );
  }
}
