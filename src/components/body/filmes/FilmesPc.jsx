import React, { useState } from 'react';
import { GoInfo } from 'react-icons/go';
import { FaRegStar } from 'react-icons/fa';
import { IoIosAdd } from 'react-icons/io';
import { Tooltip as ReactTooltip } from "react-tooltip";

export const ComponenteFilmesParaPc = ({ valor }) => {
    console.log(valor);
    const filmesPopularesLista = valor;

    return (
        <section className="p-5 max-w-screen-xl mx-auto">
            <h2 className="text-2xl font-bold text-laranja">Mais Populares</h2>
            <div className="flex gap-3 justify-start overflow-x-auto py-5">
                {filmesPopularesLista.length > 0
                    ? filmesPopularesLista.map((movie, index) => {
                        return (
                            <div key={movie.id} className="container-filme-pc my-3 rounded-lg flex flex-col ">
                                <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className="w-full h-full object-cover rounded-l-md rounded-r-md" />
                                <div className="px-3 py-2 justify-center flex-col">
                                    <div className="flex items-center gap-5">
                                        <FaRegStar className="text-yellow-400" />
                                        <p>{movie.vote_average.toFixed(1)}</p>
                                    </div>
                                    <h2 className="text-xl text-laranja mb-3">{movie.title.length > 25 ? movie.title.substring(0, 22) + "..." : movie.title}</h2>
                                    <p className="max-h-12 overflow-hidden text-xs mb-3">{`${movie.overview.length > 100 ? movie.overview.substring(0, 97) + "..." : movie.overview}`} {movie.overview.length === 0 ? "Sem Sinopse" : ""}</p>
                                    <div className="flex items-center justify-between">
                                        <button className="w-32 h-7 rounded-lg bg-laranja text-branco text-sm flex justify-center items-center hover:bg-preto_escuro hover:border-2 border-laranja transition-all duration-300">Inserir na Lista <IoIosAdd /> </button>
                                        <button data-tooltip-id="tooltip-mais-infos" data-tooltip-content="Mais Informações" className="text-laranja font-medium"><GoInfo /></button>
                                        <ReactTooltip id="tooltip-mais-infos" place="right" />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    : <p>Carregando...</p>
                }
            </div>
        </section>

    )
};