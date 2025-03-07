import { FaStar } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { useEffect, useState } from "react";

export const AvaliacoesComponente = ({ valor, tituloMidiaTipo, tituloID }) => {
    const [textoCompleto, setTextoCompleto] = useState(true);
    const [tituloAvaliacoes, setTituloAvaliacoes] = useState([]);

    useEffect(() => {

        const pegarAvaliacoesTitulo = async () => {
            const API_KEY = '6cab2673c87af7cea093eb14c8a77328';
            const BASE_URL = 'https://api.themoviedb.org/3';
            const responseAvaliacoes = await fetch(`${BASE_URL}/${tituloMidiaTipo}/${tituloID}/reviews?api_key=${API_KEY}`);
            const dataAvaliacoes = await responseAvaliacoes.json();
            setTituloAvaliacoes(dataAvaliacoes);
        }
        pegarAvaliacoesTitulo();
    })

    return (
        <div className="w-full flex flex-col gap-5 border-0 border-t border-preto_claro">
            <h2 className="text-2xl font-semibold text-laranja my-5">Avaliações</h2>
            {tituloAvaliacoes.results?.length > 0 ? (

                tituloAvaliacoes.results?.map((avaliacao, index) => {
                    const dataFormatada = new Date(avaliacao.created_at).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                    });
                    return (
                        <div className="flex flex-col gap-3 bg-preto_escuro p-5 rounded-lg" key={index}>
                            <div className="flex gap-5 items-start">
                                {avaliacao.author_details.avatar_path !== null ? <img src={`https://image.tmdb.org/t/p/w300${avaliacao.author_details.avatar_path}`} className="w-10 h-10 object-cover rounded-full" alt="" /> : <FaCircleUser className="w-10 h-10 text-laranja" />}
                                <span>
                                    <h3>{avaliacao.author}</h3>
                                    <p>{dataFormatada}</p>
                                </span>
                                <p className="flex gap-1 items-center">{avaliacao.author_details.rating !== null ? avaliacao.author_details.rating : "1"}/10 <FaStar className="text-yellow-500 text-sm" /></p>
                            </div>
                            <p>{avaliacao.content.length > 500 && textoCompleto ?
                                (<>
                                    <p>{`${avaliacao.content.substring(0, 490)}...`} <button onClick={() => setTextoCompleto(!textoCompleto)} className="text-laranja hover:text-orange-800" >Ler mais</button></p>

                                </>)
                                : (<p>{avaliacao.content}</p>)}  </p>
                        </div>
                    )
                })
            ) : (
                <p>Não há avaliações para este filme</p>
            )}
        </div>

    )
}