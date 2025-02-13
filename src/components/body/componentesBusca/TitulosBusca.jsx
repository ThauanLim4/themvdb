import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { GoInfo } from 'react-icons/go';
import { FaRegStar } from 'react-icons/fa';
import { IoIosAdd } from 'react-icons/io';
import { Tooltip as ReactTooltip } from 'react-tooltip';

export const ComponenteTitulosBusca = ({ valor, nomeDaSessao }) => {
    console.log("valor retornado: ", valor);

    return (
        <section className="p-5 max-w-screen-xl mx-auto">
            <h2 className="text-2xl font-bold text-laranja">{nomeDaSessao}</h2>
            <div className="flex justify-start overflow-x-auto py-5 text-branco">
                {valor.length > 0 ? (
                    <div className='gap-5 max-sm:flex max-sm:flex-col grid max-md:grid-cols-2 max-lg:grid-cols-3 grid-cols-4'>
                        {valor.map((movie, index) => (
                            <div key={index} className="max-sm:flex-row max-md:flex-row max-sm:max-h-36 max-md:max-h-36 flex flex-col w-full bg-preto_escuro rounded-lg h-full max-h-425 ">
                                {movie.poster_path && movie.poster_path !== undefined ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                        alt={movie.title || movie.name}
                                        className="
                                        max-sm:object-fill max-sm:w-max max-sm:min-h-36 max-md:w-max max-md:min-h-36 min-h-64 max-h-64 h-full w-full rounded-lg object-contain"
                                    />
                                ) : <div className='max-sm:object-cover max-sm:min-w-24 max-sm:min-h-36 max-md:w-max max-md:min-w-24 max-md:min-h-36 min-h-64 max-h-64 h-full w-full rounded-lg object-contain bg-laranja flex justify-center items-center'>😐</div>}

                                <div className="px-3 py-2 grid max-sm:grid-rows-template-infos-h-fixed-mobile
                                    max-md:grid-rows-template-infos-h-fixed-mobile
                                    grid-rows-template-infos-h-fixed w-full">
                                    <div className="flex items-center gap-5">
                                        <FaRegStar className="text-yellow-400" />
                                        {movie.vote_average && movie.vote_average !== undefined ? <p>{movie.vote_average.toFixed(1)}</p> : <p>sem avaliações</p>}
                                    </div>
                                    <Link href={`/pages/detalhes?tm=${!movie.media_type ? 'movie' : 'tv'}&idt=${movie.id}`} className="text-lg text-laranja overflow-hidden whitespace-nowrap text-ellipsis">
                                        {movie.title || movie.name}
                                    </Link >
                                    <p className="max-h-12 overflow-hidden text-xs mb-3">
                                        {movie.overview && movie.overview.length > 0
                                            ? `${movie.overview.length > 75 ? movie.overview.substring(0, 72) + '...' : movie.overview}`
                                            : 'Sem Sinopse'}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <button onClick={() => alert('Funcionalidade em desenvolvimento')} className="w-32 h-7 rounded-lg bg-laranja text-branco text-sm flex justify-center items-center hover:bg-preto_escuro hover:border-2 border-laranja transition-all duration-300">
                                            Inserir na Lista <IoIosAdd />
                                        </button>
                                        <button
                                            data-tooltip-id="tooltip-mais-infos"
                                            data-tooltip-content="Mais Informações"
                                            className="text-laranja font-medium"
                                        >
                                            <GoInfo />
                                        </button>
                                        <ReactTooltip id="tooltip-mais-infos" place="right" />
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                ) : (
                    <p>Carregando...</p>
                )}
            </div>
        </section>
    );
};