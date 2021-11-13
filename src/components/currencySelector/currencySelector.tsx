import React, {FC, ReactHTML, SelectHTMLAttributes, useState} from 'react';
import {IData} from "../../types/types";

interface currencyValuesProps {
    values: string[];
    selectedCurrency: string,
    changeCurrency:React.ChangeEventHandler<HTMLSelectElement>
}



const CurrencySelector:FC<currencyValuesProps> = ({values, selectedCurrency, children, changeCurrency }) => {
    return (
        <select value={selectedCurrency} onChange={changeCurrency}>
            {values.map(option => (
                    <option key={option} value={option}>{option}</option>
                )
            )}
        </select>

    );
};

export default CurrencySelector;