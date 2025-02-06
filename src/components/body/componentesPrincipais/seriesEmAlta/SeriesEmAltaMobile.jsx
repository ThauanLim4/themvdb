import React, { useEffect, useState } from 'react';
import { GoInfo } from 'react-icons/go';
import { FaRegStar } from 'react-icons/fa';
import { IoIosAdd } from 'react-icons/io';
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Swiper, SwiperSlide } from 'swiper/react';

export const ComponenteParaSeriesEmAltaMobile = ({ valor, nomeDaSessao }) => {
  const seriesEmAlta = valor;
  const [slidesPerView, setSlidesPerView] = useState(2);

  useEffect(() => {
    function ResolucaoDaTela(){
      if (window.innerWidth < 660) {
        setSlidesPerView(1);
      } else {
        setSlidesPerView(2);
      }
    }

    ResolucaoDaTela();
    window.addEventListener('resize', ResolucaoDaTela);
    return () => {
      window.removeEventListener('resize', ResolucaoDaTela);
    }
  }, []);

  return (
    <section className="p-5 max-w-screen-2xl mx-auto relative">
      <h2 className="text-2xl font-bold text-laranja">{nomeDaSessao}</h2>
      <div className="flex gap-3 justify-start overflow-x-auto py-5">
        {seriesEmAlta.length > 0
          ? <Swiper
            slidesPerView={slidesPerView}
            spaceBetween={30}
          > {
            seriesEmAlta.map((filme) => {
              return (
                <SwiperSlide key={filme.id}>
                  <div key={filme.id} className="container-filme my-3 rounded-lg grid grid-cols-colunas1/0.5">
                    <img src={`https://image.tmdb.org/t/p/w300${filme.poster_path}`} alt={filme.name} className="w-full h-full object-cover rounded-l-md" />
                    <div className="px-2 py-1 justify-center flex-col">
                      <div className="flex items-center gap-5">
                        <FaRegStar className="text-yellow-400" />
                        <p>{filme.vote_average.toFixed(1)}</p>
                      </div>
                      <h2 className="text-xl text-laranja mb-3">{filme.name.length > 25 ? filme.name.substring(0, 22) + "..." : filme.name}</h2>
                      <p className="max-h-12 overflow-hidden text-xs mb-3">{`${filme.overview.length > 100 ? filme.overview.substring(0, 97) + "..." : filme.overview}`} {filme.overview.length === 0 ? "Sem Sinopse" : ""}</p>
                      <div className="flex items-center justify-between">
                        <button className="w-32 h-7 rounded-lg bg-laranja text-branco text-sm flex justify-center items-center hover:bg-preto_escuro hover:border-2 border-laranja transition-all duration-300">Inserir na Lista <IoIosAdd /> </button>
                        <button data-tooltip-id="tooltip-mais-infos" data-tooltip-content="Mais Informações" className="text-laranja font-medium"><GoInfo /></button>
                        <ReactTooltip id="tooltip-mais-infos" place="right" />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              )
            })
          }
          </Swiper>
          : <p>Carregando...</p>
        }
      </div>
    </section>

  )
};