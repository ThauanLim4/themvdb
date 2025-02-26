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
    const { id } = await request.json();

    if (!id) {
        return new Response(JSON.stringify({ error: "id é necessário" }), { status: 400 });
    }
    try {
        const usuario = await prisma.user.create({
            data: {
                favoritedTitles: id
            }
        });
        return new Response(JSON.stringify({ message: "Titulo adicionado com sucesso", usuario, status: 200 }));
    } catch (error) {
        return new Response(JSON.stringify({ error: "Erro ao adicionar o titulo nos favoritos " + id }), { status: 500 });
    }
}

