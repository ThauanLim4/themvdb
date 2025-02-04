"use client";
import { HeaderComponent } from "@/components/header/Header";
import { getPopularMovies } from "@/utils/api";
import { useEffect, useState } from "react";
import { GoInfo } from "react-icons/go";
import { FaRegStar } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { FaChevronRight } from "react-icons/fa";

export default function Home() {
  const [filmesPopulares, setFilmesPopulares] = useState([]);
  
  useEffect(() => {
    (async () => {
      const movies = await getPopularMovies();
      setFilmesPopulares(movies);
      console.log(movies);
    })();
  }, [])
  return (
    <div>
      <HeaderComponent />
      <section className="p-5 max-w-screen-2xl mx-auto">
        <h2 className="text-2xl font-bold text-laranja">Mais Populares</h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {filmesPopulares.length > 0
            ? filmesPopulares.map((movie, index) => {
              if (index > 5) {
                return;
              }
              return (
                <div key={movie.id} className="container-filme my-3 rounded-lg grid grid-cols-colunas1/0.5">
                  <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className="w-full h-full object-cover rounded-l-md" />
                  <div className="px-2 py-1 justify-center flex-col">
                    <div className="flex items-center gap-5">
                      <FaRegStar className="text-yellow-400" />
                      <p>{movie.vote_average.toFixed(1)}</p>
                    </div>
                    <h2 className="text-xl text-laranja mb-3">{movie.title.length > 25 ? movie.title.substring(0, 22) + "..." : movie.title}</h2>
                    <p className="max-h-12 overflow-hidden text-xs mb-3">{`${movie.overview.length > 100 ? movie.overview.substring(0, 97) + "..." : movie.overview}`} {movie.overview.length === 0 ? "Sem Sinopse" : ""}</p>
                    <div className="flex items-center justify-between">
                      <button className="w-32 h-7 rounded-lg bg-laranja text-branco text-sm flex justify-center items-center hover:bg-preto_escuro hover:border-2 border-laranja transition-all duration-300">Inserir na Lista <IoIosAdd /> </button>
                      <button data-tooltip-id="tooltip-mais-infos" data-tooltip-content="Mais Informações" className="text-laranja font-medium"><GoInfo /></button>
                      <ReactTooltip id="tooltip-mais-infos" place="right" />
                    </div>
                  </div>
                </div>
              )
            })
            : <p>Carregando...</p>
          }
        </div>
      </section>
      <hr className="border-t-2 border-laranja" />

      <section className="p-5 max-w-screen-2xl mx-auto relative">
        <h2 className="text-2xl font-bold text-laranja">Mais Populares 2</h2>
        <button className="w-10 h-10 absolute top-5 right-5 rounded bg-transparent border-2 border-laranja text-laranja text-2xl flex justify-center items-center"><FaChevronRight /></button>
        <div className="flex gap-3 justify-start overflow-x-auto h-full w-full p-5">
          {filmesPopulares.length > 0
            ? filmesPopulares.map((filme, index) => {
              if (index > 5) {
                return;
              }
              return (
                <div key={filme.id} className="container-filme my-3 rounded-lg grid grid-cols-colunas1/0.5">
                  <img src={`https://image.tmdb.org/t/p/w300${filme.poster_path}`} alt={filme.title} className="w-full h-full object-cover rounded-l-md" />
                  <div className="px-2 py-1 justify-center flex-col">
                    <div className="flex items-center gap-5">
                      <FaRegStar className="text-yellow-400" />
                      <p>{filme.vote_average.toFixed(1)}</p>
                    </div>
                    <h2 className="text-xl text-laranja mb-3">{filme.title.length > 25 ? filme.title.substring(0, 22) + "..." : filme.title}</h2>
                    <p className="max-h-12 overflow-hidden text-xs mb-3">{`${filme.overview.length > 100 ? filme.overview.substring(0, 97) + "..." : filme.overview}`} {filme.overview.length === 0 ? "Sem Sinopse" : ""}</p>
                    <div className="flex items-center justify-between">
                      <button className="w-32 h-7 rounded-lg bg-laranja text-branco text-sm flex justify-center items-center hover:bg-preto_escuro hover:border-2 border-laranja transition-all duration-300">Inserir na Lista <IoIosAdd /> </button>
                      <button data-tooltip-id="tooltip-mais-infos" data-tooltip-content="Mais Informações" className="text-laranja font-medium"><GoInfo /></button>
                      <ReactTooltip id="tooltip-mais-infos" place="right" />
                    </div>
                  </div>
                </div>
              )
            })
            : <p>Carregando...</p>
          }
        </div>
      </section>

    </div>
  );
}
