"use client";
import { ComponenteTitulosBusca } from '@/components/body/componentesBusca/TitulosBusca';
import { HeaderComponent } from '@/components/header/Header';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import React, { useState } from 'react'
import { useEffect } from 'react';

const Generos = () => {
    const [resultUrl, setResultUrl] = useState("");
    const [generoUrl, setGeneroUrl] = useState("");
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [titulosBaseadosNoGenero, setTitulosBaseadosNoGenero] = useState([]);

    useEffect(() => {
        let id = window.location.search.split('=')[2];
        let genero = window.location.search.split('=')[1].split("&")[0];
        let generoDecode = decodeURIComponent(genero);
        setGeneroUrl(generoDecode);
        const pegarTitulosPorGenero = async () => {
            const API_KEY = '6cab2673c87af7cea093eb14c8a77328';
            const BASE_URL = 'https://api.themoviedb.org/3';
            const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pt-BR&with_genres=${id}&page=${paginaAtual}`);
            const data = await response.json();
            setTitulosBaseadosNoGenero(data.results);
            console.log(data);
            // https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc
        }

        pegarTitulosPorGenero();
    }, [paginaAtual])
    return (
        <>
            <HeaderComponent />
            <div className='text-branco max-w-screen-lg mx-auto overflow-x-hidden p-5'>
                {titulosBaseadosNoGenero.length > 0
                    ? <ComponenteTitulosBusca valor={titulosBaseadosNoGenero} nomeDaSessao={`Resultado para "${generoUrl}"`} />
                    : <></>}
                <div className='flex items-center justify-between'>
                    <button onClick={() => {
                        if (paginaAtual > 1) setPaginaAtual(paginaAtual - 1);
                        }} className={`${paginaAtual > 1 ? "border-laranja" : "border-gray-500/50 text-gray-500/50 cursor-not-allowed" } flex items-center gap-3 border  px-2 py-1 rounded-lg`}><FaChevronLeft /> Voltar </button>
                    <div>Página {paginaAtual}</div>
                    <button onClick={() => setPaginaAtual(paginaAtual + 1)} className='flex items-center gap-3 border border-laranja px-2 py-1 rounded-lg'>Próximo <FaChevronRight /></button>
                </div>
            </div>
        </>
    )
}

export default Generos