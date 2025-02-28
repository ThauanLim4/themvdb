"use client";
import React, { useEffect, useState } from 'react';
import { ComponentFormCreateAccount } from '@/components/body/componenteFormulario/FormCreateAccount';

const CriarConta = () => {

    return (
        <div className='text-branco p-5'>
            <div class="px-4 py-16 sm:px-6 lg:px-8 bg-preto_escuro max-w-xl mx-auto rounded-lg shadow-sm shadow-laranja">
                <div class="mx-auto max-w-lg text-center">
                    <h1 class="text-2xl font-bold sm:text-3xl">Vamos começar criando sua conta?</h1>
                    <p class="mt-4">
                        Crie uma conta para que você possa adicionar filmes e séries a sua lista de desejos e conhecer mais sobre seus filmes e séries preferidos!
                    </p>
                </div>

                <ComponentFormCreateAccount />
            </div>
        </div>
    )
}

export default CriarConta;