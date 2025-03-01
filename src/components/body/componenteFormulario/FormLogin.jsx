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

export const ComponentFormLogin = () => {
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
            setErroMensage('Email inválido');
            return;
        }
        console.log("usuários:", users);

        const findUser = users.find(user => user.password === password && user.email === email);
        console.log(findUser)
        if (findUser) {
            setUserInfos(findUser);
            setSuccessMensage('usuário encontrado!');
            document.cookie = `token=${findUser.token}; path=/;`;
            setTimeout(() => {
                router.push("/");
            }, 1000);
        } else {
            console.log("nenhum usuário foi encontrado");
            setErroMensage("usuário não encontrado")
        }
    }

    return (
        <form class="mx-auto mb-0 mt-8 max-w-md space-y-4" action="#" onSubmit={e => e.preventDefault()}>
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
    )
}
