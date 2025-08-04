import { SearchIcon } from "../../assets/Images/Icons";
function InputField(props) {
    return (
            <div className="input">
                <SearchIcon />
                <input placeholder={props.p} type="text" name={props.name} id={props.name}/>
            </div>
    )
}

export default InputField;