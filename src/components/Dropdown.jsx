/* eslint-disable react/prop-types */
import { HiOutlineStar, HiStar } from "react-icons/hi2";

const Dropdown = ({
    currencies,
    currency,
    setCurrency,
    favorites,
    handleFavorite,
    title = "",
}) => {

    const isFavorite = (curr) => favorites.includes(curr);

    return (
        <div>
            <label
                className='block text-sm font-medium text-gray-700'
                htmlFor={title}
            >
                {title}
            </label>

            <div className='mt-1 relative'>
                <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className='w-full p-2 border border-gray-300 rounded-md shadow-sm
                focus:outline-none focus:ring-2 focus:ring-indigo-500 '>
                    {
                        favorites.map((currency) => (
                            <option className="bg-gray-200" value={currency} key={currency}>
                                {currency}
                            </option>
                        ))
                    }
                    {
                        currencies.filter((c) => !favorites.includes(c))
                            ?.map((currency) => (
                                <option value={currency} key={currency}>
                                    {currency}
                                </option>
                            ))
                    }
                </select>

                <button
                    onClick={() => handleFavorite(currency)}
                    className="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5">
                    {isFavorite(currency) ? <HiStar /> : <HiOutlineStar />}
                </button>
            </div>
        </div>
    )
}

export default Dropdown