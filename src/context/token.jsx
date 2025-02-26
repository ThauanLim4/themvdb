import React, { createContext, useContext, useState } from 'react';

export const TokenContext = createContext();

export const useToken = () => {
    return useContext(TokenContext);
};