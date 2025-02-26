"use client";
import { HeaderComponent } from "@/components/header/Header";
import { ComponentePrincipal } from "@/components/body/ConteinerPrincipal";
import { createContext, useState } from "react";
import { TokenContext } from "@/context/token";

export default function Home() {
  const [token, setToken] = useState(document.cookie.split('=')[1]);
  console.log(token)

  return (
    <div>
      <TokenContext.Provider value={token}>

        {/* Está é a sessão do cabeçalho da página */}

        <section>
          <HeaderComponent />
        </section>

        {/* Aqui fica a sessão principal do corpo da página, é onde fica as sessões de mais populares, por gênero e em alta da semana. */}
        <section>
          <ComponentePrincipal />
        </section>

      </TokenContext.Provider>
    </div>
  );
}