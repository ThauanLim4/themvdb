"use client";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import React, { useState } from 'react'
import { useEffect } from 'react';
import { ComponentHeaderNavigation } from '@/components/header/HeaderNavigation';
import { ComponentSearchTitles } from "@/components/body/componentesBusca/SearchTitles";

const Generos = () => {
    const [generoUrl, setGeneroUrl] = useState("");
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [titulosBaseadosNoGenero, setTitulosBaseadosNoGenero] = useState([]);
    const [tipoDaMidia, setTipoDaMidia] = useState("movie");
    const [disabledButton, setDisableButton] = useState(false);

    useEffect(() => {
        let id = window.location.search.split('=')[2];
        let genero = window.location.search.split('=')[1].split("&")[0];
        let generoDecode = decodeURIComponent(genero);
        setGeneroUrl(generoDecode);

        const pegarTitulosPorGenero = async () => {
            const API_KEY = '6cab2673c87af7cea093eb14c8a77328';
            const BASE_URL = 'https://api.themoviedb.org/3';
            let response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pt-BR&with_genres=${id}&page=${paginaAtual}`);
            let data = await response.json();

            if (data.results.length === 0) {
                response = await fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&language=pt-BR&with_genres=${id}&page=${paginaAtual}`);
                data = await response.json();
                setTipoDaMidia("tv");
                setTitulosBaseadosNoGenero(data.results);
            }
            setTitulosBaseadosNoGenero(data.results);
        }

        pegarTitulosPorGenero();
    }, [paginaAtual]);


    const prevPage = () => {
        if (paginaAtual > 1) {
            setPaginaAtual(paginaAtual - 1);
        } else {
            setDisableButton(true);
        }
    }

    const nextPage = () =>{
        setPaginaAtual(paginaAtual + 1);
        setDisableButton(false)
    }

    return (
        <>
            <ComponentHeaderNavigation sessionName={`Gênero de ${generoUrl}`} />
            <div className='text-branco max-w-screen-lg mx-auto overflow-x-hidden p-5'>
                {titulosBaseadosNoGenero.length > 0
                    ? <ComponentSearchTitles valor={titulosBaseadosNoGenero} midia={tipoDaMidia} nomeDaSessao={`Resultado para "${generoUrl}"`} />
                    : <></>}
                <div className='flex items-center justify-between'>

                    <button onClick={() => prevPage()} disabled={disabledButton} className={`flex items-center gap-2 px-2 py-1 rounded-lg ${paginaAtual === 1
                        ? "border-2 border-gray-500/50 text-foreground cursor-not-allowed bg-gray-500/50 "
                        : "text-preto_escuro bg-laranja border-2 border-laranja  hover:bg-transparent hover:text-laranja transition-all duration-300"
                        }
                        `}>
                        <FaChevronLeft /> Voltar
                    </button>

                    <div>Página {paginaAtual}</div>

                    <button onClick={() => nextPage()} className='flex items-center gap-3 text-preto_escuro bg-laranja border-2 border-laranja px-2 py-1 rounded-lg hover:bg-transparent hover:text-laranja transition-all duration-300'>Próximo <FaChevronRight /></button>
                </div>
            </div >
        </>
    )
}

export default Generos