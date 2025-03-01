"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/shadcn/dialog"
import { ChevronRight, ChevronsRight } from 'lucide-react';
import { IoIosKey } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { useRouter } from 'next/navigation';

export const ComponentFormCreateAccount = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [createdUserSuccessfull, setCreatedUserSuccessfull] = useState(false);
    const [successMensage, setSuccessMensage] = useState('');
    const [erroMensage, setErroMensage] = useState('');

    const router = useRouter();
    const criarConta = async () => {
        const emailReg = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");

        if (email.length === 0 || senha.length === 0 || nome.length === 0) {
            setErroMensage("Campo(s) não pode(m) estar vazio(s)");
            return;
        }

        if (!emailReg.test(email)) {
            setErroMensage("Email inválido!");
            return;
        }

        if (senha.length < 4) {
            setErroMensage("A senha precisa de pelo menos 4 caracteres");
            return;
        }

        try {
            setErroMensage('');
            const response = await fetch('/api/users', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ nome, email, senha }),
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json();

            if (data.error) {
                console.log(data.error);
            }

            if (data.status === 200) {
                setCreatedUserSuccessfull(true);
                router.push("/pages/logar")
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form class="mx-auto mb-0 mt-8 max-w-md space-y-4"
            action="#" method="POST" onSubmit={(e) => e.preventDefault()}>
            <div>
                <label class="sr-only" for="name">Nome de usuário</label>
                <div class="relative">
                    <input
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Seu nome"
                        class="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-preto_escuro"
                        id="name"
                        type="name"
                    />
                    <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                        <FaRegUser className='text-preto_escuro text-xl' />
                    </span>
                </div>
            </div>

            <div>
                <label class="sr-only" for="email">Email</label>
                <div class="relative">
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

                        placeholder="Seu email"
                        class="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-preto_escuro"
                        id="email"
                        type="email"
                    />
                    <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                        <MdAlternateEmail className='text-preto_escuro text-xl' />
                    </span>
                </div>
            </div>

            <div>
                <label class="sr-only" for="password">Password</label>
                <div class="relative">
                    <input
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        placeholder="Sua senha"
                        class="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-preto_escuro"
                        id="password"
                        type="password"
                    />
                    <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                        <IoIosKey className='text-preto_escuro text-xl' />
                    </span>
                </div>
            </div>

            <Dialog open={createdUserSuccessfull} onOpenChange={setCreatedUserSuccessfull}>
                <DialogContent className="bg-black/50 border-preto_claro text-branco">
                    <DialogHeader>
                        <DialogTitle className="text-green-500 mb-5 text-center">Usuário criado com sucesso!</DialogTitle>

                        <DialogDescription>
                            <Link href={"/pages/logar"} className='flex items-center justify-center bg-laranja text-preto_escuro hover:bg-transparent hover:text-laranja rounded-lg px-5 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 max-w-44 mx-auto transition-all duration-300 border-2 border-laranja'>
                                Ir para o login <ChevronRight />
                            </Link>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <div>
                <p className='text-green-500/85 font-semibold'>{successMensage}</p>
                <p className='text-destructive font-semibold'>{erroMensage}</p>
            </div>

            <div class="flex items-center justify-between">
                <p class="text-sm">
                    Já tem conta?
                    <Link href={`/pages/logar`} class="underline ml-1">entre já!</Link>
                </p>
                <button
                    class="inline-block min-w-32 rounded-lg bg-laranja text-preto_escuro px-5 py-1 text-sm font-medium hover:bg-transparent hover:text-laranja border-2 border-laranja focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 transition-all duration-300"
                    onClick={() => criarConta()}
                >
                    Criar
                </button>
            </div>
        </form>

    )
}
