import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

interface HeaderProps {
    setSearchInput: (input: string) => void;
}

const Header: React.FC<HeaderProps> = ({ setSearchInput }) => {
    const [input, setInput] = useState('');
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        setSearchInput(e.target.value);
    };
    
    return (
        <div className="border-b -mt-4">
            <div className="mx-auto p-8 pt-14">
                <div className="sm:flex sm:items-center sm:justify-between">
                <div className="text-center sm:text-left">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 651 83" className="w-64 h-auto fill-current mx-auto md:mx-0"><path d="M37.17 11.19H24.45v66.97H12.96V11.19H.23V.98h36.94v10.21zm44.68 66.97H70.21V43.54H54.58v34.62H43.04V.98h11.54v31.81h15.63V.98h11.64v77.18zm41.18 0H91.02V.98h31.71v10.21h-20.17v22.54h17.36v10.01h-17.36v24.21h20.47v10.21zm67.17-14.55c0 4.54-1.35 8.1-4.04 10.68-2.7 2.58-6.33 3.87-10.9 3.87h-23.52V.98h23.52c4.57 0 8.2 1.31 10.9 3.92 2.7 2.61 4.04 6.19 4.04 10.73v47.98zm-11.59-1.92V17.36c0-4.31-2.25-6.46-6.76-6.46h-8.58v57.35h8.29c4.7 0 7.05-2.19 7.05-6.56zm32.25 16.47h-11.54V.98h11.54v77.18zm48.58 0H248l-2.32-14.65h-14.45l-2.32 14.65h-11.39v-.2L232.46.88h12.13l14.85 77.28zM244.05 53.6l-5.62-34.82-5.67 34.82h11.29zm68.5 24.56h-11.1V40.09c0-2 .23-4.8.69-8.38l-9.96 39.4h-5.87l-10.01-39.4c.46 3.65.69 6.44.69 8.38v38.07h-11.1V.98h10.9l12.13 42.66c.13.46.23 1.63.3 3.5 0-.82.1-1.99.3-3.5L301.65.98h10.9v77.18zm48.14-7.05c0 4.7-2.33 7.05-7 7.05h-25.05c-4.57 0-6.85-2.35-6.85-7.05V8.08c0-4.73 2.28-7.1 6.85-7.1h25.05c4.67 0 7 2.37 7 7.1v63.03zm-11.54-2.86V10.9h-15.83v57.35h15.83zm59.92 9.91h-10.11l-18.49-48.58c.49 2.37.74 4.23.74 5.57v43h-11.24V.98h10.11l18.49 47.59c-.49-2.37-.74-4.22-.74-5.57V.98h11.24v77.18zm47.73-14.55c0 4.54-1.35 8.1-4.04 10.68-2.7 2.58-6.33 3.87-10.9 3.87h-23.52V.98h23.52c4.57 0 8.2 1.31 10.9 3.92 2.7 2.61 4.04 6.19 4.04 10.73v47.98zm-11.59-1.92V17.36c0-4.31-2.25-6.46-6.76-6.46h-8.58v57.35h8.29c4.7 0 7.05-2.19 7.05-6.56zm58.4 9.42c0 4.7-2.35 7.05-7.05 7.05h-30.82V.98h30.63c4.57 0 6.85 2.37 6.85 7.1v19.87c0 2.63-.82 4.67-2.47 6.12-.23.2-2.24 1.46-6.02 3.8 3.91 2.4 5.98 3.72 6.21 3.95 1.78 1.55 2.66 3.67 2.66 6.36v22.93zm-11.89-41.72V10.7h-14.45v22.64h8.88l5.57-3.95zm.3 39.06v-22l-5.67-3.75h-9.07v25.74h14.74zm59.77 9.71h-11.44l-2.32-14.65h-14.45l-2.32 14.65h-11.39v-.2L524.81.88h12.13l14.85 77.28zM536.4 53.6l-5.62-34.82-5.67 34.82h11.29zm59.82 17.51c0 4.7-2.35 7.05-7.05 7.05H565.1c-4.57 0-6.85-2.35-6.85-7.05V8.08c0-4.73 2.28-7.1 6.85-7.1h24.07c4.7 0 7.05 2.37 7.05 7.1v18.05h-11.49V10.9h-14.94v57.35h14.94V52.03h11.49v19.08zm47.99 7.05h-12.72l-14.65-34.42v34.42H605.3V.98h11.54v32.65L629.66.98h12.62v.54L626.6 38.17l17.61 39.99z"></path></svg>

                    <p className="mt-1.5 text-md text-gray-500">
                    Official Stylebook
                    </p>
                </div>

                <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                    <div className="relative">
                        <label className="sr-only" htmlFor="search"> Search </label>

                        <input
                            className="h-10 w-full rounded-full border-none bg-white pe-10 ps-4 text-sm shadow-md sm:w-56 dark:bg-gray-900"
                            id="search"
                            type="search"
                            placeholder="Search"
                            value={input}
                            onChange={handleSearch} 
                        />

                        <button
                            type="button"
                            className="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-gray-50 p-2 text-gray-700 transition hover:text-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:text-white" 
                        >
                            <span className="sr-only">Search</span>
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                            </svg>
                        </button>
                    </div>

                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
                    >
                        {theme === 'light' ? (
                            <Moon className="h-5 w-5" />
                        ) : (
                            <Sun className="h-5 w-5" />
                        )}
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
}
export default Header;
