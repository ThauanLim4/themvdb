"use client";
import { useEffect, useState } from "react";
import { ComponenteTitulosBusca } from "@/components/body/componentesBusca/TitulosBusca";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import "../../globals.css";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet"
import { HeaderComponent } from "@/components/header/Header";

const PaginaDePesquisa = () => {
  const [resultado, setResultado] = useState("");
  const [titulosRetornados, setTitulosRetornados] = useState([]);
  const [tipoDaMidia, setTipoDaMidia] = useState("movie");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [limiteDePaginasAlcancado, setLimiteDePaginasAlcancado] = useState(false);

  const mudarMidia = (midia) => {
    console.log("midia alterada!", midia)
    setTipoDaMidia(midia);
  }

  useEffect(() => {
    const id = window.location.search.split('=')[1];
    const idDecode = decodeURIComponent(id)
    setResultado(idDecode);

    const pegarResultadoDaBusca = async () => {
      const API_KEY = '6cab2673c87af7cea093eb14c8a77328';
      const BASE_URL = 'https://api.themoviedb.org/3';
      const response = await fetch(`${BASE_URL}/search/${tipoDaMidia}?query=${id}&page=${paginaAtual}&api_key=${API_KEY}&external_source=imdb_id&language=pt-BR`);
      const dataResultado = await response.json();
      console.log("resultado da response", dataResultado);
      if (response.ok !== true || dataResultado.results.length < 1) {
        console.log("retornando falso");
        setLimiteDePaginasAlcancado(true);
        return setPaginaAtual(paginaAtual - 1);
      }
      setTitulosRetornados(dataResultado.results);
    }
    pegarResultadoDaBusca();
  }, [tipoDaMidia, paginaAtual]);



  return (
    <>
      <HeaderComponent />
      <div className="text-branco max-w-screen-lg mx-auto overflow-x-hidden p-5">
        <div className="w-full">
          <div className='flex items-center justify-between'>
            <h2 className="text-2xl font-bold text-laranja">Resultado para "{resultado}"</h2>
            <Sheet>
              <SheetTrigger><FaFilter /></SheetTrigger>
              <SheetContent className="overflow-x-hidden" >
                <SheetHeader>
                  <SheetTitle>Filtros</SheetTitle>
                  <SheetDescription className="flex flex-col items-center">
                    <SheetTitle>Tipo da mídia</SheetTitle>
                    <div className="radio-inputs mt-5 flex max-sm:max-w-64">
                      <label className="radio">
                        <input onClick={() => mudarMidia("movie")} type="radio" name="radio" checked={tipoDaMidia === "movie"} />
                        <span className="name">Filmes</span>
                      </label>
                      <label className="radio">
                        <input onClick={() => mudarMidia("tv")} type="radio" name="radio" checked={tipoDaMidia === "tv"} />
                        <span className="name">Séries</span>
                      </label>
                    </div>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>

          {titulosRetornados.length > 0 ? <ComponenteTitulosBusca valor={titulosRetornados} midia={tipoDaMidia} /> : <></>}

          <div className="flex items-center justify-center gap-5">
            <div onClick={() => {
              if (paginaAtual === 1) return
              else { setPaginaAtual(paginaAtual - 1) }
            }} className={`w-24 rounded-sm bg-transparent items-center justify-center flex border-2 duration-300 cursor-pointer active:scale-[0.98] 
          ${paginaAtual === 1 ? "border-preto_claro text-preto_claro"
                : "border-2 border-laranja shadow-lg hover:bg-laranja text-branco hover:text-preto_escuro"}`}>
              <button className="px-5 py-2"><FaChevronLeft /></button>
            </div>


            <h3 className="w-24 flex items-center justify-center h-9 font-bold">{paginaAtual}</h3>


            <div onClick={() => setPaginaAtual(paginaAtual + 1)}
              className={`w-24 ${limiteDePaginasAlcancado ? "border-preto_claro text-preto_claro" : "border-2 border-laranja shadow-lg hover:bg-laranja text-branco hover:text-preto_escuro"} rounded-sm bg-transparent items-center justify-center flex duration-300 active:scale-[0.98]`}>
              <button className="px-5 py-2"><FaChevronRight /></button>
            </div>
          </div>

        </div>
      </div>

    </>
  );

}
export default PaginaDePesquisa;