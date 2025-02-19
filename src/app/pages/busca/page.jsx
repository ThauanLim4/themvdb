"use client";
import { useEffect, useState } from "react";
import { ComponenteTitulosBusca } from "@/components/body/componentesBusca/TitulosBusca";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../../globals.css";
// https://api.themoviedb.org/3/search/multi

const PaginaDePesquisa = () => {
  const [resultado, setResultado] = useState("");
  const [titulosRetornados, setTitulosRetornados] = useState([]);
  const [tipoDaMidia, setTipoDaMidia] = useState("movie");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [botaoDesativado, setBotaoDesativado] = useState(false);

  const mudarMidia = (midia) => {
    console.log("midia alterada!", midia)
    setTipoDaMidia(midia);
  }

  useEffect(() => {
    const id = window.location.search.split('=')[1];
    setResultado(id);

    const pegarResultadoDaBusca = async () => {
      const API_KEY = '6cab2673c87af7cea093eb14c8a77328';
      const BASE_URL = 'https://api.themoviedb.org/3';
      const response = await fetch(`${BASE_URL}/search/${tipoDaMidia}?query=${id}&page=${paginaAtual}&api_key=${API_KEY}&external_source=imdb_id&language=pt-BR`);
      const dataResultado = await response.json();
      console.log("resultado da response", dataResultado);
      if (response.ok !== true || dataResultado.results.length < 1) {
        console.log("retornando falso");
        return setPaginaAtual(paginaAtual -1)
      }
      setTitulosRetornados(dataResultado.results)
    }
    pegarResultadoDaBusca();
  }, [tipoDaMidia, paginaAtual]);



  return (
    <div className="text-branco max-w-screen-lg mx-auto overflow-x-hidden p-5">
      <div className="w-full">
        <div className='flex items-center justify-between'>
          <h2 className="text-2xl font-bold text-laranja">Resultado para "{resultado}"</h2>
          <div className="radio-inputs">
            <label className="radio">
              <input onClick={() => mudarMidia("movie")} type="radio" name="radio" defaultChecked />
              <span className="name">Filmes</span>
            </label>
            <label className="radio">
              <input onClick={() => mudarMidia("tv")} type="radio" name="radio" />
              <span className="name">Séries</span>
            </label>
          </div>

        </div>

        {titulosRetornados.length > 0 ? <ComponenteTitulosBusca valor={titulosRetornados} midia={tipoDaMidia} /> : <></>}


        <div className="flex items-center justify-around">
          <div onClick={() => {
            if(paginaAtual === 1) return
            else {setPaginaAtual(paginaAtual - 1 )}
          }} class={`max-w-28 bg-transparent items-center justify-center flex border-2 duration-300 cursor-pointer active:scale-[0.98] 
          ${paginaAtual === 1 ? "border-preto_claro text-preto_claro" : "border-2 border-laranja shadow-lg hover:bg-laranja text-branco hover:text-preto_escuro"}`}>
            <button class="px-5 py-2"><FaChevronLeft /></button>
          </div>
          <h3>Página {paginaAtual}</h3>
          <div onClick={() => setPaginaAtual(paginaAtual + 1)} class="max-w-28 bg-transparent items-center justify-center flex border-2 border-laranja shadow-lg hover:bg-laranja text-branco hover:text-preto_escuro duration-300 cursor-pointer active:scale-[0.98]">
            <button class="px-5 py-2"><FaChevronRight /></button>
          </div>
        </div>

      </div>
    </div>
  );

}
export default PaginaDePesquisa;