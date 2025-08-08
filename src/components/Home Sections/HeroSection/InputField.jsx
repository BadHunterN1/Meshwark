import { SearchIcon } from '../../../assets/Images/Icons';

function InputField({ p, name, placeHolder, value, onChange, onFocus, suggestions, onSuggestionClick }) {
    return (
        <div className="relative w-full">
            <label htmlFor={name} className="capitalize pr-2 font-bold">
                {p}
            </label>
            <div className="input w-full flex mt-1.5">
                <SearchIcon />
                <input
                    className="text-white font-bold w-full bg-transparent outline-none px-2"
                    placeholder={placeHolder}
                    type="text"
                    name={name}
                    id={name}
                    value={value}
                    onChange={onChange}
                    onFocus={onFocus}
                    autoComplete="off"
                />
            </div>

            {/* Dropdown suggestions */}
            {suggestions?.length > 0 && (
                <ul className="absolute left-0 right-0 bg-white text-black mt-1 rounded shadow-lg max-h-40 overflow-y-auto z-10">
                    {suggestions.map((s, i) => (
                        <li
                            key={i}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => onSuggestionClick(s)}
                        >
                            {s}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default InputField;
