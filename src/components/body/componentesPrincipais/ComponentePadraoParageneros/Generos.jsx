import Link from 'next/link';

export const ComponenteGenerosDeFilmes = ({ valor }) => {
    return (
        <section className="p-5 max-w-screen-xl mx-auto">
            <h2 className="text-2xl font-bold text-laranja">Por gênero</h2>
            <div className="flex gap-3 justify-start overflow-x-auto py-5 min-w-full hide-scrollbar">
                <div className='flex flex-wrap gap-5'>
                    {valor.map((genero) => {
                        return (
                            <div key={genero.id}>
                                <Link href={`/pages/generos?genero=${genero.name}&id=${genero.id}`}>
                                    <li className="bg-laranja flex-nowrap px-5 py-2 rounded-lg flex items-center justify-center min-w-fit">
                                        <h3 className="text-black font-semibold flex">{genero.name}</h3>
                                    </li>

                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

