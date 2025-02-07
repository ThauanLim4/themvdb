"use client";
import { ComponenteMaisInformacoes } from "@/components/body/componenteMaisInformacoes/MaisInformacoes";
import { useEffect, useState } from "react";
import { IoPeopleSharp } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

import '@/css/custom-swiper.css';


const PaginaDetalhadaDosItens = () => {
    const [detalhesDoTitulo, setDetalhesDoTitulo] = useState([]);
    const [tituloImagens, setTituloImagens] = useState([]);
    const [tituloVideos, setTituloVideos] = useState([]);
    const [tituloAvaliacoes, setTituloAvaliacoes] = useState([])

    useEffect(() => {
        const tipoDaMidia = window.location.search.split('=')[1].split("&")[0];
        const id = window.location.search.split('=')[2];

        console.log("midia retornada:", tipoDaMidia);
        console.log("id retornado:", id);
        const pegarDetalhesDoTitulo = async () => {
            const API_KEY = '6cab2673c87af7cea093eb14c8a77328';
            const BASE_URL = 'https://api.themoviedb.org/3';
            const response = await fetch(`${BASE_URL}/movie/${id.trim(" ")}?api_key=${API_KEY}&external_source=imdb_id&language=pt-BR`);
            const responseImages = await fetch(`${BASE_URL}/${tipoDaMidia}/${id}/images?api_key=${API_KEY}`);
            const responseVideos = await fetch(`${BASE_URL}/${tipoDaMidia}/${id}/videos?api_key=${API_KEY}`);
            const responseAvaliacoes = await fetch(`${BASE_URL}/${tipoDaMidia}/${id}/reviews?api_key=${API_KEY}`);

            const data = await response.json();
            const dataImages = await responseImages.json();
            const dataVideos = await responseVideos.json();
            const dataAvaliacoes = await responseAvaliacoes.json();
            setTituloImagens(dataImages);
            setTituloVideos(dataVideos.results)
            setTituloAvaliacoes(dataAvaliacoes)
            setDetalhesDoTitulo([data]);
            console.log(data);
            console.log(dataImages);
            console.log(dataVideos.results);
            console.log("avaliacoes ", dataAvaliacoes)
        }
        pegarDetalhesDoTitulo();
    }, []);

    return (
        <div className="text-white max-w-screen-lg mx-auto p-5">
            {/* <ComponenteDetalhesDoTitulo valor={DetalhesDoTitulo} nomeDaSessao="Detalhes" /> */}

            {detalhesDoTitulo.length > 0 ? (
                detalhesDoTitulo.map((movie, index) => {
                    return (
                        <div key={index} className="flex flex-col">
                            <div className="flex flex-col  mb-5">
                                <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} className="w-96 max-h-96 object-contain mx-auto" />

                                <div className="flex mt-4 items-center gap-5">
                                    <div className='max-sm:hidden max-md:hidden' >
                                        <FaChevronLeft className="botão-swiper-menor" />
                                    </div>
                                    <Swiper
                                        className="w-full flex"
                                        spaceBetween={10}
                                        autoplay={true}
                                        freeMode={true}
                                        slidesPerView={2}
                                        loop={true}
                                        navigation={{
                                            disabledClass: "swiper-button-next swiper-button-prev",
                                            nextEl: '.botão-swiper-menor',
                                            prevEl: '.swiper-button-prev',
                                        }}

                                    >
                                        {tituloImagens.backdrops.map((image, index) => (
                                            <SwiperSlide key={index}>
                                                <img src={`https://image.tmdb.org/t/p/w300${image.file_path}`} className="w-full h-full object-cover" alt="" />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>


                                    <div>
                                        <FaChevronRight className="botão-swiper-menor" />
                                    </div>

                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between">
                                    <h2 className="text-3xl text-laranja font-semibold">{movie.title}</h2>
                                    <span className="flex gap-5 items-center">
                                        <p className="flex items-center gap-1">{movie.vote_average.toFixed(1)} <FaRegStar className="text-yellow-500" /></p>
                                        <p className="flex items-center gap-1">{movie.vote_count} <IoPeopleSharp /></p>
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <p className="text-green-400 font-semibold">
                                        {movie.status === "Released" ? "Lançamento" : "Em cartaz"}
                                    </p>
                                    <span className="border"></span>
                                    <p>Ano {movie.release_date.substring(0, 4)}</p>
                                    <span className="border"></span>
                                    <p>{movie.runtime} min</p>
                                </div>


                                <div className="flex gap-2 py-2">
                                    {movie.genres.map((genre, index) => {
                                        return (
                                            <p className="border border-preto_claro rounded-md px-2 py-1 font-semibold hover:border-laranja hover:text-laranja transtition duration-300" key={index}>{genre.name}</p>
                                        )
                                    })}

                                </div>

                                <hr className="my-5 bg-preto_escuro" />

                                <div className="flex flex-col gap-3">
                                    <h2 className="text-2xl font-semibold text-laranja">Sinopse</h2>
                                    <p>{movie.overview}</p>
                                </div>
                            </div>
                        </div>

                    )
                })
            ) : []}
        </div>
    );
}

export default PaginaDetalhadaDosItens;