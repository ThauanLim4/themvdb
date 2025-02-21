import Link from 'next/link'
import React from 'react'

const Logar = () => {
    return (
        <div className='text-branco'>
            <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div class="mx-auto max-w-lg text-center">
                    <h1 class="text-2xl font-bold sm:text-3xl">Vamos começar com login?</h1>
                    <p class="mt-4">
                        Faça login com a sua conta para que você possa adicionar filmes e séries a sua lista de desejos e conhecer mais sobre seus filmes e séries preferidos!
                    </p>
                </div>

                <form class="mx-auto mb-0 mt-8 max-w-md space-y-4" action="#">
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
                            Ainda não tem conta?
                            <Link href={`/pages/criar_conta`}class="underline ml-1">Crie já!</Link>
                        </p>
                        <button
                            class="inline-block rounded-lg bg-laranja px-5 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
                            type="submit"
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