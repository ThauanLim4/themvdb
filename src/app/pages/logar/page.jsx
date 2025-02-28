"use client";
import { ComponentFormLogin } from '@/components/body/componenteFormulario/FormLogin';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

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
        <div className='text-branco'>
            <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div class="mx-auto max-w-lg text-center">
                    <h1 class="text-2xl font-bold sm:text-3xl">Vamos começar com login?</h1>
                    <p class="mt-4">
                        Faça login com a sua conta para que você possa adicionar filmes e séries a sua lista de desejos e conhecer mais sobre seus filmes e séries preferidos!
                    </p>
                </div>
                <ComponentFormLogin />
            </div>

        </div>
    )
}

export default Logar