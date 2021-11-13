import React, {useEffect, useState} from 'react';
import {ICash, IData, IHistory} from "./types/types";
import axios from "axios";
import CurrencySelector from "./components/currencySelector/currencySelector";
import ConvertorForm from "./components/ConvertorForm/convertorForm";
import './main.scss'
import Loader from "./components/loader/loader";
import set = Reflect.set;

function App() {
    const [currencies, setCurrencies] = useState<string[]>([]);
    const [fromCurrency, setFromCurrency] = useState<string>('');
    const [toCurrency, setToCurrency] = useState<string>('');
    const [cashBeforeConvert, setCashBeforeConvert] = useState<string>('');
    const [cashAfterConvert, setCashAfterConvert] = useState<number>(0);
    const [loader, setLoader] = useState<boolean>(false);
    const [historyOps, setHistoryOps] = useState<IHistory[]>([]);

    async function fetchValues() {
        try {
          const response =  await axios.get<IData>(`http://api.exchangeratesapi.io/v1/latest?access_key=8c96993af73a5fadaa9832458d1235a9`)
                setCurrencies(Object.keys(response.data.rates))

        } catch (e) {
            console.log(e);
        }
    }
        async function convertCurrency() {
            setLoader(true);
            await axios.get<ICash>(`https://api.m3o.com/v1/currency/Convert?from=${fromCurrency}&to=${toCurrency}&amount=${cashBeforeConvert}`, {
                headers: {
                    'Authorization': 'Bearer NDE0ZTlkN2EtNzY1Ny00MmI2LWExYjAtMzQxMjQ2OWMwNTc4',
                }
            }).then(res => {
                res.data.amount && setCashAfterConvert(res.data.amount)
                setLoader(false);
            })
            setHistoryOps([{
                fromCurrency: fromCurrency,
                fromCash: cashBeforeConvert,
                toCurrency: toCurrency,
                toCash: cashAfterConvert
            }, ...historyOps])

        }


useEffect( ()=> {
    fetchValues()
}, [])

    return (
    <div>
        <div className="currency-convertor-form">
            <div className={'form-converter'}>
                <div className={'form-side'}>
                    <div className={'form-label'}>Текущая валюта:</div>
                    <input type="number"
                           id={'from-currency'}
                           value={cashBeforeConvert}
                           onChange={(e) => setCashBeforeConvert(e.target.value)}
                           placeholder="Введите значение"
                    />
      <CurrencySelector
          values={currencies}
          selectedCurrency={fromCurrency}
          changeCurrency={event => setFromCurrency(event.target.value)}

      />
                </div>
                    <div className={'form-side'}>
                        <div className={'form-label'}>Выберите валюту для обмена:</div>
                        <CurrencySelector
                            values={currencies}
                            selectedCurrency={toCurrency}
                            changeCurrency={event => setToCurrency(event.target.value)}
                        /> </div>
                    </div>
            <button className="convert-btn" onClick={convertCurrency}>Конвертировать</button></div>
        {loader
            ? <div className={"loaderDiv"}><Loader loader={loader}/></div>
            :
            !!cashAfterConvert && <div className={'convert-result'}>
                <span> Результат: {cashAfterConvert} </span>
            </div>
        }

        <div className={"form-label"}>История конвертаций</div>
        <div className={"formach"}>

        {historyOps.map( item => <div className={"options"}>
                <label className={"from"}>{item.fromCash}</label><label> {item.fromCurrency}</label>  <label  className={"from"}> IN {item.toCurrency}</label><label  className={"from"}>{item.toCash}</label>
        </div>
        )}
        {historyOps.length!==0
            ? <label></label>
            : <h1>Операций еще ма</h1>
        }
        </div>

    </div>
  );
}

export default App;
