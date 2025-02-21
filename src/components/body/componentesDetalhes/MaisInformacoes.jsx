export const ComponenteMaisInformacoes = ({ valor, nomeDaSessao }) => {
    console.log("valor retornado: ", valor);

    return (
        <section className="p-5 max-w-screen-xl mx-auto">
            <h2 className="text-2xl font-bold text-laranja">{nomeDaSessao}</h2>
            <div className="flex justify-start overflow-x-auto py-5">
                {valor.length > 0 ? (
                    valor.map((movie, index) => {
                    })
                ) : (
                    <p>Carregando...</p>
                )}
            </div>
        </section>
    );

}