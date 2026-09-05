import { useNavigate } from "react-router-dom";

export const SomethingWentWrong = () => {
    const navigate = useNavigate();

    const handleGoToChats = () => {
        navigate("/private/chats", { replace: true });
    };

    return (
        <main className="flex min-h-[70vh] items-center justify-center px-4 py-10">
            <section
                className="
                    w-full max-w-lg
                    rounded-2xl
                    border border-gray-200
                    bg-white
                    p-6
                    text-center
                    shadow-lg
                    sm:p-8
                    dark:border-gray-600
                    dark:bg-gray-700
                "
            >
                {/* Icon */}
                <div
                    className="
                        mx-auto mb-6
                        flex h-20 w-20
                        items-center justify-center
                        rounded-full
                        bg-red-100
                        dark:bg-red-900/30
                    "
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-10 w-10 text-red-500"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m0 3.75h.008M10.29 3.86l-7.82 13.5A2 2 0 004.2 20.36h15.6a2 2 0 001.73-3L13.71 3.86a2 2 0 00-3.42 0z"
                        />
                    </svg>
                </div>

                {/* Text */}
                <h1
                    className="
                        text-2xl
                        font-bold
                        text-gray-900
                        sm:text-3xl
                        dark:text-white
                    "
                >
                    Something went wrong
                </h1>

                <p
                    className="
                        mx-auto mt-3
                        max-w-md
                        text-sm
                        leading-6
                        text-gray-600
                        sm:text-base
                        dark:text-gray-200
                    "
                >
                    We couldn't complete your request. Please try again later
                    or return to your chats.
                </p>

                {/* Button */}
                <button
                    type="button"
                    onClick={handleGoToChats}
                    className="
                        mt-7
                        w-full
                        rounded-xl
                        bg-gray-900
                        px-5
                        py-3
                        font-semibold
                        text-white
                        transition
                        duration-200
                        hover:bg-gray-800
                        focus:outline-none
                        focus:ring-2
                        focus:ring-gray-400
                        focus:ring-offset-2
                        sm:w-auto
                        dark:bg-white
                        dark:text-gray-800
                        dark:hover:bg-gray-100
                        dark:focus:ring-gray-300
                        dark:focus:ring-offset-gray-700
                    "
                >
                    Go to chats
                </button>
            </section>
        </main>
    );
};