"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const CriarConta = () => {
    const [token, setToken] = useState('');
    useEffect(() => {
        const criarUsuario = async () => {
            const API_KEY = '6cab2673c87af7cea093eb14c8a77328';
            const BASE_URL = 'https://api.themoviedb.org/3';
            // https://www.themoviedb.org/authenticate/{REQUEST_TOKEN}?redirect_to=https://www.themoviedb.org/approved?request_token={REQUEST_TOKEN}
            const response = await fetch(`${BASE_URL}/authentication/token/new?api_key=${API_KEY}`);
            setToken(response.request_token);
            const data = await response.json();
            console.log(data);
        }

        criarUsuario();

    }, [])
    return (
        <div className='text-branco p-5'>
            <div class="px-4 py-16 sm:px-6 lg:px-8 bg-preto_escuro max-w-xl mx-auto rounded-lg shadow-sm shadow-laranja">
                <div class="mx-auto max-w-lg text-center">
                    <h1 class="text-2xl font-bold sm:text-3xl">Vamos começar criando sua conta?</h1>
                    <p class="mt-4">
                        Faça login com a sua conta para que você possa adicionar filmes e séries a sua lista de desejos e conhecer mais sobre seus filmes e séries preferidos!
                    </p>
                </div>

                <form class="mx-auto mb-0 mt-8 max-w-md space-y-4" action="#">
                    <div>
                        <label class="sr-only" for="name">Nome de usuário</label>
                        <div class="relative">
                            <input
                                placeholder="Seu nome"
                                class="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
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
                                placeholder="Seu email"
                                class="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
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
                                placeholder="Sua senha"
                                class="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
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

                    <div class="flex items-center justify-between">
                        <p class="text-sm">
                            Já tem conta?
                            <Link href={`pages/logar`} class="underline ml-1">entre já!</Link>
                        </p>
                        <button
                            class="inline-block rounded-lg bg-laranja px-5 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
                            type="submit"
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