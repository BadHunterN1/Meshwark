import { SearchIcon } from "../../../assets/Images/Icons";

function InputField(props) {
	const listId = `${props.name}-list`;
	return (
		<div className="w-full">
			<label htmlFor={props.p} className="capitalize pr-2 font-bold">
				{props.p}
			</label>
			<div className="input">
				<SearchIcon />
				<input
					value={props.station}
					onChange={(e) => props.setStation(e.target.value)}
					placeholder={props.p}
					type="text"
					name={props.name}
					list={listId}
					id={props.name}
				/>
				<datalist id={listId}>
					<option value="تيست" />
					<option value="تيست1" />
					<option value="تيست2" />
					<option value="Strawberry" />
					<option value="Vanilla" />
				</datalist>
			</div>
		</div>
	);
}
export default InputField;
