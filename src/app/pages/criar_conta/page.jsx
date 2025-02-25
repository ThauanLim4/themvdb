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
} from "@/components/ui/dialog"
import { ChevronRight, ChevronsRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CriarConta = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const router = useRouter();

    const [createdUserSuccessfull, setCreatedUserSuccessfull] = useState(false);

    const [successMensage, setSuccessMensage] = useState('');
    const [erroMensage, setErroMensage] = useState('');


    const criarConta = async () => {
        console.log("nome: ", nome, "email", email, "senha:", senha)
        const emailReg = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");

        if(email.length === 0 && senha.length === 0 && nome.length === 0) {
            setErroMensage("Campo(s) não pode(m) estar vazio(s)");
            return;
        }

        if (!emailReg.test(email)) {
            setErroMensage("email inválido!");
            return;
        }

        try {
            setErroMensage('');
            const response = await fetch('/api/users/', {
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
                console.log(data.message, data.status);
                setCreatedUserSuccessfull(true)
            }
        } catch (error) {
            console.log(error, "deu o caralho");
        }
    }

    return (
        <div className='text-branco p-5'>
            <div class="px-4 py-16 sm:px-6 lg:px-8 bg-preto_escuro max-w-xl mx-auto rounded-lg shadow-sm shadow-laranja">
                <div class="mx-auto max-w-lg text-center">
                    <h1 class="text-2xl font-bold sm:text-3xl">Vamos começar criando sua conta?</h1>
                    <p class="mt-4">
                        Faça login com a sua conta para que você possa adicionar filmes e séries a sua lista de desejos e conhecer mais sobre seus filmes e séries preferidos!
                    </p>
                </div>

                <form class="mx-auto mb-0 mt-8 max-w-md space-y-4" action="#" method="POST" onSubmit={(e) => e.preventDefault()}>
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
                                <svg
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    class="h-6 w-6 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                                        stroke-width="2"
                                        stroke-linejoin="round"
                                        stroke-linecap="round"
                                    ></path>
                                </svg>
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
                                <svg
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    class="h-6 w-6 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                        stroke-width="2"
                                        stroke-linejoin="round"
                                        stroke-linecap="round"
                                    ></path>
                                </svg>
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
                                <svg
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    class="h-6 w-6 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        stroke-width="2"
                                        stroke-linejoin="round"
                                        stroke-linecap="round"
                                    ></path>
                                    <path
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        stroke-width="2"
                                        stroke-linejoin="round"
                                        stroke-linecap="round"
                                    ></path>
                                </svg>
                            </span>
                        </div>
                    </div>

                    <Dialog open={createdUserSuccessfull} onOpenChange={setCreatedUserSuccessfull}>
                        <DialogContent className="bg-black/50 border-preto_claro text-branco">
                            <DialogHeader>
                                <DialogTitle className="text-green-500 mb-5">Usuário criado com sucesso!</DialogTitle>
                                <DialogDescription>
                                    <Link href={"/pages/logar"} className='flex items-center justify-center bg-laranja text-branco rounded-lg px-5 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 max-w-44 mx-auto'>
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
                            <Link href={`pages/logar`} class="underline ml-1">entre já!</Link>
                        </p>
                        <button
                            class="inline-block rounded-lg bg-laranja px-5 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
                            onClick={() => criarConta()}
                        >
                            Criar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CriarConta;