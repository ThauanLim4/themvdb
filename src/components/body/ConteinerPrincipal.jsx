"use client";
import { register } from "swiper/element/bundle";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";

import { getPopularMovies, GetTrendingTv } from '@/utils/api';
import React, { useState, useEffect } from 'react';
import { ComponenteDeFilmes } from "./componentesPrincipais/ComponenteFilmes";
import { ComponenteAtores } from "./componentesAtores/Atores";
import { ComponenteGenerosDeFilmes } from "./componentesPrincipais/Generos";


register();

export const ComponentePrincipal = () => {
    const [filmesPopulares, setFilmesPopulares] = useState([]);
    const [seriesEmAlta, setSeriesEmAlta] = useState([]);


    useEffect(() => {
        const pegarFilmesPopulares = async () => {
            const filmes = await getPopularMovies();
            setFilmesPopulares(filmes);
        }
        pegarFilmesPopulares();

        const pegarTudoQueEstaEmAlta = async () => {
            const series = await GetTrendingTv();
            setSeriesEmAlta(series);
        }
        pegarTudoQueEstaEmAlta();
    }, []);

    return (
        <div>
            <section>
                {/* Componente de gêneros de filmes */}
                <ComponenteGenerosDeFilmes />
            </section>

            <section>
                {/* Esta sessão é a sessão principal da página inicial. Aqui contém os filmes mais populares. */}
                <ComponenteDeFilmes valor={filmesPopulares} nomeDaSessao="Mais Populares" />
            </section>

            <section>
                {/* Esta sessão é a que contém as séries em alta da semana. */}
                <ComponenteDeFilmes valor={seriesEmAlta} nomeDaSessao={"Séries em alta da semana"} />
            </section>

            <section>
                {/* Sessão dos atores */}
                <ComponenteAtores />
            </section>
        </div>
    )
}