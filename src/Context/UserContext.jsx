import { createContext, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider({ children }) {
	let [userLogin, setUserLogin] = useState("");
	let [token, setToken] = useState(localStorage.getItem("token"));
	console.log(token);

	return (
		<UserContext.Provider value={{ userLogin, setUserLogin, token, setToken }}>
			{children}
		</UserContext.Provider>
	);
}
