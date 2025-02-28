"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GetByGenre } from '@/utils/genresApi';

export const ComponenteGenerosDeFilmes = () => {
    const [filmesPorGenero, setFilmesPorGenero] = useState([]);
    
    useEffect(() => {
        const pegarFilmesPorGenero = async () => {
            const genero = await GetByGenre();
            setFilmesPorGenero(genero);
        }
        pegarFilmesPorGenero();
    }, [])

    return (
        <section className="p-5 max-w-screen-xl mx-auto">
            <h2 className="text-2xl font-bold text-laranja">Por gênero</h2>
            <div className="flex gap-3 justify-start overflow-x-auto py-5 min-w-full hide-scrollbar">
                <div className='flex flex-wrap gap-5'>
                    {filmesPorGenero.map((genero) => {
                        return (
                            <div key={genero.id}>
                                <Link href={`/pages/generos?genero=${genero.name}&id=${genero.id}`}>
                                    <li className="bg-laranja text-preto_escuro flex-nowrap px-5 py-2 rounded-lg flex items-center justify-center min-w-fit 
                                    hover:bg-transparent hover:text-laranja transition-all duration-300 border-2 border-laranja">
                                        <h3 className=" font-semibold flex">{genero.name}</h3>
                                    </li>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

