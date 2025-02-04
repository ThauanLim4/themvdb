"use client";
import { HeaderComponent } from "@/components/header/Header";
import { getPopularMovies } from "@/utils/api";
import { useEffect, useState } from "react";

import { ComponenteFilmesParaPc } from "@/components/body/filmes/FilmesPc";
import { ComponenteFilmesParaMobile } from "@/components/body/filmes/FilmesMoveis";

export default function Home() {
  const [filmesPopulares, setFilmesPopulares] = useState([]);

  useEffect(() => {
    (async () => {
      const movies = await getPopularMovies();
      setFilmesPopulares(movies);
      console.log(movies);
    })();
  }, []);

  return (
    <div>
      <HeaderComponent />
      <div className="max-sm:hidden max-md:hidden">
        <ComponenteFilmesParaPc valor={filmesPopulares} />
      </div>

      <div className="hidden max-sm:block max-md:block">
        <ComponenteFilmesParaMobile valor={filmesPopulares} />
      </div>
    </div>
  );
}
