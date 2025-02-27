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
    const { idTitulo, idUser } = await request.json();
    
    if (!idTitulo || !idUser) {
        return new Response(JSON.stringify({ error: "id é necessário" }), { status: 400 });
    }
    try {
        console.log("entrou no try", idTitulo)
        const usuario = await prisma.user.update({
            where: {id: idUser},
            data: {
                favoritedTitles: {
                    push: [idTitulo]
                }
            }
        });
        return new Response(JSON.stringify({ message: "Titulo adicionado com sucesso", usuario, status: 200 }));
    } catch (error) {
        return new Response(JSON.stringify({ error: "Erro ao adicionar o titulo nos favoritos " + error }), { status: 500 });
    }
}

