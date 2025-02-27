import React, { useEffect, useState } from 'react';

export const ComponenteItemSkeleton = ({ quantidade }) => {
  return (
    <>
      <div className='flex gap-5'>
        {Array.from({ length: quantidade }).map((_, index) => (
          <div key={index} className="flex flex-col bg-preto_escuro w-56 h-64 animate-pulse rounded-xl gap-4">
            <div className="bg-neutral-400/50 max-w-56 w-full min-h-64 max-h-425 animate-pulse rounded-md"></div>
            <div className="flex flex-col gap-2">
              <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
              <div className="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></div>
              <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>

              <div className='flex justify-between items-center'>
                <div className="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
                <div className="bg-neutral-400/50 w-7 h-4 animate-pulse rounded-md"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export const ComponentItemSkeletonHorizontal = ({ quantidade }) => {
  return (
    <>
      <div className='flex flex-col gap-5'>
        {Array.from({ length: quantidade }).map((_, index) => (
          <div key={index} className="flex flex-col bg-preto_escuro w-56 h-64 animate-pulse rounded-xl gap-4">
            <div className="bg-neutral-400/50 max-w-56 w-full min-h-64 max-h-425 animate-pulse rounded-md"></div>
            <div className="flex flex-col gap-2">
              <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
              <div className="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></div>
              <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>

              <div className='flex justify-between items-center'>
                <div className="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
                <div className="bg-neutral-400/50 w-7 h-4 animate-pulse rounded-md"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

