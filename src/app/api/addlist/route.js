import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const usuarios = await prisma.user.findMany({
            select: {
                favoritedTitles: true
            }
        });
        return new Response(JSON.stringify(usuarios), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Erro ao buscar usuários" }), { status: 500 });
    }
}

export async function POST(request) {
    const { idTitulo, idUser, tipoMidia } = await request.json();

    if (!idTitulo || !idUser || !tipoMidia) {
        return new Response(JSON.stringify({ error: "id é necessário" }), { status: 400 });
    }
    try {
        console.log("entrou no try", idTitulo)
        const usuario = await prisma.user.update({
            where: { id: idUser },
            data: {
                favoritedTitles: {
                    push: { idTitulo, tipoMidia }
                }
            }
        });
        return new Response(JSON.stringify({ message: "Titulo adicionado com sucesso", usuario, status: 200 }));
    } catch (error) {
        return new Response(JSON.stringify({ error: "Erro ao adicionar o titulo nos favoritos " + error }), { status: 500 });
    }
}

export async function DELETE(request) {
    const { idTitulo, idUser, tipoMidia } = await request.json();

    if (!idTitulo || !idUser || !tipoMidia) {
        return new Response(JSON.stringify({ error: "alguma das informações está faltando ou é inválida" }), { status: 400 });
    }
    try {
        const user = await prisma.user.findUnique({
            where: { id: idUser },
            select: {
                favoritedTitles: true
            }
        });

        if (!user) {
            return new Response(JSON.stringify({ error: "esse usuário não foi encontrado" }), { status: 404 });
        };

        const favoritedTitles = user.favoritedTitles.filter(
            item => item.idTitulo !== idTitulo);

        await prisma.user.update({
            where: { id: idUser },
            data: { favoritedTitles }
        });

        return new Response(JSON.stringify({ message: "Titulo removido com sucesso", favoritedTitles, status: 200 }));
    } catch (error) {
        return new Response(JSON.stringify({ error: "Erro ao remover o titulo nos favoritos " + error }), { status: 500 });
    }
}
