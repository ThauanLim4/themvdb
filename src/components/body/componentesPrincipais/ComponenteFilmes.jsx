import React from 'react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { GoInfo } from 'react-icons/go';
import { FaChevronLeft, FaChevronRight, FaRegStar } from 'react-icons/fa';
import { IoIosAdd } from 'react-icons/io';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { Swiper, SwiperSlide } from 'swiper/react';

import '@/css/custom-swiper.css';

export const ComponenteDeFilmes = ({ valor, nomeDaSessao }) => {
    const btnClasses = "max-sm:hidden max-md:hidden absolute top-2/4 w-24 h-24 p-3 rounded-lg bg-transparent items-center justify-center flex border-2 border-laranja shadow-lg hover:bg-laranja text-branco hover:text-preto_escuro duration-300 cursor-pointer active:scale-[0.98] z-10";
    
    return (
        <section className="p-5 max-w-screen-xl mx-auto">
            <h2 className="text-2xl font-bold text-laranja">{nomeDaSessao}</h2>
            <div className="flex justify-start overflow-x-auto py-5 text-branco">
                {valor.length > 0 ? (
                    <Swiper
                        freeMode={true}
                        breakpoints={{
                            300: {
                                slidesPerView: 1,
                                spaceBetween: 20
                            },
                            550: {
                                slidesPerView: 2,
                                spaceBetween: 10
                            },
                            768: {
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
                            nextEl: '.proximo',
                            prevEl: '.anterior',
                        }}
                    >
                        {valor.map((movie, index) => (
                            <SwiperSlide key={index}>
                                <div className="max-sm:flex-row max-md:flex-row max-sm:max-h-36 max-md:max-h-36 flex flex-col w-full bg-preto_escuro rounded-lg h-full max-h-425 ">
                                    {movie.poster_path && movie.poster_path !== undefined ? (
                                        <img
                                            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                            alt={movie.title || movie.name}
                                            className="max-sm:object-fill max-sm:w-max max-sm:min-h-36 max-md:w-max max-md:min-h-36 min-h-64 max-h-64 h-full w-full rounded-lg object-contain"
                                        />
                                    ) : <></>}

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
                            </SwiperSlide>
                        ))}
                        <div class={`${btnClasses} proximo right-0`}>
                            <button class="px-5 py-2"><FaChevronRight /></button>
                        </div>

                        <div class={`${btnClasses} anterior left-0`}>
                            <button class="px-5 py-2"><FaChevronLeft /></button>
                        </div>
                    </Swiper>
                )
                    : <div className='gap-5 flex overflow-x-hidden'>
                        {[...Array(5)].map((_, index) => (
                            <Skeleton key={index} className={"max-sm:h-36 max-sm:w-96 h-425 w-60"} />
                        ))}
                    </div>
                }
            </div>
        </section>
    );
};