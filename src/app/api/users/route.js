import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const usuarios = await prisma.user.findMany();
        return new Response(JSON.stringify(usuarios), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Erro ao buscar usuários" }), { status: 500 });
    }
}
export async function POST(request) {
    const { nome, email, senha } = await request.json();

    if (!nome || !email || !senha) {
        return new Response(JSON.stringify({ error: "Nome, email e senha são obrigatórios" }), { status: 400 });
    }
    try {
        const usuario = await prisma.user.create({
            data: {
                name: nome,
                email: email,
                password: senha
            }
        });
        return new Response(JSON.stringify({ message: "Usuário adicionado com sucesso", usuario, status: 200 }));
    } catch (error) {
        return new Response(JSON.stringify({ error: "Erro ao adicionar usuário" }), { status: 500 });
    }
}
