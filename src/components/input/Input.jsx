import React, { useState } from 'react'

export const InputComponente = ({value, valuePlaceholder}) => {
    const [value, setValue] = useState('');

    return (
        <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={valuePlaceholder}
            class="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-preto_escuro"
            id={value}
            type={value}
        />

    )
}
