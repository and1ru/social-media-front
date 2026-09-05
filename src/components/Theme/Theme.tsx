import { useThemContext } from "../../context/theme/ThemeContext";

export const Theme = () => {
    const { setTheme, theme } = useThemContext();

    const handleClick = () => {
        setTheme(!theme);

        if (theme) {
            document.documentElement.classList.remove("dark");
        } else {
            document.documentElement.classList.add("dark");
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            aria-label={`Cambiar a modo ${theme ? "oscuro" : "claro"}`}
            className="
                relative
                flex
                h-11
                w-24
                items-center
                rounded-full
                border
                border-gray-200
                bg-gray-100
                p-1
                shadow-sm
                transition-colors
                duration-300
                hover:bg-gray-200
                focus:outline-none
                focus:ring-2
                focus:ring-gray-400
                focus:ring-offset-2

                dark:border-gray-600
                dark:bg-gray-800
                dark:hover:bg-gray-600
                dark:focus:ring-gray-500
                dark:focus:ring-offset-gray-700
            "
        >
            {/* Indicador */}
            <span
                className={`
                    absolute
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    shadow-md
                    transition-transform
                    duration-300
                    ease-in-out
                    ${
                        theme
                            ? "translate-x-12 bg-gray-700"
                            : "translate-x-0 bg-white"
                    }
                `}
            >
                {theme ? (
                    /* Luna */
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5 text-white"
                    >
                        <path d="M21.64 13a1 1 0 0 0-1.05-.14 8.05 8.05 0 0 1-3.4.76A8 8 0 0 1 9.2 5.63a8.05 8.05 0 0 1 .76-3.4A1 1 0 0 0 8.81 1.2 10 10 0 1 0 22.8 15.19a1 1 0 0 0-1.16-2.19Z" />
                    </svg>
                ) : (
                    /* Sol */
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-5 w-5 text-gray-700"
                    >
                        <circle cx="12" cy="12" r="4" />
                        <path
                            strokeLinecap="round"
                            d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"
                        />
                    </svg>
                )}
            </span>

            {/* Texto */}
            <span
                className={`
                    w-full
                    text-xs
                    font-semibold
                    transition-all
                    duration-300
                    ${
                        theme
                            ? "pr-1 text-gray-300"
                            : "pl-9 text-gray-600"
                    }
                `}
            >
                {theme ? "Dark" : "Light"}
            </span>
        </button>
    );
};