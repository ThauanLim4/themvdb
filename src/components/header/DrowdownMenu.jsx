'use client';
import React, { useEffect, useState } from 'react';
import { FaRegUser, FaUser } from "react-icons/fa";
import { VscBookmark } from "react-icons/vsc";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/shadcn/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaUserCircle } from "react-icons/fa";


export const ComponentDropdownMenu = ({ token }) => {
    const router = useRouter();
    const [fazerLogoff, setFazerLogoff] = useState(false);
    const [userInfos, setUserInfos] = useState({});

    useEffect(() => {
        if (fazerLogoff) {
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.location.reload();
        }
        const getUserInfos = async () => {
            try {
                const response = await fetch('/api/users');
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const data = await response.json();
                console.log("data:", data);
                if (data) {
                    const usuarioInfos = data.find(us => us.token === token);
                    console.log("retorno do dropdown:", usuarioInfos)
                    setUserInfos(usuarioInfos);
                }
            } catch (error) {
                console.log(error);
            }
        }

        getUserInfos();
    }, [token, fazerLogoff]);

    return (
        <>
            <Sheet>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <li className="hover:text-laranja transition-all duration-300 cursor-pointer">
                            {token ? <FaUser className="text-xl text-laranja" /> : <FaRegUser className="text-xl" />}
                        </li>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-preto_escuro text-branco border border-black">
                        <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>

                        <DropdownMenuSeparator />
                        {token
                            ? (<DropdownMenuItem className="hover:bg-laranja hover:text-black">
                                <SheetTrigger>perfil</SheetTrigger>
                            </DropdownMenuItem>)

                            : (<Link href={"pages/logar"}>
                                <DropdownMenuItem className="hover:bg-laranja hover:text-black">Perfil</DropdownMenuItem>
                            </Link>)}
                        {token
                            ? <Link href={`pages/favoritos?token=${token}`}>
                                <DropdownMenuItem className="hover:bg-laranja hover:text-black">Favoritos</DropdownMenuItem>
                            </Link>
                            : <Link href={`pages/logar`}>
                                <DropdownMenuItem className="hover:bg-laranja hover:text-black">Favoritos</DropdownMenuItem>
                            </Link>}
                        <DropdownMenuItem onClick={() => setFazerLogoff(true)}>Sair</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>


                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Perfil</SheetTitle>
                        <SheetDescription className={'flex max-sm:flex-col items-center gap-5'}>
                            <div className='w-80 h-80 rounded-full bg-laranja flex items-center justify-center'>
                                <FaUserCircle className='text-9xl text-preto_escuro w-full border border-laranja rounded-full max-w-20 max-h-20' />
                            </div>
                            <span className='flex flex-col gap-1 justify-start max-sm:text-center text-start'>
                                <h3 className='text-2xl first-letter:uppercase text-laranja font-semibold'>{userInfos?.name}</h3>
                                <p>{userInfos?.email}</p>
                            </span>
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>

        </>

    )
}
