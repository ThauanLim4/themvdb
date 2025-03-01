import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaRegStar } from 'react-icons/fa';
import { IoMdRemove } from 'react-icons/io';
import { useSearchParams, useRouter } from 'next/navigation';

export const ComponenteDeTitulosFavoritados = ({ valor, midia }) => {
    const [usuarioInfos, setUsuariosInfos] = useState([]);
    const params = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const token = params.get('token');

        if (token) {
            const pegarUsuarios = async () => {
                try {
                    const response = await fetch('/api/users');
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    const data = await response.json();
                    if (data) {
                        const usuario = data.find(us => us.token === token);
                        setUsuariosInfos(usuario);
                    }
                } catch (error) {
                    console.log(error);
                }
            }

            pegarUsuarios();
        } else {
            console.log("token não existe")
        }
    }, []);



    const removerItemDaLista = async (id, midia) => {
        if (usuarioInfos) {
            const idUser = usuarioInfos.id;
            const tipoMidia = midia === undefined ? "movie" : midia;
            try {
                const idTitulo = id?.toString();
                const response = await fetch('/api/addlist', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ idUser, idTitulo, tipoMidia })
                })

                if (response.ok) {
                    console.log("titulo removido com sucesso com sucesso");
                    router.refresh();
                }
            } catch (erro) {
                console.log(erro)
            }

        }
    }

    return (
        <section className="p-5 max-w-screen-xl mx-auto">

            <div className="flex justify-start overflow-x-auto py-5 text-branco">
                {valor.length > 0 ? (
                    <div className='gap-5 max-sm:flex max-sm:flex-col grid max-md:grid-cols-2 max-lg:grid-cols-3 grid-cols-4'>
                        {valor.map((movie, index) => (
                            <div key={index} className="max-sm:flex-row max-md:flex-row max-sm:max-h-36 max-md:max-h-36 flex flex-col w-full bg-preto_escuro rounded-lg h-full max-h-425 ">
                                {movie.poster_path && movie.poster_path !== undefined ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                        alt={movie.title || movie.name}
                                        className="
                                        max-sm:object-fill max-sm:w-max max-sm:min-h-36 max-md:w-max max-md:min-h-36 min-h-64 max-h-64 h-full w-full rounded-lg object-contain"
                                    />
                                ) : <div className='max-sm:object-cover max-sm:min-w-24 max-sm:min-h-36 max-md:w-max max-md:min-w-24 max-md:min-h-36 min-h-64 max-h-64 h-full w-full rounded-lg object-contain bg-laranja flex justify-center items-center'>😐</div>}

                                <div className="px-3 py-2 grid max-sm:grid-rows-template-infos-h-fixed-mobile
                                    max-md:grid-rows-template-infos-h-fixed-mobile
                                    grid-rows-template-infos-h-fixed w-full">
                                    <div className="flex items-center gap-5">
                                        <FaRegStar className="text-yellow-400" />
                                        {movie.vote_average && movie.vote_average !== undefined ? <p>{movie.vote_average.toFixed(1)}</p> : <p>sem avaliações</p>}
                                    </div>
                                    <Link href={`/pages/detalhes?tm=${midia[index]}&idt=${movie.id}`} className="text-lg text-laranja overflow-hidden whitespace-nowrap text-ellipsis">
                                        {movie.title || movie.name}
                                    </Link >
                                    <p className="max-h-12 overflow-hidden text-xs mb-3">
                                        {movie.overview && movie.overview.length > 0
                                            ? `${movie.overview.length > 75 ? movie.overview.substring(0, 72) + '...' : movie.overview}`
                                            : 'Sem Sinopse'}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <button onClick={() => removerItemDaLista(movie.id, movie.media_type)} className="w-32 h-7 rounded-lg bg-transparent text-branco text-sm flex justify-center items-center hover:bg-destructive hover:border-destructive border-2 border-laranja transition-all duration-300">
                                            remover da Lista <IoMdRemove className='text-white' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                ) : (
                    <p>Carregando...</p>
                )}
            </div>
        </section>
    );
};