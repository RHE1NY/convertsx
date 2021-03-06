import React, {useEffect, useState} from 'react';
import {ICash, IData, IHistory} from "./types/types";
import axios from "axios";
import CurrencySelector from "./components/currencySelector/currencySelector";
import './main.scss'
import Loader from "./components/loader/loader";
import {useDispatch, useSelector} from "react-redux";
import {getCurrencies, getHistory} from "./store/selectors/converterSelectors";
import {getAllCurrencies, setNewHistoryItem} from "./store/actions/converterActions";

function App() {
    const currencies: string[] = useSelector(getCurrencies)
    const [fromCurrency, setFromCurrency] = useState<string>('');
    const [toCurrency, setToCurrency] = useState<string>('');
    const [cashBeforeConvert, setCashBeforeConvert] = useState<number>(1);
    const [cashAfterConvert, setCashAfterConvert] = useState<number>(0);
    const [loader, setLoader] = useState<boolean>(false);
    const historyOps: IHistory[] = useSelector(getHistory);
    const dispatch = useDispatch();

    useEffect(() => {
        if (currencies.length) {
            setFromCurrency(currencies[0])
            setToCurrency(currencies[1])
        }
    }, [currencies])

    function fetchValues() {
        dispatch(getAllCurrencies())
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
                dispatch(setNewHistoryItem({
                    fromCurrency: fromCurrency,
                    fromCash: cashBeforeConvert,
                    toCurrency: toCurrency,
                    toCash: res.data.amount
                }))
            })
        }


useEffect( ()=> {
    fetchValues()
}, [])

    return (
    <div>
        <div className="currency-convertor-form">
            <div className={'form-converter'}>
                <div className={'form-side'}>
                    <div className={'form-label'}>?????????????? ????????????:</div>
                    <input type="number"
                           id={'from-currency'}
                           value={cashBeforeConvert}
                           onChange={(e) => setCashBeforeConvert(Number(e.target.value))}
                           placeholder="?????????????? ????????????????"
                    />
      <CurrencySelector
          values={currencies}
          selectedCurrency={fromCurrency}
          changeCurrency={event => setFromCurrency(event.target.value)}

      />
                </div>
                    <div className={'form-side'}>
                        <div className={'form-label'}>???????????????? ???????????? ?????? ????????????:</div>
                        <CurrencySelector
                            values={currencies}
                            selectedCurrency={toCurrency}
                            changeCurrency={event => setToCurrency(event.target.value)}
                        /> </div>
                    </div>
            <button className="convert-btn" onClick={convertCurrency}>????????????????????????????</button></div>
        {loader
            ? <div className={"loaderDiv"}><Loader loader={loader}/></div>
            :
            !!cashAfterConvert && <div className={'convert-result'}>
                <span> ??????????????????: {cashAfterConvert} </span>
            </div>
        }

        <div className={"form-label"}>?????????????? ??????????????????????</div>
        <div className={"formach"}>

        {historyOps.map( item => <div className={"options"}>
                <label className={"from"}>{item.fromCash}</label><label> {item.fromCurrency}</label>  <label  className={"from"}> IN {item.toCurrency}</label><label  className={"from"}>{item.toCash}</label>
        </div>
        )}
        {historyOps.length!==0
            ? <label></label>
            : <h1>???????????????? ?????? ????</h1>
        }
        </div>

    </div>
  );
}

export default App;
