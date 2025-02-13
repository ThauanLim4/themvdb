"use client";
import { useEffect, useState } from "react";
import { ComponenteTitulosSemelhantes } from "@/components/body/componenteMaisInformacoes/semelhantes/ComponenteSemelhantes";
import { AvaliacoesComponente } from "@/components/body/componenteMaisInformacoes/avaliacoes/AvaliacoesTitulo";
import { ComponenteTituloInformacoes } from "@/components/body/componenteMaisInformacoes/informacoes/TituloInformacoes";
import '@/css/custom-swiper.css';
import 'swiper/css';
import { ComponenteTituloMidias } from "@/components/body/componenteMaisInformacoes/midias/TituloMidias";
import { HeaderComponent } from "@/components/header/Header";

const PaginaDetalhadaDosItens = () => {
    const [detalhesDoTitulo, setDetalhesDoTitulo] = useState([]);
    const [tituloAvaliacoes, setTituloAvaliacoes] = useState([]);
    const [titulosSemelhantes, setTitulosSemelhantes] = useState([]);
    const [resultadoId, setResultadoId] = useState("");
    const [resultadoMidia, setResultadoMidia] = useState("");

    useEffect(() => {
        const tipoDaMidia = window.location.search.split('=')[1].split("&")[0];
        const id = window.location.search.split('=')[2];
        setResultadoId(id);
        setResultadoMidia(tipoDaMidia);
        const pegarDetalhesDoTitulo = async () => {
            const API_KEY = '6cab2673c87af7cea093eb14c8a77328';
            const BASE_URL = 'https://api.themoviedb.org/3';
            const response = await fetch(`${BASE_URL}/movie/${id.trim(" ")}?api_key=${API_KEY}&external_source=imdb_id&language=pt-BR`);
            const responseAvaliacoes = await fetch(`${BASE_URL}/${tipoDaMidia}/${id}/reviews?api_key=${API_KEY}`);
            const responseSemelhantes = await fetch(`${BASE_URL}/${tipoDaMidia}/${id}/recommendations?api_key=${API_KEY}&language=pt-BR&page=1`);

            const data = await response.json();
            const dataAvaliacoes = await responseAvaliacoes.json();
            const dataSemelhantes = await responseSemelhantes.json();
            setTituloAvaliacoes(dataAvaliacoes)
            setDetalhesDoTitulo([data]);
            setTitulosSemelhantes(dataSemelhantes.results);

            console.log(data);
        }
        pegarDetalhesDoTitulo();
    }, []);

    return (
        <>
            <HeaderComponent />

            <div className="text-white max-w-screen-lg mx-auto p-5">
                {/* <ComponenteDetalhesDoTitulo valor={DetalhesDoTitulo} nomeDaSessao="Detalhes" /> */}

                {detalhesDoTitulo.length > 0 ? (
                    detalhesDoTitulo.map((movie, index) => {
                        return (
                            <div key={index} className="flex flex-col">

                                {/* Aqui fica a seção de mídias do titulo, imagens, posts e trailers */}
                                <section>
                                    <ComponenteTituloMidias valor={movie} tituloID={resultadoId} tituloMidiaTipo={resultadoMidia} />
                                </section>

                                <section>
                                    {/* Este é o componente que contém Informações refente ao titulo atual, sendo elas sinopse, 
                                nome, ano de Lançamento e etc... */}

                                    <div>
                                        <ComponenteTituloInformacoes valor={movie} />
                                    </div>


                                    {/* Este é o componente de avaliações do titulo atual */}

                                    <div>
                                        <AvaliacoesComponente valor={tituloAvaliacoes} />
                                    </div>

                                    {/* Neste componente fica títulos semelhantes ao tituto atual */}

                                    <div>
                                        <ComponenteTitulosSemelhantes valor={titulosSemelhantes} />
                                    </div>
                                </section>
                            </div>

                        )
                    })
                ) : []}
            </div>
        </>
    );
}

export default PaginaDetalhadaDosItens;