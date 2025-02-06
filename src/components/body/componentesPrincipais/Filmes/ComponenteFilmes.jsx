import React, { useEffect, useState } from 'react';
import { GoInfo } from 'react-icons/go';
import { FaChevronCircleLeft, FaChevronCircleRight, FaRegStar } from 'react-icons/fa';
import { IoIosAdd } from 'react-icons/io';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { Swiper, SwiperSlide } from 'swiper/react';
import './../../../../css/custom-swiper.css';
import Link from 'next/link';

export const ComponenteDeFilmes = ({ valor, nomeDaSessao }) => {
    const filmesPopularesLista = valor;

    return (
        <section className="p-5 max-w-screen-xl mx-auto">
            <h2 className="text-2xl font-bold text-laranja">{nomeDaSessao}</h2>
            <div className="flex justify-start overflow-x-auto py-5">
                {filmesPopularesLista.length > 0 ? (
                    <Swiper
                        breakpoints={{
                            300: {
                                slidesPerView: 1,
                                spaceBetween: -50,
                                freeMode: true,
                            },
                            500: {
                                slidesPerView: 2,
                                spaceBetween: 10
                            },
                            660: {
                                slidesPerView: 3,
                                spaceBetween: 10
                            },
                            980: {
                                spaceBetween: 10,
                                slidesPerView: 4,
                            },
                            1180: {
                                slidesPerView: 5,
                                spaceBetween: 10
                            },
                        }}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                    >
                        {filmesPopularesLista.map((movie) => (
                            <SwiperSlide key={movie.id}>
                                <div className={`container-filme-pc my-3 rounded-lg flex flex-col`}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                        alt={movie.title || movie.name}
                                        className="imagem-cartaz"
                                    />
                                    <div className="px-3 py-2 grid grid-rows-1">
                                        <div className="flex items-center gap-5">
                                            <FaRegStar className="text-yellow-400" />
                                            <p>{movie.vote_average.toFixed(1)}</p>
                                        </div>
                                        <Link href={`/filmes/${movie.id}`} className="text-lg text-laranja overflow-hidden whitespace-nowrap text-ellipsis">
                                            {movie.title || movie.name}
                                        </Link >
                                        <p className="max-h-12 overflow-hidden text-xs mb-3">
                                            {`${movie.overview.length > 75
                                                ? movie.overview.substring(0, 72) + '...'
                                                : movie.overview}`}{' '}
                                            {movie.overview.length === 0 ? 'Sem Sinopse' : ''}
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
                            </SwiperSlide>
                        ))}
                        <div className='max-sm:hidden max-md:hidden'>
                            <FaChevronCircleRight className="swiper-button-next botão-swiper" />
                        </div>
                        <div className='max-sm:hidden max-md:hidden' >
                            <FaChevronCircleLeft className="swiper-button-prev botão-swiper" />
                        </div>
                    </Swiper>
                ) : (
                    <p>Carregando...</p>
                )}
            </div>
        </section>
    );
};