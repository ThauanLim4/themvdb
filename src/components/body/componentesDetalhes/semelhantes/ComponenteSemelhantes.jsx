"use client";
import Link from "next/link";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { FaRegStar } from "react-icons/fa";
import { GoInfo } from "react-icons/go";
import { IoIosAdd } from "react-icons/io";
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import '@/css/custom-swiper.css';
import { useEffect, useState } from "react";
import { ComponenteItemSkeleton } from "@/components/skeleton/ItemSkeleton";

export const ComponenteTitulosSemelhantes = ({ tituloMidiaTipo, tituloID }) => {
    const [titulosSemelhantes, setTitulosSemelhantes] = useState([]);

    useEffect(() => {
        const pegarTitulosSemelhantes = async () => {
            const API_KEY = '6cab2673c87af7cea093eb14c8a77328';
            const BASE_URL = 'https://api.themoviedb.org/3';
            const responseSemelhantes = await fetch(`${BASE_URL}/${tituloMidiaTipo}/${tituloID}/recommendations?api_key=${API_KEY}&language=pt-BR&page=1`);
            const dataSemelhantes = await responseSemelhantes.json();
            setTitulosSemelhantes(dataSemelhantes);
        }

        pegarTitulosSemelhantes();
    })

    return (
        <div className="w-full max-w-screen-lg flex flex-col gap-3 my-5">
            <h2 className="text-2xl font-semibold text-laranja">Semelhantes</h2>
            {titulosSemelhantes.results?.length > 0 ? (
                <div className="flex justify-start overflow-x-auto py-5">
                    <Swiper
                        spaceBetween={10}
                        freeMode={true}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                        breakpoints={{
                            300: {
                                slidesPerView: 1,
                                freeMode: true,
                            },
                            550: {
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
                        }}
                    >
                        <div className='max-sm:hidden max-md:hidden'>
                            <FaChevronLeft className="swiper-button-prev" />
                        </div>
                        {titulosSemelhantes.results?.map((movie, index) => (
                            <SwiperSlide key={movie.id}>
                                <div className={`max-sm:flex-row max-sm:max-h-36 flex flex-col w-full bg-preto_escuro rounded-lg h-full max-h-425`}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                        alt={movie.title || movie.name}
                                        className={`max-sm:object-fill max-sm:w-max max-sm:min-h-36 min-h-64 max-h-64 h-full w-full rounded-lg object-contain `}
                                    />
                                    <div className="px-3 py-2 grid max-sm:grid-rows-template-infos-mob grid-rows-template-infos w-full h-full">
                                        <div className="flex items-center gap-5 max-sm:hidden">
                                            <FaRegStar className="text-yellow-400" />
                                            <p>{movie.vote_average.toFixed(1)}</p>
                                        </div>
                                        <Link target="_top" href={`/pages/detalhes?tm=${movie.media_type}&idt=${movie.id}`} className="text-lg text-laranja overflow-hidden whitespace-nowrap text-ellipsis">
                                            {movie.title || movie.name}
                                        </Link >
                                        <p className="max-h-12 overflow-hidden text-xs mb-3">
                                            {`${movie.overview.length > 75
                                                ? movie.overview.substring(0, 72) + '...'
                                                : movie.overview}`}{' '}
                                            {movie.overview.length === 0 ? 'Sem Sinopse' : ''}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <button onClick={() => alert('Funcionalidade em desenvolvimento')} className="w-32 h-7 rounded-lg bg-laranja text-preto_claro text-sm flex justify-center items-center hover:bg-transparent hover:text-laranja border-2 border-laranja transition-all duration-300">
                                                Inserir na Lista <IoIosAdd />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                        <div className='max-sm:hidden max-md:hidden'>
                            <FaChevronRight className="swiper-button-next" />
                        </div>
                    </Swiper>
                </div>
            ) : (
                <ComponenteItemSkeleton quantidade={5} />
            )}
        </div>
    )
}