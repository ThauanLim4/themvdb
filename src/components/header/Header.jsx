import Image from "next/image";
import Logo from "../../img/logo.png";
import { IoIosSearch } from "react-icons/io";
import { FaRegUser, FaUser } from "react-icons/fa";
import { VscBookmark } from "react-icons/vsc";

export const HeaderComponent = () => {
    return (
        <div className="flex items-center h-20 bg-preto_escuro text-branco max-h-12 border-b-2 border-black">
            <div className="max-w-screen-2xl mx-auto px-5 w-full flex items-center">
                <h1 className="flex items-center w-full text-xl"><Image src={Logo} width={25} height={25} alt="logo"/> TheMovieDB</h1>
            </div>
            <div className="px-5">
                <ul className="flex items-center gap-5">
                    <li className="hover:text-laranja transition-all duration-300 cursor-pointer"><IoIosSearch className="text-xl" /></li>
                    <li className="hover:text-laranja transition-all duration-300 cursor-pointer"><VscBookmark className="text-xl" /></li>
                    <li className="hover:text-laranja transition-all duration-300 cursor-pointer"><FaRegUser className="text-xl" /></li>
                </ul>
            </div>
        </div>
    );
};