import React, { useState } from 'react'
import { countryList } from '../code.js'
import '../App.css'

const CurrencyForm = () => {
    const [fromCountryCode, setFromCountryCode] = useState('US')
    const [toCountryCode, setToCountryCode] = useState('IN')
    const [fromSelected, setFormSelected] = useState('USD')
    const [toSelected, setToSelected] = useState('INR')
    const [amount, setAmount] = useState(0)
    const [errorMsg, setErrorMsg] = useState('')
    const [finalResult, setFinalResult] = useState('')
    const [loading, setLoading] = useState(false)

    function currencyConversion() {
        if (amount === '' || amount < 1) {
            setErrorMsg('Please enter a valid amount.');
            return; // Exit early if input is invalid
        }
    
        setErrorMsg(''); // Clear any previous error messages
        setLoading(true); // Start loading before fetching data
    
        fetch(`https://v6.exchangerate-api.com/v6/5d7702e7fa94b9672dc3d584/pair/${fromSelected}/${toSelected}/${amount}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch data from API');
                }
                return res.json();
            })
            .then((data) => {
                setFinalResult(`${amount} ${fromSelected} = ${data.conversion_result} ${toSelected}`);
            })
            .catch((error) => {
                console.error('Error fetching currency data:', error);
                // setErrorMsg('Something went wrong. Please try again.');
            })
            .finally(() => {
                setLoading(false); // Ensure loading is reset regardless of success or failure
            });
    }
    
    return (
        <section className="currency-converter-container">
            <h1 className='heading'>Currency Converter</h1>
            <form>
                <div className="input-container">
                    <label htmlFor='input'>Amount:</label>
                    <input type="number" id='input' placeholder="Enter Amount" value={amount} onChange={(e) => {
                        if (e.target.value > 0) { setErrorMsg('') }
                        setAmount(e.target.value)
                    }} />
                </div>
                <div className="error-msg">
                    <span>{errorMsg}</span>
                </div>
                <div className="selects-container">
                    <div className="select-title">
                        From:
                        <div className="select-box">
                            <img src={`https://flagsapi.com/${fromCountryCode}/shiny/64.png`} />
                            <select name="from" value={fromSelected} onChange={(e) => {
                                setFromCountryCode(countryList[e.target.value])
                                setFormSelected(e.target.value)

                            }}>
                                {
                                    Object.keys(countryList).map((code) => {
                                        return <option key={code} value={code}>{code}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="swap" onClick={() => {
                        setFormSelected(toSelected)
                        setToSelected(fromSelected)
                        setFromCountryCode(toCountryCode)
                        setToCountryCode(fromCountryCode)
                    }}>
                        <i className="fa-solid fa-right-left"></i>
                    </div>
                    <div className="select-title">
                        To:
                        <div className="select-box">
                            <img src={`https://flagsapi.com/${toCountryCode}/shiny/64.png`} />
                            <select name='to' value={toSelected} onChange={(e) => {
                                setToCountryCode(countryList[e.target.value])
                                setToSelected(e.target.value)
                            }} >
                                {
                                    Object.keys(countryList).map((code) =>
                                        <option key={code} value={code} >{code}</option>)
                                }
                            </select>
                        </div>
                    </div>
                </div>

                <div className="btn-box">
                    <button id="myBtn" onClick={(e) => {
                        e.preventDefault()
                        currencyConversion()
                    }} disabled={loading} >{loading ? 'Converting...' : 'Get Exchange Rate'}</button>
                </div>
                
                <div className="result">
                    {finalResult && (<span>{finalResult}</span>)}
                </div>
            </form>
        </section>
    )
}

export default CurrencyForm
