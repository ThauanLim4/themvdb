"use client";
import { register } from "swiper/element/bundle";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";

import { GetByGenre, getPopularMovies, GetTrendingMovies, GetTrendingPeople, GetTrendingTv } from '@/utils/api';
import React, { useState, useEffect } from 'react';
import { ComponenteFilmesParaMobile } from './componentesPrincipais/filmesPopulares/FilmesMoveis';
import { ComponenteFilmesParaPc } from './componentesPrincipais/filmesPopulares/FilmesPc';
import { ComponenteGeneros, ComponenteGenerosPc } from './componentesPrincipais/generos/Generos';
import { ComponenteParaSeriesEmAltaMobile } from "./componentesPrincipais/seriesEmAlta/SeriesEmAltaMobile";
import { ComponenteSeriesEmAltaPc } from "./componentesPrincipais/seriesEmAlta/SeriesEmAltaPc";
import { ComponenteDeFilmes } from "./componentesPrincipais/Filmes/ComponenteFilmes";


register();

export const ComponentePrincipal = () => {
    const [filmesPopulares, setFilmesPopulares] = useState([]);
    const [filmesPorGenero, setFilmesPorGenero] = useState([]);
    const [filmesEmAlta, setFilmesEmAlta] = useState([]);
    const [seriesEmAlta, setSeriesEmAlta] = useState([]);
    const [pessoasEmAlta, setPessoasEmAlta] = useState([]);


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


        const pegarTudoQueEstaEmAlta = async () => {
            const filmes = await GetTrendingMovies();
            const series = await GetTrendingTv();
            const pessoas = await GetTrendingPeople();

            setFilmesEmAlta(filmes);
            setSeriesEmAlta(series);
            setPessoasEmAlta(pessoas);
        }
        pegarTudoQueEstaEmAlta();
    }, []);

    return (
        <div>
            {/* Esta sessão é a sessão principal da página inicial. Aqui contém os filmes mais populares. */}

            <section>
                <div>
                    <ComponenteDeFilmes valor={filmesPopulares} nomeDaSessao="Mais Populares" />
                </div>
            </section>

            {/* Esta é a sessão onde contém os filmes divididos por gênero. */}

            <section>
                <div className="max-sm:hidden max-md:hidden">
                    <ComponenteGenerosPc valor={filmesPorGenero} />
                </div>

                <div className="hidden max-sm:block max-md:block">
                    <ComponenteGeneros valor={filmesPorGenero} />
                </div>
            </section>

            <section>
                <div >
                    <ComponenteDeFilmes valor={filmesEmAlta} nomeDaSessao={"Filmes em alta da semana"} />
                </div>
            </section>

            {/* Esta sessão é a que contém as séries em alta da semana. */}
            <section>
                <div >
                    <ComponenteDeFilmes valor={seriesEmAlta} nomeDaSessao={"Séries em alta da semana"} />
                </div>

            </section>
        </div>
    )
}