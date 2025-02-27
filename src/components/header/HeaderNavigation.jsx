import React from 'react';
import { useRouter } from 'next/navigation';
import { FaChevronLeft, FaHome } from 'react-icons/fa';
import { IoHome } from "react-icons/io5";

export const ComponentHeaderNavigation = ({ sessionName }) => {
    const router = useRouter();

    return (
        <div className='bg-preto_escuro'>
            <div className='flex items-center justify-between text-branco h-12 max-h-12 p-5 relative max-w-screen-lg mx-auto'>
                <button className='absolute left-4' onClick={() => router.back()}><FaChevronLeft /></button>
                <h2 className='mx-auto text-lg font-semibold'>{sessionName}</h2>
                <button className='absolute right-5' onClick={() => router.push('/')}><IoHome /></button>
            </div>
        </div>
    )
}
