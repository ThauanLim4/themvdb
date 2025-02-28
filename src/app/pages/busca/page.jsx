"use client";
import { useEffect, useState } from "react";
import { ComponentSearchTitles } from "@/components/body/componentesBusca/SearchTitles";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import "../../globals.css";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/shadcn/sheet";
import { ComponentHeaderNavigation } from "@/components/header/HeaderNavigation";

const PaginaDePesquisa = () => {
  const [resultado, setResultado] = useState("");
  const [titulosRetornados, setTitulosRetornados] = useState([]);
  const [tipoDaMidia, setTipoDaMidia] = useState("movie");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [limiteDePaginasAlcancado, setLimiteDePaginasAlcancado] = useState(false);

  const [disableButton, setDisableButton] = useState(false);

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

  const prevPage = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    } else {
      setDisableButton(true);
    }
  }

  const nextPage = () => {
    setPaginaAtual(paginaAtual + 1);
    setDisableButton(false)
  }


  return (
    <>
      <ComponentHeaderNavigation sessionName="Busca" />
      <div className="text-branco max-w-screen-lg mx-auto overflow-x-hidden p-5">
        <div className="w-full">
          <div className='flex items-center justify-between'>
            <h2 className="text-2xl font-bold text-laranja">Resultado para "{resultado}"</h2>
            <Sheet>
              <SheetTrigger><FaFilter className="hover:text-laranja transition-all duration-300" /></SheetTrigger>
              <SheetContent className="overflow-x-hidden" >
                <SheetHeader>
                  <SheetTitle>Filtros</SheetTitle>
                  <SheetDescription className="flex flex-col items-center">
                    <SheetTitle>Tipo da mídia</SheetTitle>
                    <div className="radio-inputs mt-5 flex max-sm:max-w-64">
                      <label className="radio">
                        <input onClick={() => mudarMidia("movie")} type="radio" name="radio" checked={tipoDaMidia === "movie"} />
                        <span className={`name ${tipoDaMidia === "movie" ? "bg-laranja text-preto_escuro" : ""}`}>Filmes</span>
                      </label>
                      <label className="radio">
                        <input onClick={() => mudarMidia("tv")} type="radio" name="radio" checked={tipoDaMidia === "tv"} />
                        <span className={`name ${tipoDaMidia === "tv" ? "bg-laranja text-preto_escuro" : ""}`}>Séries</span>
                      </label>
                    </div>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>

          {titulosRetornados.length > 0 ? <ComponentSearchTitles valor={titulosRetornados} midia={tipoDaMidia} /> : <></>}

          <div className="flex items-center justify-between gap-5">
            <button onClick={() => prevPage()} disabled={disableButton} className={`flex items-center gap-2 px-2 py-1 rounded-lg ${paginaAtual === 1
              ? "border-2 border-gray-500/50 text-foreground cursor-not-allowed bg-gray-500/50"
              : "text-preto_escuro bg-laranja border-2 border-laranja  hover:bg-transparent hover:text-laranja transition-all duration-300"
              } `}>
              <FaChevronLeft /> Voltar</button>

            <h3 className="flex flex-row items-center justify-center h-9 font-bold">Página {paginaAtual}</h3>

            <button onClick={() => nextPage()} className='flex items-center gap-3 text-preto_escuro bg-laranja border-2 border-laranja px-2 py-1 rounded-lg hover:bg-transparent hover:text-laranja transition-all duration-300'>Próximo <FaChevronRight /></button>

          </div>

        </div>
      </div>

    </>
  );

}
export default PaginaDePesquisa;