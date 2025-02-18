import React, { useEffect, useState } from 'react';
import { FaRegStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export const ComponenteEpisodiosTitulo = ({ valor, tituloID }) => {
    const [episodiosTitulo, setEpisodiosTitulo] = useState([]);
    const [temporadaInfos, setTemporadaInfos] = useState([]);
    const [imagensDaTemporada, setImagensDaTemporada] = useState([]);
    const [temporadaNumero, setTemporadaNumero] = useState(1);
    // 'https://api.themoviedb.org/3/tv/219937/season/1?language=en-US'

    useEffect(() => {
        const pegarTodosEpisodios = async () => {
            const API_KEY = '6cab2673c87af7cea093eb14c8a77328';
            const BASE_URL = 'https://api.themoviedb.org/3';
            const response = await fetch(`${BASE_URL}/tv/${tituloID.trim(" ")}/season/${temporadaNumero}?api_key=${API_KEY}&external_source=imdb_id&language=pt-BR`);
            const responseImagesTemporada = await fetch(`${BASE_URL}/tv/${tituloID.trim(" ")}/season/${temporadaNumero}/images?api_key=${API_KEY}`);
            const data = await response.json();
            if (response.ok !== true) {
                console.log("retornando falso");
                return setTemporadaNumero(temporadaNumero - 1);
            }
            const dataImagems = await responseImagesTemporada.json();
            console.log("todos os episodios: ", data);
            console.log("todas as imagens: ", dataImagems);
            setImagensDaTemporada(dataImagems.posters);
            setEpisodiosTitulo(data.episodes);
            setTemporadaInfos(data);

        }

        pegarTodosEpisodios();

    }, [temporadaNumero])
    return (
        <div className='w-full flex flex-col gap-5 border-0 border-t border-preto_claro my-5 max-w-screen-lg'>

            <div>
                <h2 className='text-2xl text-laranja font-semibold my-5'>Temporadas</h2>
                {episodiosTitulo?.length > 0 ? (
                    <div className='max-sm:flex max-sm:flex-col grid grid-cols-colunas1/0.5 gap-5'>
                        <div className='bg-preto_escuro rounded-lg p-5 max-h-750'>
                            <div className='flex flex-col items-center gap-5 mb-5'>
                                {imagensDaTemporada.length > 0 ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w300${imagensDaTemporada[0].file_path}`}
                                        alt={valor.title || valor.name}
                                        className='rounded-l-lg max-h-60 h-full w-full mx-auto object-contain'
                                    />

                                ) : <></>}
                                <div className='flex items-center gap-5'>
                                    <button onClick={() => setTemporadaNumero(temporadaNumero - 1)} className='text-laranja'><FaChevronLeft /></button>
                                    <p className='font-semibold'>Temporada {temporadaNumero}</p>
                                    <button onClick={() => setTemporadaNumero(temporadaNumero + 1)} className='text-laranja'><FaChevronRight /></button>
                                </div>
                            </div>

                            <div>
                                <h2 className='text-lg text-laranja'>{temporadaInfos.name} {`(${episodiosTitulo.length})`}</h2>
                                <p className='text-xs'>{temporadaInfos?.overview
                                    ? temporadaInfos.overview
                                    : <p>Sem descrição para esse título...</p>}
                                </p>
                            </div>
                        </div>

                        <div className='flex p-3 flex-col gap-5 max-h-750 overflow-y-scroll'>

                            {episodiosTitulo.map((ep, index) => {
                                return (
                                    <div key={index} className="grid grid-cols-colunas1/0.5 gap-3 bg-preto_escuro rounded-lg">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w300${ep.still_path}`}
                                            alt={ep.title || ep.name}
                                            className='max-sm:min-w-36 min-w-48 w-full h-full max-w-48 object-cover rounded-l-lg'
                                        />

                                        <div className="overflow-x-hidden">
                                            <h2 className="text-laranja overflow-hidden whitespace-nowrap text-ellipsis">
                                                {ep.name} - T{ep.season_number} • E{ep.episode_number}
                                            </h2 >
                                            <p className="max-h-12 overflow-hidden text-xs mb-3">
                                                {ep.overview}
                                            </p>

                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ) : <></>}

            </div>
        </div>
    )
}
