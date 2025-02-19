import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import React from 'react'
import { FaRegStar } from 'react-icons/fa'
import { IoPeopleSharp } from 'react-icons/io5'

export const ComponenteTituloInformacoes = ({ valor }) => {
    console.log("valor que está chegando em titulo unformaçoes:", valor)
    return (
        <>
            <div>
                <div className="flex justify-between">
                    <h2 className="text-3xl text-laranja font-semibold">{valor.title || valor.name}</h2>
                    <span className="flex gap-5 items-center">
                        <p className="flex items-center gap-1">{valor.vote_average?.toFixed(1)} <FaRegStar className="text-yellow-500" /></p>
                        <p className="flex items-center gap-1">{valor.vote_count} <IoPeopleSharp /></p>
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <p className="text-green-400 font-semibold">
                        {valor.status === "Released" ? "Lançamento" : "Em cartaz"}
                    </p>
                    <span className="border"></span>
                    <p>Ano {valor.release_date?.substring(0, 4) || valor.last_air_date?.substring(0, 4)}</p>
                    <span className="border"></span>
                    <p>{valor.runtime ? `${valor.runtime} min` : `${valor.episode_run_time} min`}</p>
                </div>

                <div className="flex gap-2 py-2">
                    {valor.genres.map((genre, index) => {
                        return (
                            <Link href={`/pages/generos?genero=${genre.name}&id=${genre.id}`} key={index} className='flex gap-2 py-2'>
                                <p className=" text-center border border-preto_claro rounded-md px-2 py-1 font-semibold hover:border-laranja hover:text-laranja transtition duration-300" key={index}>{genre.name}</p>
                            </Link>
                        )
                    })}
                </div>


                <div className="flex flex-col gap-3 my-5">
                    <h2 className="text-2xl font-semibold text-laranja">Sinopse</h2>
                    <p>{valor.overview}</p>
                </div>
            </div >
        </>
    )
}
