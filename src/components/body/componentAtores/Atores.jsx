"use client";
import { pegarAtoresPopulares } from '@/utils/peoplesApi';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export const ComponenteAtores = () => {
  const [atores, setAtores] = useState([]);

  useEffect(() => {
    const pegarAtores = async () => {
      const atores = await pegarAtoresPopulares();
      setAtores(atores);
      console.log(atores);
    }
    pegarAtores();
  }, []);
  return (
    <div className='flex overflow-x-scroll max-w-screen-xl mx-auto p-5'>
      <Swiper
        breakpoints={{
          300: {
            slidesPerView: 3,
            spaceBetween: 20
          },
          550: {
            slidesPerView: 2,
            spaceBetween: 10
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10
          },
          980: {
            spaceBetween: 10,
            slidesPerView: 4,
          },
          1180: {
            slidesPerView: 5,
            spaceBetween: 10
          },
        }}
      >
        {atores.length > 0 ? atores.map((ator, index) => {

          return (

            <SwiperSlide key={index}>
              <div className='max-sm:flex-row max-md:flex-row max-sm:max-h-36 max-md:max-h-36 flex flex-col w-full bg-preto_escuro rounded-lg h-full min-h-72 max-h-72 px-3 text-center gap-5 hover:bg-preto_claro transition-all duration-300'>
                <img src={`https://image.tmdb.org/t/p/w500${ator.profile_path}`} alt="" className='max-sm:object-fill max-sm:w-max max-sm:min-h-36 max-md:w-max max-md:min-h-36 min-h-max-h-52 max-h-52 h-full w-full rounded-lg object-contain' />
                <h3 className='text-xl text-laranja'>{ator.name}</h3>
              </div>
            </SwiperSlide>
          )
        }) : null}
      </Swiper>
    </div>
  )
}
