"use client";
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Logar = () => {
    const emailReg = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [userInfos, setUserInfos] = useState([]);
    const router = useRouter();


    const [successMensage, setSuccessMensage] = useState('');
    const [erroMensage, setErroMensage] = useState('');

    useEffect(() => {
        const heandlerGetUsers = async () => {
            try {
                const response = await fetch('/api/users');
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const data = await response.json();
                setUsers(data)
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }

        heandlerGetUsers();
    }, []);

    const heandlerVerifyLogin = () => {
        if (!emailReg.test(email)) {
            console.log('Email inválido');
            return;
        }
        console.log("usuários:", users);

        const findUser = users.find(user => user.password === password && user.email === email);
        console.log(findUser)
        if (findUser) {
            setUserInfos(findUser);
            setSuccessMensage('usuário encontrado!');

            setTimeout(() => {
                router.push("/");
            }, 1000);
        } else {
            console.log("nenhum usuário foi encontrado");
            setErroMensage("usuário não encontrado")
        }
    }

    return (
        <div className='text-branco'>
            <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div class="mx-auto max-w-lg text-center">
                    <h1 class="text-2xl font-bold sm:text-3xl">Vamos começar com login?</h1>
                    <p class="mt-4">
                        Faça login com a sua conta para que você possa adicionar filmes e séries a sua lista de desejos e conhecer mais sobre seus filmes e séries preferidos!
                    </p>
                </div>

                <form class="mx-auto mb-0 mt-8 max-w-md space-y-4" action="#" onSubmit={e => e.preventDefault()}>
                    <div>
                        <label class="sr-only" for="email">Email</label>
                        <div class="relative">
                            <input
                                value={email}
                                placeholder="Seu email"
                                class="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-preto_escuro"
                                id="email"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
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
                                value={password}
                                placeholder="Sua senha"
                                class="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-preto_escuro"
                                id="password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
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

                    <div>
                        <p className='text-green-500/85 font-semibold'>{successMensage}</p>
                        <p className='text-destructive font-semibold'>{erroMensage}</p>
                    </div>

                    <div class="flex items-center justify-between">
                        <p class="text-sm">
                            Ainda não tem conta?
                            <Link href={`/pages/criar_conta`} class="underline ml-1">Crie já!</Link>
                        </p>
                        <button
                            class="inline-block rounded-lg bg-laranja px-5 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
                            type="submit"
                            onClick={() => heandlerVerifyLogin()}
                        >
                            Logar
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Logar