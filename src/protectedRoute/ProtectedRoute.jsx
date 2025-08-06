import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export default function ProtectedRoute({ children }) {
	// const token = localStorage.getItem("token");
	let { token } = useContext(UserContext);
	if (token === null) {
		return <Navigate to={"/login"} />;
	}

	return children;
}
