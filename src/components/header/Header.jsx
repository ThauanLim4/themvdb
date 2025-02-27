"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { use, useContext, useState } from "react";
import Logo from "../../img/logo.png";
import { IoIosSearch } from "react-icons/io";
import { FaRegUser, FaUser } from "react-icons/fa";
import { VscBookmark } from "react-icons/vsc";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TokenContext } from "@/context/token";


export const HeaderComponent = () => {
    const [inputFocus, setInputFocus] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const router = useRouter();
    const token = useContext(TokenContext);

    return (
        <div className="flex items-center justify-center h-20 bg-preto_escuro text-branco max-h-12 border-b-2 border-black">
            <div className="flex items-center justify-between w-full max-w-screen-xl">
                <div className="px-5 flex items-center">
                    <Link href={"/"} className="flex items-center w-full text-xl"><Image src={Logo} width={25} height={25} alt="logo" /> TheMovieDB</Link>
                </div>
                <div className="px-5 w-full flex justify-self-end">
                    <ul className="flex items-center gap-5 w-full justify-end">
                        <li className="w-full max-w-md">
                            <form onSubmit={() => router.push(`/pages/busca?resultado=${searchValue}`)} className={`hover:text-laranja transition-all duration-300 cursor-pointer h-full max-h-6 flex items-center border ${inputFocus ? "border-laranja" : ""} gap-2 p-2 rounded-md `}>
                                <input onSubmit={e => console.log(e)} onFocus={() => setInputFocus(true)} onBlur={() => setInputFocus(false)} className="outline-none w-full bg-transparent focus:border-laranja placeholder:text-verdeescuro" type="text" name="search" onChange={e => setSearchValue(e.target.value)} placeholder="Pesquisar" />
                                <IoIosSearch className="text-xl" />
                            </form>
                        </li>
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
                                        Perfil
                                    </DropdownMenuItem>)
                                    : (<Link href={"pages/logar"}>
                                        <DropdownMenuItem className="hover:bg-laranja hover:text-black">Perfil</DropdownMenuItem>
                                    </Link>)}
                                <Link href={`pages/favoritos?token=${token}`}>
                                    <DropdownMenuItem className="hover:bg-laranja hover:text-black">Favoritos</DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem>Sair</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </ul>
                </div>
            </div>
        </div>
    );
};