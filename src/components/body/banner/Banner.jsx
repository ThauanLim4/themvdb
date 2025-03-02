import React from 'react';
import banner from "@/../public/banner.jpg";
import Image from 'next/image';

export const Banner = () => {
  return (
    <div className='max-w-screen-xl mx-auto max-sm:min-h-52 min-h-96 relative flex items-start '>
        <Image fill className='w-full h-full object-cover max-sm:object-left max-md:object-left absolute top-0 left-0 right-0' src={banner} alt="Banner" />
    </div>
  )
}
