import { useState } from "react";
import { SearchIcon } from "../../../assets/Images/Icons";
import InputField from "./InputField";
function SearchBox() {
	const [fromStation, setFromStation] = useState();
	const [toStation, setToStation] = useState();
	console.log(fromStation);
	console.log(toStation);

	return (
		<div className="search-box">
			<form>
				<div className="search-inputs">
					<InputField
						staion={fromStation}
						setStation={setFromStation}
						p="من؟"
						name="from"
					/>
					<InputField
						staion={toStation}
						setStation={setToStation}
						p="الي؟"
						name="to"
					/>
				</div>
				<button className="search">
					<SearchIcon className="search-icon" />
					<span>ابحث عن افضل طريق</span>
				</button>
			</form>
		</div>
	);
}

export default SearchBox;
