'use client';
import { ComponenteDeFilmes } from '@/components/body/componentesPrincipais/ComponenteFilmes';
import { HeaderComponent } from '@/components/header/Header'
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'
import { FaRegStar } from 'react-icons/fa';
import { GoInfo } from 'react-icons/go';
import { IoIosAdd } from 'react-icons/io';

export const Favoritos = () => {
    const [favoritosDoUsuario, setFavoritosDoUsuario] = useState([]);
    const [titulosFavoritos, setTitulosFavoritos] = useState([]);
    const searchParams = useSearchParams();
    const token = searchParams.get('token')

    useEffect(() => {
        const pegarUsuarios = async () => {
            try {
                const response = await fetch('/api/users');
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const data = await response.json();
                console.log("data:", data);
                if (data) {
                    const usuarioInfos = data.find(us => us.token === token);
                    console.log("retorno:", usuarioInfos)
                    setFavoritosDoUsuario(usuarioInfos?.favoritedTitles || []);
                    console.log(usuarioInfos?.favoritedTitles);

                    if (usuarioInfos) {
                        console.log("midia:", usuarioInfos.favoritedTitles.tipoMidia, "id:", usuarioInfos.favoritedTitles.idTitulo);
                        const id = usuarioInfos.favoritedTitles.idTitulo;
                        const midia = usuarioInfos.favoritedTitles.tipoMidia;
                        const pegarDetalhesDoTitulo = async () => {
                            const API_KEY = '6cab2673c87af7cea093eb14c8a77328';
                            const BASE_URL = 'https://api.themoviedb.org/3';
                            if (id !== undefined && midia !== undefined) {
                                const response = await fetch(`${BASE_URL}/${midia}/${id}?api_key=${API_KEY}&external_source=imdb_id&language=pt-BR`);
                                const data = await response.json();
                                console.log("titulos favoritos que foram retornados:", data);
                                setTitulosFavoritos(data);

                            }
                        }
                        pegarDetalhesDoTitulo();
                    }

                }
            } catch (error) {
                console.log(error);
            }
        }

        pegarUsuarios();

    }, [token]);


    return (
        <>
            <HeaderComponent />
            <div className='max-w-screen-lg mx-auto p-5'>
                <h1 className='text-3xl text-laranja font-semibold'>Favoritos</h1>

                <div className="max-sm:flex-row max-md:flex-row max-sm:max-h-36 max-md:max-h-36 flex flex-col w-full bg-preto_escuro rounded-lg h-full max-h-425 ">
                    {titulosFavoritos.poster_path && titulosFavoritos.poster_path !== undefined ? (
                        <img
                            src={`https://image.tmdb.org/t/p/w300${titulosFavoritos.poster_path}`}
                            alt={titulosFavoritos.title || titulosFavoritos.name}
                            className="max-sm:object-fill max-sm:w-max max-sm:min-h-36 max-md:w-max max-md:min-h-36 min-h-64 max-h-64 h-full w-full rounded-lg object-contain"
                        />
                    ) : <></>}

                    <div className="px-3 py-2 grid max-sm:grid-rows-template-infos-h-fixed-mobile
                                    max-md:grid-rows-template-infos-h-fixed-mobile
                                    grid-rows-template-infos-h-fixed w-full">
                        <div className="flex items-center gap-5">
                            <FaRegStar className="text-yellow-400" />
                            {titulosFavoritos.vote_average && titulosFavoritos.vote_average !== undefined ? <p>{titulosFavoritos.vote_average.toFixed(1)}</p> : <p>sem avaliações</p>}
                        </div>
                        <Link href={`/pages/detalhes?tm=${!titulosFavoritos.media_type ? 'titulosFavoritos' : 'tv'}&idt=${titulosFavoritos.id}`} className="text-lg text-laranja overflow-hidden whitespace-nowrap text-ellipsis truncate">
                            {titulosFavoritos.title || titulosFavoritos.name}
                        </Link >
                        <p className="max-h-12 overflow-hidden text-xs mb-3">
                            {titulosFavoritos.overview && titulosFavoritos.overview.length > 0
                                ? `${titulosFavoritos.overview.length > 75 ? titulosFavoritos.overview.substring(0, 72) + '...' : titulosFavoritos.overview}`
                                : 'Sem Sinopse'}
                        </p>
                    </div>
                </div>

            </div>
        </>
    )
}

const PaginaFavoritos = () => {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <Favoritos />
        </Suspense>
    )
}

export default PaginaFavoritos;