"use client";
import { HeaderComponent } from "@/components/header/Header";
import { ComponentePrincipal } from "@/components/body/ConteinerPrincipal";
import { useEffect, useState } from "react";
import { TokenContext } from "@/context/token";

export default function Home() {
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(document.cookie.split('=')[1])
  }, []);

  console.log(token)

  return (
    <div>
      <TokenContext.Provider value={token}>
        <section>
          <HeaderComponent />
        </section>

        <section>
          <ComponentePrincipal />
        </section>

      </TokenContext.Provider>
    </div>
  );
}