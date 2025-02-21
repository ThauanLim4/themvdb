"use client";
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import '@/css/custom-swiper.css';
import 'swiper/css';

export const ComponenteTituloMidias = ({ valor, tituloID, tituloMidiaTipo }) => {

    const [tituloImagens, setTituloImagens] = useState([]);
    const [tituloVideos, setTituloVideos] = useState([]);

    useEffect(() => {

        const pegarMidias = async () => {
            const API_KEY = '6cab2673c87af7cea093eb14c8a77328';
            const BASE_URL = 'https://api.themoviedb.org/3';
            const responseImages = await fetch(`${BASE_URL}/${tituloMidiaTipo}/${tituloID}/images?api_key=${API_KEY}`);
            const responseVideos = await fetch(`${BASE_URL}/${tituloMidiaTipo}/${tituloID}/videos?api_key=${API_KEY}`);
            const dataImages = await responseImages.json();
            const dataVideos = await responseVideos.json();

            console.log("videos:", dataVideos);
            console.log("imagens", dataImages)

            setTituloImagens(dataImages.backdrops);
            setTituloVideos(dataVideos.results);
        }

        pegarMidias();
    }, []);

    return (
        <div className="flex flex-col mb-5">
            {tituloVideos !== undefined && tituloVideos.length > 0 ? (
                <div className="grid grid-cols-colunas1/0.5 max-sm:flex max-md:flex">
                    {valor.poster_path !== null
                        ? <img src={`https://image.tmdb.org/t/p/w300${valor.poster_path}`} className="w-96 max-h-96 object-contain mx-auto" />
                        : <img src={`https://image.tmdb.org/t/p/w300${tituloImagens[0].file_path}`} className="w-96 max-h-96 object-contain mx-auto" />
                    } {tituloVideos !== undefined && tituloVideos.length > 0 ? (
                        <iframe src={`https://www.youtube.com/embed/${tituloVideos[0]?.key}`} className="w-full h-full outline-none max-sm:hidden max-md:hidden" width={"full"}></iframe>
                    ) : <></>}
                </div>
            ) : (
                <div className="flex justify-center">
                    <img src={`https://image.tmdb.org/t/p/w300${valor.poster_path}`} className="w-96 max-h-96 object-contain mx-auto" />
                </div>


            )}
            <div className="flex flex-row items-center gap-5">

                <Swiper className="w-full max-w-screen-lg overflow-hidden"
                    autoplay={true}
                    loop={true}
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
                    {tituloImagens.map((image, index) => (
                        <SwiperSlide key={index} className="flex flex-row mt-4 items-center gap-5 px-5 w-full">
                            <img src={`https://image.tmdb.org/t/p/w300${image.file_path}`} className="w-full max-w-96" key={index} />
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>

            <div className="hidden max-sm:block max-md:block">
                {tituloVideos !== undefined && tituloVideos.length > 0 ? (
                    <iframe src={`https://www.youtube.com/embed/${tituloVideos[0]?.key}`} className="w-full h-full outline-none p-5" width={"full"} frameborder="0"></iframe>
                ) : <></>}
            </div>
        </div>

    )
}
