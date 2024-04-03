import { useState } from "react"
import axios from "axios"
import { useEffect } from "react"
import Dropdown from "./Dropdown"
import { HiArrowsRightLeft } from "react-icons/hi2"

const Currencyconvertor = () => {
    const [currencies, setCurrencies] = useState([])
    const [amount, setAmount] = useState(1)
    const [fromCurrency, setFromCurrency] = useState("USD")
    const [toCurrency, setToCurrency] = useState("INR")
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [converting, setConverting] = useState(false);
    // Favorites state manages the localstorage to be getItem Default
    const [favorites, setFavorites] = useState(
        JSON.parse(localStorage.getItem("favorites")) || ["INR", "EUR"]
    );

    // http://api.frankfurter.app/currencies
    // `http://api.frankfurter.app/latest?amount=10&from=GBP&to=USD`

    const fetchCurrencies = async () => {
        try {
            const response = await axios.get("http://api.frankfurter.app/currencies");
            const keysData = Object.keys(response.data);
            setCurrencies(keysData)
        } catch (error) {
            console.error(`Error Fetching ${error}`)
        }
    }

    useEffect(() => {
        fetchCurrencies()
    }, [])

    const convertCurrency = async () => {
        if (!amount) return;
        setConverting(true);
        try {
            const response = await axios.get(`http://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
            setConvertedAmount(response.data.rates[toCurrency] + " " + toCurrency);
        } catch (error) {
            console.error(`Error Fetching ${error}`)
        } finally {
            setConverting(false)
        }
    }

    const handleFavorite = (currency) => {
        let updatedFavorites = [...favorites];

        if (favorites.includes(currency)) {
            updatedFavorites = updatedFavorites.filter((fav) => fav !== currency);
        } else {
            updatedFavorites.push(currency);
        }

        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };
    //  Swapping the currency of both
    const SwapCurrency = () => {
        setFromCurrency(toCurrency)
        setToCurrency(fromCurrency)
    }

    const resetInputValue = () => {
        setAmount(1)
    }
    return (

        <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
            {/* Heading Text of Currency Converter */}
            <h2 className="mb-5 text-2xl font-semibold text-gray-700">
                Currency Converter
            </h2>

            {/* Dropdown List */}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <Dropdown
                    currencies={currencies}
                    title="From:"
                    currency={fromCurrency}
                    setCurrency={setFromCurrency}
                    handleFavorite={handleFavorite}
                    favorites={favorites}
                />
                <div className="flex justify-center -mb-5 sm:mb-0">
                    <button
                        onClick={SwapCurrency}
                        className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
                        <HiArrowsRightLeft className="text-xlntext-gray-700" />
                    </button>
                </div>

                <Dropdown
                    currencies={currencies}
                    title="To:"
                    currency={toCurrency}
                    setCurrency={setToCurrency}
                    handleFavorite={handleFavorite}
                    favorites={favorites}
                />
            </div>

            {/* Amount Label and Input Div  */}

            <div className="mt-4">
                <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-gray-700"
                >Amount :</label>
                <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
                />
            </div>

            {/* Convert Button  */}

            <div className="flex justify-end mt-6 space-x-4">
                <div>
                    <button
                        onClick={convertCurrency}
                        className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 
                        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${converting ? "animate-pulse" : ""
                            }`}
                    >
                        Convert
                    </button>
                </div>
                <div>
                    <button
                        onClick={resetInputValue}
                        className={`px-10 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 
                        focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${converting ? "animate-pulse" : ""
                            }`}
                    >
                        Reset
                    </button>
                </div>
            </div>

            {/* Converted Amount text Div */}
            {
                convertedAmount && (
                    <div className="mt-4 text-lg font-medium text-right text-green-600">
                        Converted Amount : {convertedAmount}
                    </div>
                )
            }

        </div>
    )
}

export default Currencyconvertor