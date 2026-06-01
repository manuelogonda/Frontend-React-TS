import { createContext, useContext, useState, type ReactNode } from "react";

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
//theme context to share state
interface ThemeContextType {
    isDark: boolean;
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({children} : {children: ReactNode}) {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved ? JSON.parse(saved) : 'false';
    })

    const toggleTheme = () => {
        setIsDark((prev: any) => {
            const newValue = !prev;
            //save to local storage
            localStorage.setItem('theme',JSON.stringify(newValue));
            return newValue;
        })
    }

    return (
        <ThemeContext.Provider value={{isDark, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

//custom hook to use theme
export function useTheme() {
    const context = useContext(ThemeContext);
    if(!context) {
        throw new Error('useTheme must be inside ThemeProvider');
    }
    return context;
}

//NAvbar component
export function Navbar() {
    const { isDark, toggleTheme} = useTheme();
    return (
        <nav
        className={`transition-colors duration-300 $
        {isDark ? 'bg-gray-900 text-white border-gray-700' : 
        'bg-white text-gray-900 border-gray-200'}  border-b sticky top-0 z-50`}>
            <div className="flex items-center gap-3">
                <div className="text-2xl"></div>
                <h1 className="text-xl font-bold">Theme App</h1>
            </div>
            <button
            onClick={toggleTheme}
            className={`
                transition-all duration-300
                px-4 py-2 rounded-lg font-medium
                ${isDark
                ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-400'
                : 'bg-gray-800 text-white hover:bg-gray-700'
                }
            `}
            >
                {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
        </nav>
    )
}


export function MainContent() {
  const { isDark } = useTheme();

  return (
    <main
      className={`
        transition-colors duration-300
        min-h-[calc(100vh-120px)]
        ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold mb-8">Welcome!</h2>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: '🎨',
              title: 'Beautiful Design',
              desc: 'Stunning UI that adapts to your theme'
            },
            {
              icon: '⚡',
              title: 'Fast Performance',
              desc: 'Smooth transitions and responsive'
            },
            {
              icon: '💾',
              title: 'Persistent',
              desc: 'Your theme choice is saved locally'
            }
          ].map((feature, index) => (
            <div
              key={index}
              className={`
                transition-colors duration-300
                p-6 rounded-lg border-2
                ${isDark
                  ? 'bg-gray-700 border-gray-600 hover:border-blue-500'
                  : 'bg-gray-50 border-gray-200 hover:border-blue-500'
                }
              `}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div
          className={`
            transition-colors duration-300
            p-8 rounded-lg
            ${isDark
              ? 'bg-gray-700 border-l-4 border-blue-500'
              : 'bg-blue-50 border-l-4 border-blue-500'
            }
          `}
        >
          <h3 className="text-2xl font-bold mb-4">How It Works</h3>
          <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
            Click the theme toggle button in the top right to switch between
            light and dark modes. Your preference is automatically saved and will
            be remembered when you return!
          </p>
        </div>
      </div>
    </main>
  );
}

export function Footer() {
    const { isDark } = useTheme();

    return (
        <footer
         className={`
        transition-colors duration-300
        ${isDark
          ? 'bg-gray-900 text-gray-400 border-gray-700'
          : 'bg-gray-100 text-gray-600 border-gray-200'
        }
        border-t
      `}
        >
             <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h4 className={`font-bold mb-4 ${isDark ? 'text-white' : ''}`}>
              About
            </h4>
            <p className="text-sm leading-relaxed">
              A beautiful theme switcher built with React and Tailwind CSS.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className={`font-bold mb-4 ${isDark ? 'text-white' : ''}`}>
              Quick Links
            </h4>
            <ul className="text-sm space-y-2">
              <li>
                <a href="#" className="hover:text-blue-500 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className={`font-bold mb-4 ${isDark ? 'text-white' : ''}`}>
              Follow Us
            </h4>
            <div className="flex gap-4 text-sm">
              <a href="#" className="hover:text-blue-500 transition">
                Twitter
              </a>
              <a href="#" className="hover:text-blue-500 transition">
                GitHub
              </a>
              <a href="#" className="hover:text-blue-500 transition">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          className={`
            text-center text-sm
            ${isDark ? 'border-gray-700' : 'border-gray-300'}
            border-t pt-8
          `}
        >
          <p>&copy; Theme App. All rights reserved.</p>
        </div>
      </div>
        </footer>
    )
}