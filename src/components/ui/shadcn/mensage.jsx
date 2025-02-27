import React from 'react'

export const successMensage = ({successMensage}) => {
    return (
        <p className='text-green-500/85 font-semibold'>{successMensage}</p>
    )
}

export const erroMensage = ({erroMensage}) => {
    return (
        <p className='text-destructive font-semibold'>{erroMensage}</p>
    )
}

