import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const getUser = async () => {
    try {
        const usuarios = await prisma.user.findMany();
        return NextResponse.json(usuarios, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar usuários" }, { status: 500 });
    }
}

const createUser = async (req, res) => {
    if (req.method === "POST") {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ error: "Parâmetros inválidos" });
        }
        try {
            const usuario = await prisma.user.create({
                data: {
                    name: nome,
                    email: email,
                    password: senha
                }
            });
            return res.status(201).json({ message: "Usuário criado com sucesso", usuario });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar usuário" });
        }
    } else {
        res.status(405).json({ error: "Método não permitido" });
    }
}

export { getUser, createUser };