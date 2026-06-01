import { useEffect, useState } from "react";
import { useTheme } from "./UseStateThemeToggler";

export function WindowSizeTracker() {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    return (
        <div>Size: {size.width} x {size.height}</div>
    )
}

//timer
export function Timer() {
    const [seconds, setSeconds] = useState(0);
    useEffect(() => {
        const interval = setInterval(() =>{
            setSeconds(prev => prev + 1);
        },1000)

        return (
            clearInterval(interval)
        )
    }, [])

    return <div>Ellapse: {seconds}s</div>
}

//document title updater

export function PageWithTitle({title}: {title: string}) {
    useEffect(() => {
        document.title = title;
    }, [title]);
  return <div>Current Page: {title}</div>
}

// useEffect lab digital clock
// a. utitlity functions

export function formartTime(date: Date,
  use24Hour: boolean = true,
  showMilliseconds: boolean = false): string {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

    if(!use24Hour) {
        const isPM = hours >= 12;
        hours = hours % 12 || 12;
    }
    const hoursStr = String(hours).padStart(2, '0');
    const timeStr = `${hoursStr}:${minutes}:${seconds}`;

    if(showMilliseconds) {
        return `${timeStr}.${milliseconds}`;
    }

    return timeStr;
  }

  export function formaTimeWithPeriod(date: Date): string {
    const hours = date.getHours();
    const period = hours >= 12 ? 'PM' : 'AM';
    return `${formartTime(date, false)} ${period}`;
  }

  export function formatTimeWithTimezone(
  date: Date,
  timezone: string,
  use24Hour: boolean = true
): string {
  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: !use24Hour,
    timeZone: timezone
  });

  return formatter.format(date);
}

export function getTimezoneOffset(timezone: string): number {
  const now = new Date();
  const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
  const tzDate = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
  return (tzDate.getTime() - utcDate.getTime()) / (1000 * 60 * 60);
}

// Common timezones
export const TIMEZONES = [
  { label: 'Local', value: Intl.DateTimeFormat().resolvedOptions().timeZone },
  { label: 'UTC', value: 'UTC' },
  { label: 'EST', value: 'America/New_York' },
  { label: 'CST', value: 'America/Chicago' },
  { label: 'MST', value: 'America/Denver' },
  { label: 'PST', value: 'America/Los_Angeles' },
  { label: 'GMT', value: 'Europe/London' },
  { label: 'CET', value: 'Europe/Paris' },
  { label: 'IST', value: 'Asia/Kolkata' },
  { label: 'JST', value: 'Asia/Tokyo' },
  { label: 'AEST', value: 'Australia/Sydney' }
];

// digital clock component
interface DigitalClockProps {
  timezone?: string;
  showMilliseconds?: boolean;
}

export function DigitalClock({
  timezone: initialTimezone,
  showMilliseconds = false
}: DigitalClockProps) {
  const { isDark } = useTheme();
  const [time, setTime] = useState(new Date());
  const [use24Hour, setUse24Hour] = useState(true);
  const [timezone, setTimezone] = useState(
    initialTimezone || Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [isRunning, setIsRunning] = useState(true);

  // ========== useEffect: Update time every second ==========
  useEffect(() => {
    if (!isRunning) return; // Don't set up interval if paused

    // Set initial time
    setTime(new Date());

    // Create interval
    const interval = setInterval(() => {
      setTime(new Date());
    }, showMilliseconds ? 10 : 1000); // Update more frequently if showing ms

    // ========== CLEANUP: Clear interval on unmount ==========
    return () => {
      console.log('Clock: Clearing interval');
      clearInterval(interval);
    };
  }, [isRunning, showMilliseconds]); // Re-run if running state changes

  // Format the time
  const displayTime = use24Hour
    ? formartTime(time, true, showMilliseconds)
    : formaTimeWithPeriod(time);

  // Get timezone name
  const timezoneName = TIMEZONES.find(tz => tz.value === timezone)?.label || timezone;

  return (
    <div
      className={`
        transition-colors duration-300
        rounded-2xl shadow-2xl p-8
        ${isDark ? 'bg-gray-800' : 'bg-white'}
      `}
    >
      {/* Title */}
      <h2 className="text-sm font-medium text-center mb-4 opacity-75">
        {timezoneName}
      </h2>

      {/* Main Clock Display */}
      <div
        className={`
          text-center mb-8
          ${isDark
            ? 'bg-gradient-to-br from-blue-900 to-indigo-900'
            : 'bg-gradient-to-br from-blue-100 to-indigo-100'
          }
          rounded-xl p-8 font-mono
        `}
      >
        <p className={`
          text-6xl font-bold tracking-wider
          ${isDark ? 'text-white' : 'text-gray-900'}
        `}>
          {displayTime}
        </p>

        {/* Date Info */}
        <p className={`
          mt-4 text-sm
          ${isDark ? 'text-blue-200' : 'text-blue-700'}
        `}>
          {time.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>

        {/* Day of week */}
        <p className={`
          text-xs mt-2
          ${isDark ? 'text-blue-300' : 'text-blue-600'}
        `}>
          Week {Math.ceil((time.getDate() + new Date(time.getFullYear(), time.getMonth(), 1).getDay()) / 7)} · Day {time.getDay() + 1} of 7
        </p>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {/* Time Format Toggle */}
        <div className={`
          p-4 rounded-lg
          ${isDark ? 'bg-gray-700' : 'bg-gray-100'}
        `}>
          <label className={`
            flex items-center gap-3 cursor-pointer
            ${isDark ? 'text-gray-200' : 'text-gray-700'}
          `}>
            <input
              type="checkbox"
              checked={use24Hour}
              onChange={(e) => setUse24Hour(e.target.checked)}
              className="w-5 h-5 accent-blue-500"
            />
            <span className="text-sm font-medium">
              {use24Hour ? '24-Hour Format' : '12-Hour Format'}
            </span>
          </label>
        </div>

        {/* Milliseconds Toggle */}
        <div className={`
          p-4 rounded-lg
          ${isDark ? 'bg-gray-700' : 'bg-gray-100'}
        `}>
          <label className={`
            flex items-center gap-3 cursor-pointer
            ${isDark ? 'text-gray-200' : 'text-gray-700'}
          `}>
            <input
              type="checkbox"
              checked={showMilliseconds}
              onChange={(e) => setUse24Hour(e.target.checked)}
              className="w-5 h-5 accent-blue-500"
            />
            <span className="text-sm font-medium">
              Show Milliseconds
            </span>
          </label>
        </div>

        {/* Timezone Selector */}
        <div>
          <label className={`
            block text-sm font-medium mb-2
            ${isDark ? 'text-gray-300' : 'text-gray-700'}
          `}>
            Timezone:
          </label>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className={`
              w-full px-4 py-2 rounded-lg border-2 transition-colors
              ${isDark
                ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-500'
                : 'bg-white text-gray-900 border-gray-300 focus:border-blue-500'
              }
            `}
          >
            {TIMEZONES.map(tz => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
        </div>

        {/* Play/Pause */}
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`
            w-full py-3 rounded-lg font-semibold transition-all
            ${isRunning
              ? isDark
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-red-500 hover:bg-red-600'
              : isDark
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-green-500 hover:bg-green-600'
            }
            text-white
          `}
        >
          {isRunning ? ' Pause' : ' Resume'}
        </button>
      </div>

      {/* Status Info */}
      <div className={`
        mt-6 p-4 rounded-lg text-xs
        ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}
      `}>
        <p>Status: {isRunning ? ' Running' : '⏸ Paused'}</p>
        <p>Updates: {showMilliseconds ? 'Every 10ms' : 'Every 1s'}</p>
      </div>
    </div>
  );
}





//clock dashboard
type ClockView = 'digital' | 'analog' | 'both';

export function ClockDashboard() {
  const { isDark } = useTheme();
  const [view, setView] = useState<ClockView>('both');

  return (
    <div
      className={`
        transition-colors duration-300 min-h-screen p-8
        ${isDark ? 'bg-gray-900' : 'bg-gray-50'}
      `}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`
            text-4xl font-bold mb-2
            ${isDark ? 'text-white' : 'text-gray-900'}
          `}>
            Digital Clock
          </h1>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Real-time clock with multiple timezones and formats
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex gap-4 mb-8">
          {(['digital', 'analog', 'both'] as const).map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`
                px-6 py-2 rounded-lg font-medium transition-all capitalize
                ${view === v
                  ? isDark
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-500 text-white'
                  : isDark
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                }
              `}
            >
              {v}
            </button>
          ))}
        </div>

        {/* Clock Views */}
        <div className={`
          grid gap-8
          ${view === 'both' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}
        `}>
          {(view === 'digital' || view === 'both') && (
            <DigitalClock />
          )}
          
    
        </div>

      </div>
    </div>
  );
}