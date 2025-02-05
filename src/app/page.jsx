"use client";
import { register } from "swiper/element/bundle";
import { HeaderComponent } from "@/components/header/Header";
import { getPopularMovies } from "@/utils/api";
import { GetByGenre } from "@/utils/api";
import { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";


import { ComponenteFilmesParaMobile } from "@/components/body/filmes/FilmesMoveis";
import { ComponenteFilmesParaPc } from "@/components/body/filmes/FilmesPc";
import { ComponenteGeneros, ComponenteGenerosPc } from "@/components/body/generos/Generos";

register();

export default function Home() {
  const [filmesPopulares, setFilmesPopulares] = useState([]);
  const [filmesPorGenero, setFilmesPorGenero] = useState([]);

  useEffect(() => {
    const pegarFilmesPopulares = async () => {
      const filmes = await getPopularMovies();
      setFilmesPopulares(filmes);
    }
    pegarFilmesPopulares();

    const pegarFilmesPorGenero = async () => {
      const genero = await GetByGenre();
      console.log(genero);
      setFilmesPorGenero(genero);
    }
    pegarFilmesPorGenero();
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

      <section>

        <div className="max-sm:hidden max-md:hidden">
          <ComponenteGenerosPc valor={filmesPorGenero} />
        </div>

        <div className="hidden max-sm:block max-md:block">
          <ComponenteGeneros valor={filmesPorGenero} />
        </div>


      </section>

    </div>
  );
}
