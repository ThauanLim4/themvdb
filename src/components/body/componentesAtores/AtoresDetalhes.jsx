"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { ComponentActorWorks } from '@/components/body/componentesAtores/AtorObras';


export const ComponentActorDetails = ({ actorDetails, actorImages, actorWorks}) => {
    return (
        <div className='max-sm:flex max-sm:flex-col grid grid-cols-colunas1/0.5 p-5'>
            <div className='max-w-xs max-sm:mx-auto'>
                <Image
                    src={`https://image.tmdb.org/t/p/w500/${actorDetails.profile_path}`}
                    alt={`imagem do ator ${actorDetails.name}`}
                    width={250}
                    height={250} className='rounded-lg mx-auto' />
                <div>
                    <Swiper slidesPerView={2} freeMode={true} autoplay={true} className='mt-5 mx-auto block'>
                        {actorImages.length > 0 ? actorImages.map((ator, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <img src={`https://image.tmdb.org/t/p/w500${ator.file_path}`} alt={`imagem do ator ${actorDetails.name}`} className='max-sm:object-fill max-sm:w-max max-sm:min-h-36 max-md:w-max max-md:min-h-36 min-h-max-h-52 max-h-52 h-full w-full rounded-lg object-contain' />
                                </SwiperSlide>
                            )
                        }) : null}
                    </Swiper>
                </div>

            </div>

            <div className='flex flex-col mt-5'>
                <h2 className="text-2xl font-semibold text-laranja">{actorDetails.name}</h2>
                <span className='flex flex-col gap-1 mt-5'>
                    <h3 className='text-lg font-semibold text-laranja'>Biografia</h3>
                    <p className='text-sm text-branco_2'>{actorDetails.biography}</p>
                </span>

                <div className='flex flex-col gap-1 mt-5'>
                    <h2 className='text-lg font-semibold text-laranja'>Infomações Pessoais</h2>
                    <p>Sexo: {actorDetails.gender === 2 ? "Masculino" : "Feminino"}</p>
                    <p>Nascimento: {actorDetails.birthday}</p>
                    <p>Localidade: {actorDetails.place_of_birth}</p>
                    <p>Conhecido por gêneros: {actorDetails.known_for_department}</p>
                    <p>Morte: {actorDetails.deathday === null ? "Vivo" : actorDetails.deathday}</p>
                </div>

                <div className='flex flex-col border-t border-preto_escuro gap-1 mt-5'>
                    <h2 className='text-lg font-semibold text-laranja'>Trabalhos</h2>
                    {actorWorks.length > 0
                        ? <ComponentActorWorks value={actorWorks} /> : null}
                </div>
            </div>

        </div>

    )
}
