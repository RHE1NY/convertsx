export interface IData {
    base:string;
    date:string,
    rates:string[]
}
export interface ICash {
    fromCurrency: string,
    toCurrency: string,
    cashBeforeConvert: number,
    amount: number
}

export interface IHistory {
    fromCurrency: string,
    toCurrency: string,
    fromCash: string,
    toCash: number
}