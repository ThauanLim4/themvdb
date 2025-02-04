"use client";
import { HeaderComponent } from "@/components/header/Header";
import { getPopularMovies } from "@/utils/api";
import { useEffect, useState } from "react";
import { GoInfo } from "react-icons/go";
import { FaRegStar } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
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
        {filmesPopulares.length > 0
          ? filmesPopulares.map((movie) => {
            return (
              <div key={movie.id} className="container-filme my-5 rounded-lg grid grid-cols-colunas1/0.5">
                <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className="w-full h-full object-cover rounded-l-md" />
                <div className="px-2 py-1 justify-center flex-col">
                  <div className="flex items-center gap-5">
                    <FaRegStar className="text-yellow-400" />
                    <p>{movie.vote_average.toFixed(1)}</p>
                  </div>
                  <h2 className="text-xl text-laranja mb-3">{movie.title}</h2>
                  <p className="max-h-12 overflow-hidden text-xs mb-3">{`${movie.overview}...`}</p>
                  <div className="flex items-center justify-between">
                    <button className="w-32 h-7 rounded-lg bg-laranja text-branco text-sm flex justify-center items-center hover:bg-preto_escuro hover:border-2 border-laranja transition-all duration-300">Inserir na Lista <IoIosAdd /> </button>
                    <button aria-details="aaa" className="text-laranja font-medium"><GoInfo /></button>
                  </div>
                </div>
              </div>
            )
          })
          : <p>Carregando...</p>
        }
      </section>
    </div>
  );
}
