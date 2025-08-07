export default function Button({ children, green, ...props }) {
    return (
        <button
            {...props}
            className={`rounded-md w-full flex items-center justify-center gap-2 ${
                green ? 'bg-[var(--secondary-color)]' : 'bg-[var(--main-color)]'
            } px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-[var(--secondary-color)] transition duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 ${
                green
                    ? 'focus-visible:outline-[var(--secondary-color)]'
                    : 'focus-visible:outline-[var(--main-color)]'
            }`}
        >
            {children}
        </button>
    );
}
