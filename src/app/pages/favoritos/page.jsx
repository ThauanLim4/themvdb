'use client';
import { HeaderComponent } from '@/components/header/Header'
import { TokenContext } from '@/context/token';
import { useSearchParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'

const Favotios = () => {
    const [favoritosDoUsuario, setFavoritosDoUsuario] = useState([]);
    const searchParams = useSearchParams();
    const token = searchParams.get('token')
    console.log(token)

    useEffect(() => {
        const pegarUsuarios = async () => {
            try {
                const response = await fetch('/api/users');
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const data = await response.json();
                console.log(data)
                const usuarioInfos = data.find(us => us.token === token)
                setInformacoesDoUsuario(usuarioInfos.favoritedTitles)
            } catch (error) {
                console.log(error);
            }
        }

        pegarUsuarios();
    }, []);


    return (
        <>
            <HeaderComponent />
            <div className='max-w-screen-lg mx-auto p-5'>
                <h1 className='text-3xl text-laranja font-semibold'>Favoritos</h1>

                <div>
                    {favoritosDoUsuario.length === 0 ? <p>nenhum item nos favoritos</p> : <p>tem item(s) nos favoritos</p>}
                </div>
            </div>
        </>
    )
}

export default Favotios