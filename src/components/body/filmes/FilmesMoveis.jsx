import React, { useState } from 'react';
import { GoInfo } from 'react-icons/go';
import { FaRegStar } from 'react-icons/fa';
import { IoIosAdd } from 'react-icons/io';
import { FaChevronRight } from 'react-icons/fa';
import { Tooltip as ReactTooltip } from "react-tooltip";

export const ComponenteFilmesParaMobile = ({ valor }) => {
      const filmesPopulares = valor;
      const [indiceAtual, setIndiceAtual] = useState(0);
    
      const handleNext = () => {
        if (indiceAtual === filmesPopulares.length - 1 ) {
          setIndiceAtual(0);
        } else {  
          setIndiceAtual(indiceAtual + 1);
        } 
      };
    return (
        <section className="p-5 max-w-screen-2xl mx-auto relative">
        <h2 className="text-2xl font-bold text-laranja">Mais Populares</h2>
        <button onClick={handleNext} className="w-10 h-10 absolute top-5 right-5 rounded bg-transparent border-2 border-laranja text-laranja text-2xl flex justify-center items-center"><FaChevronRight /></button>
        <div className="flex gap-3 justify-start h-full w-full p-5">
          {filmesPopulares.length > 0
            ? (
                <div key={filmesPopulares[indiceAtual].id} className="container-filme my-3 rounded-lg grid grid-cols-colunas1/0.5">
                  <img src={`https://image.tmdb.org/t/p/w300${filmesPopulares[indiceAtual].poster_path}`} alt={filmesPopulares[indiceAtual].title} className="w-full h-full object-cover rounded-l-md" />
                  <div className="px-2 py-1 justify-center flex-col">
                    <div className="flex items-center gap-5">
                      <FaRegStar className="text-yellow-400" />
                      <p>{filmesPopulares[indiceAtual].vote_average.toFixed(1)}</p>
                    </div>
                    <h2 className="text-xl text-laranja mb-3">{filmesPopulares[indiceAtual].title.length > 25 ? filmesPopulares[indiceAtual].title.substring(0, 22) + "..." : filmesPopulares[indiceAtual].title}</h2>
                    <p className="max-h-12 overflow-hidden text-xs mb-3">{`${filmesPopulares[indiceAtual].overview.length > 100 ? filmesPopulares[indiceAtual].overview.substring(0, 97) + "..." : filmesPopulares[indiceAtual].overview}`} {filmesPopulares[indiceAtual].overview.length === 0 ? "Sem Sinopse" : ""}</p>
                    <div className="flex items-center justify-between">
                      <button className="w-32 h-7 rounded-lg bg-laranja text-branco text-sm flex justify-center items-center hover:bg-preto_escuro hover:border-2 border-laranja transition-all duration-300">Inserir na Lista <IoIosAdd /> </button>
                      <button data-tooltip-id="tooltip-mais-infos" data-tooltip-content="Mais Informações" className="text-laranja font-medium"><GoInfo /></button>
                      <ReactTooltip id="tooltip-mais-infos" place="right" />
                    </div>
                  </div>
                </div>
              )
            : <p>Carregando...</p>
          }
        </div>
      </section>

    )
};