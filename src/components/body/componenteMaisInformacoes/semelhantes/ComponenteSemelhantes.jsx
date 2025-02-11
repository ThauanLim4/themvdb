import Link from "next/link";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { FaRegStar } from "react-icons/fa";
import { GoInfo } from "react-icons/go";
import { IoIosAdd } from "react-icons/io";
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import '@/css/custom-swiper.css';

export const ComponenteTitulosSemelhantes = ({ valor }) => {
    return (
        <>
            {valor.length > 0 ? (
                <div className="flex justify-start overflow-x-auto py-5">

                    <Swiper
                        spaceBetween={10}
                        slidesPerView={5}
                        freeMode={true}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                        breakpoints={{
                            300: {
                                slidesPerView: 2,
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
                        }}
                    >
                        <div className='max-sm:hidden max-md:hidden'>
                            <FaChevronLeft className="swiper-button-prev" />
                        </div>
                        {valor.map((movie, index) => (
                            <SwiperSlide key={movie.id}>
                                <div className="bg-preto_escuro rounded-lg flex flex-col items-center h-full max-h-425">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                        alt={movie.title || movie.name}
                                        className="imagem-cartaz"
                                    />
                                    <div className="px-3 py-2 grid grid-rows-template-infos w-full h-full">
                                        <div className="flex items-center gap-5">
                                            <FaRegStar className="text-yellow-400" />
                                            <p>{movie.vote_average.toFixed(1)}</p>
                                        </div>
                                        <Link href={`/pages/detalhes?tm=${!movie.media_type ? 'movie' : 'tv'}&idt=${movie.id}`} className="text-lg text-laranja overflow-hidden whitespace-nowrap text-ellipsis">
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
                            <FaChevronRight className="swiper-button-next" />
                        </div>
                    </Swiper>
                </div>
            ) : (
                <p>Carregando...</p>
            )}
        </>
    )
}