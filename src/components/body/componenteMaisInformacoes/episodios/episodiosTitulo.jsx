import React, { useEffect, useState } from 'react'
import { FaRegStar } from 'react-icons/fa'

export const ComponenteEpisodiosTitulo = ({ valor, tituloID }) => {
    const [episodiosTitulo, setEpisodiosTitulo] = useState([]);
    // 'https://api.themoviedb.org/3/tv/219937/season/1?language=en-US'

    useEffect(() => {
        const pegarTodosEpisodios = async () => {
            const API_KEY = '6cab2673c87af7cea093eb14c8a77328';
            const BASE_URL = 'https://api.themoviedb.org/3';
            const response = await fetch(`${BASE_URL}/tv/${tituloID.trim(" ")}/season/1?api_key=${API_KEY}&external_source=imdb_id&language=pt-BR`);
            const data = await response.json();
            console.log("todos os episodios: ", data)
            setEpisodiosTitulo(data.episodes);
        }

        pegarTodosEpisodios();

    }, [])
    return (
        <div className='w-full flex flex-col gap-5 border-0 border-t border-preto_claro my-5'>
            <h2 className='text-2xl text-laranja font-semibold mt-5'>Episódios</h2>
            <div>
                <h3 className='text-lg text-laranja font-semibold my-3'>Último episódio</h3>
                <div className="grid grid-cols-2 gap-3 bg-preto_escuro rounded-lg border border-purple-600">
                    {valor.poster_path && valor.poster_path !== undefined ? (
                        <img
                            src={`https://image.tmdb.org/t/p/w300${valor.last_episode_to_air.still_path}`}
                            alt={valor.title || valor.name}
                            className='rounded-l-lg'
                        />
                    ) : <></>}

                    <div className="">
                        <div className="flex items-center gap-5">
                            <FaRegStar className="text-yellow-400" />
                            {valor.vote_average && valor.vote_average !== undefined ? <p>{valor.vote_average.toFixed(1)}</p> : <p>sem avaliações</p>}
                        </div>
                        <h2 className="text-lg text-laranja overflow-hidden whitespace-nowrap text-ellipsis">
                            {valor.last_episode_to_air.name} - T{valor.last_episode_to_air.season_number} • E{valor.last_episode_to_air.episode_number}
                        </h2 >
                        <p className="max-h-12 overflow-hidden text-xs mb-3">
                            {valor.last_episode_to_air.overview}
                        </p>

                    </div>
                </div>

                <h3 className='text-lg text-laranja font-semibold my-3'>Próximos</h3>
                {episodiosTitulo?.length > 0 ? (
                    <div className='flex flex-col gap-5'>
                        {episodiosTitulo.map((ep, index) => {
                            return (
                                <div key={index} className="grid grid-cols-2 gap-3 bg-preto_escuro rounded-lg">

                                    <img
                                        src={`https://image.tmdb.org/t/p/w300${ep.still_path}`}
                                        alt={ep.title || ep.name}
                                        className='w-full'
                                    />

                                    <div className="">
                                        <div className="flex items-center gap-5">
                                            <FaRegStar className="text-yellow-400" />
                                            {ep.vote_average && ep.vote_average !== undefined ? <p>{ep.vote_average.toFixed(1)}</p> : <p>sem avaliações</p>}
                                        </div>
                                        <h2 className="text-lg text-laranja overflow-hidden whitespace-nowrap text-ellipsis">
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
                ) : <></>}

            </div>
        </div>
    )
}
