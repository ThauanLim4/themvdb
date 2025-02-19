"use client";
import { HeaderComponent } from "@/components/header/Header";
import { ComponentePrincipal } from "@/components/body/ConteinerPrincipal";

export default function Home() {

  return (
    <div>
      {/* Está é a sessão do cabeçalho da página */}

      <section>
        <HeaderComponent />
      </section>

      {/* Aqui fica a sessão principal do corpo da página, é onde fica as sessões de mais populares, por gênero e em alta da semana. */}
      <section>
        <ComponentePrincipal />
      </section>

    </div>
  );
}