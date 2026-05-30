import { useState } from "react";

export function ThemeToggler() {
    const [isDark, setIsDark] = useState(false);
    <button onClick={()=> setIsDark(true)}>
        {isDark ? 'Light mode' : 'Dark mode'}
    </button>
}

// counter with constants
export function CounterWithConstraint() {
    const [count, setCount] = useState(0);
    const [increasesWith,setIncreasesWith] = useState(1);

    const increament = () => {
        setCount(prev => {
            const newCount = prev + increasesWith;
            // not above ten constraint
            return newCount > 10 ? 10 : newCount;
        })
    }

    const decreament = () => {
        setCount(prev => {
            const newCount = prev - increasesWith;
            //constraint not below
            return newCount < 0 ? 0 : newCount;
        })
    }

    const reset = () => {
        setCount(0);
    }

    const handleStepChange = (e: any) => {
       setIncreasesWith(parseInt(e.target.value));
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
                <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Counter</h1>

                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-8 mb-8 text-center">
                    <p className="text-7xl font-bold text-white">{count}</p>
                    <p className="text-blue-100 text-sm mt-2">Current Value</p>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="stepValues"
                    >
                        Step Size
                    </label>
                    <select 
                    onChange={handleStepChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={increasesWith}
                    >
                        <option value={1}>+/- 1</option>
                        <option value={5}>+/- 5</option>
                        <option value={10}>+/- 10</option>
                    </select>
                </div>

                <div className="flex gap-4 mb-6">
                    <button
                    className="flex-1 px-4 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 disabled:opacity-50 transition-all"
                    disabled= {count === 0}
                    onClick={decreament}
                    >
                        - Decrease
                    </button>
                    <button 
                    className="flex-1 px-4 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-all"
                    onClick={reset}>
                        Reset
                    </button>
                    <button 
                    onClick={increament}
                    disabled = {count === 10}
                    className="flex-1 px-4 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        + increase
                    </button>
                </div>

                <div>
                    {count === 0 && (
                        <p className="text-red-600 text-sm font-medium">
                            Attention Minimum reached (cannot go below 0)
                        </p>
                    )}
                    {count === 10 && (
                        <p className="text-amber-600 text-sm font-medium">
                            Maximum reached (cannot exceed 10)
                        </p>
                    )}
                    {count > 0 && count < 10 && (
                        <p className="text-gray-500 text-sm">
                            Range: 0 - 10 | Step: {increasesWith}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

// CODING LAB - DARK MODE TOGGLE
