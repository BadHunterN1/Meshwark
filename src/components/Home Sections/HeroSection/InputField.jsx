import { SearchIcon } from '../../../assets/Images/Icons';

function InputField(props) {
    const listId = `${props.name}-list`;
    return (
        <div className="w-full">
            <label htmlFor={props.name} className="capitalize pr-2 font-bold">
                {props.p}
            </label>
            <div className="input w-full flex mt-1.5">
                <SearchIcon />
                <input
                    className="text-white w-full"
                    value={props.station || ''}
                    onChange={e =>
                        props.setStation(e.target.value, `${props.name}`)
                    }
                    placeholder={props.p}
                    type="text"
                    name={props.name}
                    list={listId}
                    id={props.name}
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
