"use client";
import { useEffect, useState } from "react";
import { IoPeopleSharp } from "react-icons/io5";
import { FaRegStar, FaStar } from "react-icons/fa";
import { ComponenteTitulosSemelhantes } from "@/components/body/componenteMaisInformacoes/semelhantes/ComponenteSemelhantes";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import '@/css/custom-swiper.css';
import { AvaliacoesComponente } from "@/components/body/componenteMaisInformacoes/avaliacoes/AvaliacoesTitulo";

const PaginaDetalhadaDosItens = () => {
    const [detalhesDoTitulo, setDetalhesDoTitulo] = useState([]);
    const [tituloImagens, setTituloImagens] = useState([]);
    const [tituloVideos, setTituloVideos] = useState([]);
    const [tituloAvaliacoes, setTituloAvaliacoes] = useState([]);
    const [titulosSemelhantes, setTitulosSemelhantes] = useState([]);
    const [idTitulo, setIdTitulo] = useState("");
    console.log("idtitulo", idTitulo);

    
    useEffect(() => {
        const tipoDaMidia = window.location.search.split('=')[1].split("&")[0];
        const id = window.location.search.split('=')[2];
        const pegarDetalhesDoTitulo = async () => {
            const API_KEY = '6cab2673c87af7cea093eb14c8a77328';
            const BASE_URL = 'https://api.themoviedb.org/3';
            const response = await fetch(`${BASE_URL}/movie/${id.trim(" ")}?api_key=${API_KEY}&external_source=imdb_id&language=pt-BR`);
            const responseImages = await fetch(`${BASE_URL}/${tipoDaMidia}/${id}/images?api_key=${API_KEY}`);
            const responseVideos = await fetch(`${BASE_URL}/${tipoDaMidia}/${id}/videos?api_key=${API_KEY}`);
            const responseAvaliacoes = await fetch(`${BASE_URL}/${tipoDaMidia}/${id}/reviews?api_key=${API_KEY}`);
            const responseSemelhantes = await fetch(`${BASE_URL}/${tipoDaMidia}/${id}/recommendations?api_key=${API_KEY}&language=pt-BR&page=1`);

            const data = await response.json();
            const dataImages = await responseImages.json();
            const dataVideos = await responseVideos.json();
            const dataAvaliacoes = await responseAvaliacoes.json();
            const dataSemelhantes = await responseSemelhantes.json();
            setTituloImagens(dataImages);
            setTituloVideos(dataVideos.results)
            setTituloAvaliacoes(dataAvaliacoes)
            setDetalhesDoTitulo([data]);
            setTitulosSemelhantes(dataSemelhantes.results);
            console.log(data);
            console.log("avaliacoes ", dataAvaliacoes);
            console.log("semelhantes", dataSemelhantes);
        }
        pegarDetalhesDoTitulo();
    }, [idTitulo]);

    return (
        <div className="text-white max-w-screen-lg mx-auto p-5">
            {/* <ComponenteDetalhesDoTitulo valor={DetalhesDoTitulo} nomeDaSessao="Detalhes" /> */}

            {detalhesDoTitulo.length > 0 ? (
                detalhesDoTitulo.map((movie, index) => {
                    return (
                        <div key={index} className="flex flex-col">
                            <div className="flex flex-col mb-5">
                                
                                <div className="grid grid-cols-colunas1/0.5 max-sm:flex max-md:flex">
                                    <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} className="w-96 max-h-96 object-contain mx-auto" />
                                    {tituloVideos !== undefined && tituloVideos.length > 0 ? (
                                        <iframe src={`https://www.youtube.com/embed/${tituloVideos[0]?.key}`} className="w-full h-full outline-none max-sm:hidden max-md:hidden" width={"full"}></iframe>
                                    ) : <span></span>}
                                </div>

                                <div className="flex flex-row items-center gap-5">

                                    <Swiper className="w-full max-w-screen-lg overflow-hidden"
                                        autoplay={true}
                                        loop={true}
                                        breakpoints={{
                                            300: {
                                                slidesPerView: 2,
                                                freeMode: true,
                                                spaceBetween: 50
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
                                        {tituloImagens.backdrops.map((image, index) => (
                                            <SwiperSlide key={index} className="flex flex-row mt-4 items-center gap-5 px-5 w-full">
                                                <img src={`https://image.tmdb.org/t/p/w300${image.file_path}`} className="imagem-cartaz" key={index} />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                </div>

                                <div className="hidden max-sm:block max-md:block">
                                    {tituloVideos !== undefined && tituloVideos.length > 0 ? (
                                        <iframe src={`https://www.youtube.com/embed/${tituloVideos[0]?.key}`} className="w-full h-full outline-none p-5" width={"full"} frameborder="0"></iframe>
                                    ) : <span></span>}
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


                                <div className="flex flex-col gap-3 my-5">
                                    <h2 className="text-2xl font-semibold text-laranja">Sinopse</h2>
                                    <p>{movie.overview}</p>
                                </div>

                                {/* Este é o componente de avaliações do titulo atual */}

                                <div>
                                    <AvaliacoesComponente valor={tituloAvaliacoes} />
                                </div>

                                {/* Neste componente fica títulos semelhantes ao tituto atual */}

                                <div> 
                                    <ComponenteTitulosSemelhantes valor={titulosSemelhantes} />
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