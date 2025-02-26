import { TokenContext } from '@/context/token';
import React, { useContext } from 'react';
import { IoIosAdd } from 'react-icons/io';

export const ComponenteBotaoFavoritos = ({idTitulo}) => {
    console.log(idTitulo)
    const token = useContext(TokenContext);
    const [favoritosDoUsuario, setFavoritosDoUsuario] = useState([]);

    useEffect(() => {
        const pegarUsuarios = async () => {
            try {
                const response = await fetch('/api/users');
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const data = await response.json();
                console.log(data)
                const usuarioInfos = data.find(us => us.token === token)
                setInformacoesDoUsuario(usuarioInfos.favoritedTitles)
            } catch (error) {
                console.log(error);
            }
        }

        pegarUsuarios();
    }, []);

    return (
        <button onClick={() => adicionarALista()} className="w-32 h-7 rounded-lg bg-laranja text-branco text-sm flex justify-center items-center hover:bg-preto_escuro hover:border-2 border-laranja transition-all duration-300">
            Inserir na Lista <IoIosAdd />
        </button>
    )
}
