import React, {useCallback, useState} from 'react';
import {ComboBox} from './Components/ComboBox';
import {initialFiat, initialCrypto, initialBanks, initialAggregators} from './constants';
import './App.scss';
import {Inputs} from './Components/Inputs';
import {Aggregator} from "./Components/Aggreagtor";
import {LogoHeading} from "./Components/LogoHeading";
import {ResetSetButtons} from "./Components/ResetSetButtons";

function App() {
    const [isActive1, setIsActive1] = useState(false);
    const [isActive2, setIsActive2] = useState(false);
    const [banks, setBanks] = useState(initialBanks);
    const [banks1, setBanks1] = useState(initialBanks);
    const [fiat, setFiat] = useState(initialFiat);
    const [crypto, setCrypto] = useState(initialCrypto);
    const [cryptoAggregators, setCryptoAggregators] = useState(initialAggregators);
    const [cryptoAggregators1, setCryptoAggregators1] = useState(initialAggregators);
    const [makerTaker, setMakerTaker] = useState('Мейкер');
    const [makerTaker1, setMakerTaker1] = useState('Мейкер');
    const [deposit, setDeposit] = useState<number>();
    const [spreadFrom, setSpreadFrom] = useState<number>();
    const [spreadTo, setSpreadTo] = useState<number>();

    const handleIsActive = useCallback((index: number) => {
        if (index === 0) {
            setIsActive1(true);
            setIsActive2(false)
        } else {
            setIsActive2(true);
            setIsActive1(false);
        }
    },[setIsActive1, setIsActive2]);

    const handleClick = useCallback(
        (selected: boolean, index: number, type: 'bank' | 'crypto', aggreg: 'aggreg1' | 'aggreg2') => {
        if (type === 'bank' && aggreg === 'aggreg1') {
            setBanks((prev) =>
                prev.map((bank, i) => {
                    if (i !== index) {
                        return bank;
                    }
                    const temp = Object.assign({}, bank, { selected: selected});
                    return temp;
                })
            );
        } else if (type === 'bank' && aggreg === 'aggreg2') {
            setBanks1((prev) =>
                prev.map((bank, i) => {
                    if (i !== index) {
                        return bank;
                    }
                    const temp = Object.assign({}, bank, { selected: selected});
                    return temp;
                })
            );
        } else if(type === 'crypto' && aggreg === 'aggreg1') {
            setCryptoAggregators((prev) =>
                prev.map((cryptoAggregator, i) => {
                    if (i !== index) {
                        return cryptoAggregator;
                    }
                    const temp = Object.assign({}, cryptoAggregator, { selected: selected});
                    return temp;
                })
            );
        } else if(type === 'crypto' && aggreg === 'aggreg2') {
            setCryptoAggregators1((prev) =>
                prev.map((cryptoAggregator, i) => {
                    if (i !== index) {
                        return cryptoAggregator;
                    }
                    const temp = Object.assign({}, cryptoAggregator, { selected: selected});
                    return temp;
                })
            );
        }
    },[setBanks, setCryptoAggregators, setBanks1, setCryptoAggregators1]);

    const handleClickCombo = useCallback(
        (type: 'crypto' | 'fiat' | 'buy-sell', value: string, isActive: boolean, aggreg?: 'aggreg1' | 'aggreg2') => {
            if(type === 'crypto') {
                setCrypto(crypto.map((p) =>
                    p.value === value
                        ? { ...p, selected: isActive }
                        : p
                ));
            } else if(type === 'fiat') {
                setFiat(fiat.map((p) =>
                    p.value === value
                        ? { ...p, selected: isActive }
                        : p
                ));
            } else if(type === 'buy-sell') {
                if(aggreg === 'aggreg1') {
                    setMakerTaker(value);
                }
                if(aggreg === 'aggreg2') {
                    setMakerTaker1(value);
                }
            }
        },
        [setMakerTaker, setMakerTaker1, crypto, fiat, setFiat, setCrypto]
    );

    const handleInputChange = useCallback((value: string, type: "deposit" | "spread_from" | "spread_to") => {
        if (type === 'deposit') {
            setDeposit(Number(value));
        } else if (type === 'spread_from') {
            setSpreadFrom(Number(value));
        } else if (type === 'spread_to') {
            setSpreadTo(Number(value));
        }
    }, [setDeposit, setSpreadFrom, setSpreadTo]);

    const handleResetClick = useCallback(() => {
        setBanks(initialBanks);
        setBanks1(initialBanks);
        setCryptoAggregators(initialAggregators);
        setCryptoAggregators1(initialAggregators);
        setMakerTaker('Мейкер');
        setMakerTaker1('Мейкер');
        setFiat(initialFiat);
        setCrypto(initialCrypto);
        setDeposit(0);
        setSpreadFrom(0);
        setSpreadTo(0);
    }, [setCryptoAggregators, setCryptoAggregators1, setMakerTaker, setMakerTaker1,
        setFiat, setCrypto, setDeposit, setSpreadFrom, setSpreadTo]);

    const handleSaveClick = useCallback(() => {
        if(!cryptoAggregators.find(e => e.selected)) {
            alert('Пожалуйста выберите первую биржу');
        } else if(!cryptoAggregators1.find(e => e.selected)) {
            alert('Пожалуйста выберите вторую биржу');
        } else if(!fiat.find(e => e.selected)) {
            alert('Пожалуйста выберите фиат');
        } else if(!crypto.find(e => e.selected)) {
            alert('Пожалуйста выберите криптовалюту');
        } else if(Number.isNaN(deposit) || deposit === undefined || deposit < 1) {
            alert('Пожалуйста заполните депозит числом больше 0');
        } else if(Number.isNaN(spreadFrom) || spreadFrom === undefined || spreadFrom < 1) {
            alert('Пожалуйста заполните спред от числом больше 0');
        } else if(Number.isNaN(spreadTo) || spreadTo === undefined || spreadTo < 1) {
            alert('Пожалуйста заполните спред до числом больше 0');
        } else if(spreadFrom >= spreadTo) {
            alert('Спред до должен превышать спред от');
        } else {
            console.log(makerTaker, makerTaker1)
            alert('saved');
        }
    },[cryptoAggregators, cryptoAggregators1, fiat, crypto,
        deposit, spreadFrom, spreadTo, makerTaker, makerTaker1]);

    return (
    <div className="App">
        <LogoHeading />
        <p className="label">Фиат</p>
        <ComboBox values={fiat} className={'fiat'} type={'fiat'} onClick={handleClickCombo}/>
        <p className="label">Криптовалюта</p>
        <ComboBox values={crypto} className={'crypto'} type={'crypto'} onClick={handleClickCombo}/>
        <Inputs onChange={handleInputChange} deposit={deposit} spreadFrom={spreadFrom} spreadTo={spreadTo}></Inputs>
        <Aggregator
            label={'aggreg1'}
            active={isActive1}
            onClick={handleIsActive}
            onClickItem={handleClick}
            banks={banks}
            index={0}
            cryptoAggregators={cryptoAggregators}
            onClickCombo={handleClickCombo}
        ></Aggregator>
        <Aggregator
            label={'aggreg2'}
            active={isActive2}
            onClick={handleIsActive}
            onClickItem={handleClick}
            banks={banks1}
            index={1}
            onClickCombo={handleClickCombo}
            cryptoAggregators={cryptoAggregators1}
        ></Aggregator>
        <ResetSetButtons onClickReset={handleResetClick} onClickSave={handleSaveClick}></ResetSetButtons>
        <button className="return">Вернуться назад</button>
    </div>
    );
}

export default App;
