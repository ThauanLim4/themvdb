"use client";
import { useEffect, useState } from "react";
import { ComponenteTitulosBusca } from "@/components/body/componentesBusca/TitulosBusca";
import { Swiper, SwiperSlide } from 'swiper/react';
import "@/css/custom-swiper.css";
import 'swiper/css';


const PaginaDePesquisa = () => {

  // https://api.themoviedb.org/3/search/multi
  const [resultado, setResultado] = useState("");
  const [titulosRetornados, setTitulosRetornados] = useState([]);

  useEffect( () =>{
    const id = window.location.search.split('=')[1];
    setResultado(id);

    const pegarResultadoDaBusca = async () =>{
      const API_KEY = '6cab2673c87af7cea093eb14c8a77328';
      const BASE_URL = 'https://api.themoviedb.org/3';
      const response = await fetch(`${BASE_URL}/search/multi?query=${id}&page=1&api_key=${API_KEY}&external_source=imdb_id&language=pt-BR`);
      const dataResultado = await response.json();
      setTitulosRetornados(dataResultado.results)
      console.log(dataResultado)
    }
    pegarResultadoDaBusca();
  }, [])
  
  return (
    <div className="text-branco max-w-screen-lg mx-auto overflow-x-hidden p-5">
      <div className="w-full">
        {titulosRetornados.length > 0 ? <ComponenteTitulosBusca valor={titulosRetornados} 
        nomeDaSessao={`Resultados para: "${resultado}`} /> : <></>}
      </div>
    </div>
  );
}

export default PaginaDePesquisa;