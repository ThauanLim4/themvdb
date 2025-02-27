import React from 'react'

export const ComponentLoading = () => {
    return (
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <div class="flex flex-row gap-2">
                <div class="w-4 h-4 rounded-full bg-laranja animate-bounce"></div>
                <div
                    class="w-4 h-4 rounded-full bg-laranja animate-bounce [animation-delay:-.3s]"
                ></div>
                <div
                    class="w-4 h-4 rounded-full bg-laranja animate-bounce [animation-delay:-.5s]"
                ></div>
            </div>
        </div>
    )
}
