import { Search } from 'lucide-react';

function InputField(props) {
    const listId = `${props.name}-list`;
    return (
        <div className="w-full">
            <label htmlFor={props.name} className="capitalize pr-2 font-bold">
                {props.p}
            </label>
            <div
                className={`input ${props.isDisabled ? 'opacity-40' : null} w-full flex mt-1.5`}
            >
                <Search className="text-[hsl(var(--muted-foreground))] ml-2" />
                <input
                    className="text-gray-900 font-bold w-full"
                    value={props.station || ''}
                    onChange={e =>
                        props.setStation(e.target.value, `${props.name}`)
                    }
                    placeholder={props.placeHolder}
                    type="text"
                    name={props.name}
                    list={listId}
                    id={props.name}
                    disabled={props.isDisabled}
                    autoComplete="off"
                />
                <datalist id={listId}>
                    {props.destination.map((dest, index) => (
                        <option key={index} value={dest.name}>
                            {dest.name}
                        </option>
                    ))}
                </datalist>
            </div>
        </div>
    );
}
export default InputField;
