'use client';
import { ComponenteDeTitulosFavoritados } from '@/components/body/componentesFavorito/ComponenteTitulosFav';
import { HeaderComponent } from '@/components/header/Header'
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'


export const Favoritos = () => {
    const [favoritosDoUsuario, setFavoritosDoUsuario] = useState([]);
    const [titulosFavoritos, setTitulosFavoritos] = useState([]);
    const [midia, setMidia] = useState('')
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
                    console.log("favoritos:", usuarioInfos?.favoritedTitles);

                    if (usuarioInfos) {
                        const id = usuarioInfos.favoritedTitles.map(id => id);
                        const midia = usuarioInfos.favoritedTitles.map(midia => midia);
                        console.log("midia:", id, "id:", midia);
                        const pegarDetalhesDoTitulo = async () => {
                            const API_KEY = '6cab2673c87af7cea093eb14c8a77328';
                            const BASE_URL = 'https://api.themoviedb.org/3';
                            if (id !== undefined && midia !== undefined) {
                                const titulos = [];
                                const midias = []
                                for (let i = 0; i < midia.length; i++) {
                                    const response = await fetch(`${BASE_URL}/${midia[i].tipoMidia}/${id[i].idTitulo}?api_key=${API_KEY}&external_source=imdb_id&language=pt-BR`);
                                    const data = await response.json();
                                    titulos.push(data);
                                    midias.push(midia[i].tipoMidia);
                                }
                                console.log("titulos favoritos que foram retornados:", titulos);
                                console.log("midias:", midias);
                                setTitulosFavoritos(titulos);
                                setMidia(midias)
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
            <div className='max-w-screen-lg mx-auto'>
                {titulosFavoritos.length > 0 ? (
                    <ComponenteDeTitulosFavoritados valor={titulosFavoritos} midia={midia}  />
                ) : <p>nenhum ítem foi adicionado aos favoritos ainda...</p>}
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