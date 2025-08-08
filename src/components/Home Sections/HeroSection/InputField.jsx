import { SearchIcon } from '../../../assets/Images/Icons';

function InputField(props) {
    return (
        <div className="w-full">
            <label htmlFor={props.name} className="capitalize pr-2 font-bold">
                {props.p}
            </label>
            <div
                className={`input w-full flex mt-1.5`}
            >
                <SearchIcon />
                <input
                    className="text-white font-bold w-full"
                    placeholder={props.placeHolder}
                    type="text"
                    name={props.name}
                    id={props.name}
                    autoComplete="off"
                    value={props.value}
                    onChange={props.onChange}
                />
            </div>
        </div>
    );
}
export default InputField;
